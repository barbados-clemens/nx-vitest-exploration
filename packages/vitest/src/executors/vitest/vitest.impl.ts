import { ExecutorContext } from '@nrwl/devkit';
import { resolve as resolvePath } from 'path';
import { startVitest } from 'vitest/node';
import { VitestExecutorOptions } from './schema';

process.env.NODE_ENV ??= 'test';

export async function vitestExecutor(
  options: VitestExecutorOptions,
  context: ExecutorContext
) {
  const {
    passWithNoTests = false,
    ui = false,
    watch = false,
    coverage = false,
  } = options;

  const config = resolvePath(context.root, options.vitestConfig);

  const ctx = await startVitest([], {
    passWithNoTests,
    ui,
    watch,
    coverage: coverage ? { enabled: true } : undefined,
    config,
  });

  return { success: ctx };

  // TODO(caleb) is there a way to run vitest programmatically?
  // const cmd = `npx vitest ${options.watch ? 'watch' : 'run'} --config ${config} ${options.passWithNoTests ? '--passWithNoTests' : ''} ${options.coverage ? '--coverage' : ''} ${options.ui ? '--ui' : ''}`;
  // execSync(cmd.trim(), {cwd: projectRoot, stdio: 'inherit'})
  //
  // return {success: true};
}

export default vitestExecutor;
