import {
  addDependenciesToPackageJson,
  generateFiles,
  installPackagesTask,
  joinPathFragments,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import {
  vitestUiVersion,
  vitestVersion,
  viteVersion,
} from '../../utils/versions';
export async function addVitestGenerator(tree, options) {
  const projectConfiguration = readProjectConfiguration(
    tree,
    options.projectName
  );
  generateFiles(
    tree,
    joinPathFragments(__dirname, 'files'),
    projectConfiguration.root,
    options
  );
  updateTestTarget(tree, projectConfiguration, options.projectName);
  // TODO(caleb) if convert then remove jest files
  addDependenciesToPackageJson(
    tree,
    {},
    { vite: viteVersion, vitest: vitestVersion, '@vitest/ui': vitestUiVersion }
  );
  return installPackagesTask(tree);
}
function updateTestTarget(
  tree,
  projectConfiguration,
  projectName,
  projectTargets = ['test']
) {
  for (const target of projectTargets) {
    const targetConfiguration = projectConfiguration.targets[target];
    console.log(JSON.stringify({ targetConfiguration }, null, 2));
    if (!targetConfiguration) {
      projectConfiguration.targets[target] = {
        executor: './packages/vitest:test',
        options: {
          vitestConfig: `./${projectConfiguration.root}/vitest.config.ts`,
          passWithNoTests: true,
        },
      };
      continue;
    }
    if (targetConfiguration.executor !== '@nrwl/jest:test') continue;
    targetConfiguration.executor = './packages/vitest:test'; // TODO(caleb): @nrwl/vitest:test
    targetConfiguration.options = {
      vitestConfig: `./${projectConfiguration.root}/vitest.config.ts`,
      passWithNoTests: true,
    };
  }
  updateProjectConfiguration(tree, projectName, projectConfiguration);
}
export default addVitestGenerator;
