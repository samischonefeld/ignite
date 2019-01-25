// This is the Ignite CLI extension. It gets parked on `context.ignite` and each
// of the functions defined here are available as functions on that.

// bring in each of the constituents
import * as shell from 'shelljs'
import ignitePluginPathExt from './ignite/ignite-plugin-path'
import igniteConfigExt from './ignite/ignite-config'
import findIgnitePluginsExt from './ignite/find-ignite-plugins'
import addModuleExt from './ignite/add-module'
import addAndroidPermissionExt from './ignite/add-android-permission'
import * as removeModuleExt from './ignite/removeModule'
import addScreenExamplesExt from './ignite/add-screen-examples' // Deprecated 3/2/17, Ignite CLI Beta
import addPluginScreenExamplesExt from './ignite/add-plugin-screen-examples'
import * as removeScreenExamplesExt from './ignite/removeScreenExamples' // Deprecated 3/2/17, Ignite CLI Beta
import * as removePluginScreenExamplesExt from './ignite/removePluginScreenExamples'
import copyBatchExt from './ignite/copy-batch'
import addComponentExampleExt from './ignite/add-component-example' // Deprecated 3/2/17, Ignite CLI Beta
import addPluginComponentExampleExt from './ignite/add-plugin-component-example'
import * as removeComponentExampleExt from './ignite/removeComponentExample' // Deprecated 3/2/17, Ignite CLI Beta
import * as removePluginComponentExampleExt from './ignite/removePluginComponentExample'
import * as removeAndroidPermissionExt from './ignite/removeAndroidPermission'
import * as setDebugConfigExt from './ignite/setDebugConfig'
import * as removeDebugConfigExt from './ignite/removeDebugConfig'
import * as patchInFileExt from './ignite/patchInFile'
import generateExt from './ignite/generate'
import * as logExt from './ignite/log'
import * as versionExt from './ignite/version'
import * as pluginOverridesExt from './ignite/pluginOverrides'

/**
 * Adds ignite goodies
 *
 * @return {Function} A function to attach to the context.
 */
function attach(plugin, command, context) {
  const { parameters } = context

  // determine which package manager to use
  const forceNpm = parameters.options.npm

  // should we be using yarn?
  const useYarn = !forceNpm && Boolean(shell.which('yarn'))

  // the ignite plugin path
  const { ignitePluginPath, setIgnitePluginPath } = ignitePluginPathExt(plugin, command, context)

  // a 4-pack of ignite config
  const { loadIgniteConfig, saveIgniteConfig, setIgniteConfig, removeIgniteConfig } = igniteConfigExt(
    plugin,
    command,
    context,
  )

  // here's the extension's abilities
  return {
    ignitePluginPath,
    setIgnitePluginPath,
    useYarn,
    loadIgniteConfig,
    saveIgniteConfig,
    setIgniteConfig,
    removeIgniteConfig,
    findIgnitePlugins: findIgnitePluginsExt(plugin, command, context),
    addModule: addModuleExt(plugin, command, context),
    addAndroidPermission: addAndroidPermissionExt(plugin, command, context),
    removeModule: removeModuleExt(plugin, command, context),
    copyBatch: copyBatchExt(plugin, command, context),
    addComponentExample: addComponentExampleExt(plugin, command, context), // Deprecated 3/2/17, Ignite CLI Beta
    addPluginComponentExample: addPluginComponentExampleExt(plugin, command, context),
    removeComponentExample: removeComponentExampleExt(plugin, command, context), // Deprecated 3/2/17, Ignite CLI Beta
    removePluginComponentExample: removePluginComponentExampleExt(plugin, command, context),
    addScreenExamples: addScreenExamplesExt(plugin, command, context), // Deprecated 3/2/17, Ignite CLI Beta
    addPluginScreenExamples: addPluginScreenExamplesExt(plugin, command, context),
    removeScreenExamples: removeScreenExamplesExt(plugin, command, context), // Deprecated 3/2/17, Ignite CLI Beta
    removePluginScreenExamples: removePluginScreenExamplesExt(plugin, command, context),
    removeAndroidPermission: removeAndroidPermissionExt(plugin, command, context),
    setDebugConfig: setDebugConfigExt(plugin, command, context),
    removeDebugConfig: removeDebugConfigExt(plugin, command, context),
    patchInFile: patchInFileExt(plugin, command, context),
    generate: generateExt(plugin, command, context),
    log: logExt(plugin, command, context),
    version: versionExt(plugin, command, context),
    pluginOverrides: pluginOverridesExt(plugin, command, context),
  }
}

module.exports = attach
