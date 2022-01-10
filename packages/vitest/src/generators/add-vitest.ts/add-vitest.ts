import {
  generateFiles,
  joinPathFragments,
  ProjectConfiguration,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration
} from "@nrwl/devkit";
import {AddVitestSchema} from "./schema";

export async function addVitestGenerator(tree: Tree, options: AddVitestSchema) {
  const projectConfiguration = readProjectConfiguration(tree, options.projectName);
  generateFiles(tree, joinPathFragments(__dirname, 'files'), projectConfiguration.root, options);

  updateTestTarget(tree, projectConfiguration, options.projectName);

  // remove jest files

  // install vitest and vite deps
}

function updateTestTarget(tree: Tree, projectConfiguration: ProjectConfiguration,
                          projectName: string,
                          projectTargets: string[] = ["test"]
) {
  for (const target of projectTargets) {
    const targetConfiguration = projectConfiguration.targets[target];
    if (!targetConfiguration || targetConfiguration.executor !== '@nrwl/jest:test')
      continue;
    targetConfiguration.executor = './packages/vitest:test' // TODO(caleb): @nrwl/vitest:test

    targetConfiguration.options = {
      vitestConfig: `${projectConfiguration.root}/vitest.config.ts`,
      passWithNoTests: true
    }
  }

  updateProjectConfiguration(tree, projectName, projectConfiguration);
}
