import {ExecutorContext} from "@nrwl/devkit";
import {resolve as resolvePath} from "path";
import {createVitest} from "vitest/node";
import {VitestExecutorOptions} from "./schema";

process.env.NODE_ENV ??= 'test';

export async function vitestExecutor(options: VitestExecutorOptions, context: ExecutorContext) {
  // need to run vitest from the project root where the vitest.config.ts file is located
  const {projectName} = context;
  const projectRoot = resolvePath(context.workspace.projects[projectName].root)
  const config = resolvePath(context.root, options.vitestConfig);

  const ctx = await createVitest(context);
  try {
    await ctx.start()
  } catch (e) {
    console.error(e)
    return {success: false}
  } finally {
    if (!ctx.config.watch)
      await ctx.close()
  }

  return {success: true};

  // TODO(caleb) is there a way to run vitest programmatically?
  // const cmd = `npx vitest ${options.watch ? 'watch' : 'run'} --config ${config} ${options.passWithNoTests ? '--passWithNoTests' : ''} ${options.coverage ? '--coverage' : ''} ${options.ui ? '--ui' : ''}`;
  // execSync(cmd.trim(), {cwd: projectRoot, stdio: 'inherit'})
  //
  // return {success: true};
}

export default vitestExecutor;
