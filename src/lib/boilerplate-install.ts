import detectInstall from './detect-install'
import importPlugin from './import-plugin'
import exitCodes from './exit-codes'
import { IgniteToolbox } from '../types'

/**
 * Installs and runs an ignite boilerplate.
 *
 * Overview:
 *
 *    * ensures we're not already in an ignite directory
 *    * installs the boilerplate package
 *    * verifies that the boilerplate is legit
 *    * runs it
 *
 */
export default async (toolbox: IgniteToolbox): Promise<boolean> => {
  const { print, ignite, filesystem, parameters } = toolbox

  ignite.log('running boilerplate-install command')

  const boilerplateName: string = parameters.options.boilerplate || parameters.options.b

  // determine where the package comes from
  let installSource
  try {
    installSource = detectInstall(boilerplateName, toolbox)
  } catch (e) {
    print.error(e.message)
    return false
  }

  const { moduleName } = installSource
  const modulePath = `${process.cwd()}/node_modules/${moduleName}`
  const boilerplateJs = modulePath + '/boilerplate.js'

  // install the plugin
  const exitCode = await importPlugin(toolbox, installSource)
  if (exitCode) process.exit(exitCode)

  // start the spinner
  const spinner = print.spin('installing boilerplate')

  // ensure we can find the boilerplate.js file
  if (!filesystem.exists(boilerplateJs)) {
    spinner.fail(`${moduleName} does not have a boilerplate.js`)
    process.exit(exitCodes.PLUGIN_INVALID)
  }

  // load the boilerplate.js module
  let pluginModule
  try {
    pluginModule = require(`${modulePath}/boilerplate.js`)
  } catch (e) {
    print.error('Error call stack:')
    print.error(e.stack)
    spinner.fail(`error loading the boilerplate`)
    process.exit(exitCodes.PLUGIN_INVALID)
  }

  // must have an `install` function
  if (!pluginModule.hasOwnProperty('install')) {
    spinner.fail(`boilerplate.js is missing a 'install' function`)
    process.exit(exitCodes.PLUGIN_INVALID)
  }

  // set the path to the current running ignite plugin
  ignite.setIgnitePluginPath(modulePath)

  // stop the spinner
  spinner.stop()

  // run the boilerplate
  try {
    await pluginModule.install(toolbox)
    return true
  } catch (e) {
    print.error(`an error occured while installing ${moduleName} boilerplate.`)
    print.error(e)
    return false
  }
}
