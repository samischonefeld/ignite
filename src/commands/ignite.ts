import { GluegunToolbox } from 'gluegun'
module.exports = {
  description: '🔥 The Ignite CLI 🔥',
  run: async (toolbox: GluegunToolbox) => {
    return require('./help').run(toolbox)
  },
}
