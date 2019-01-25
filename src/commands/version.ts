// @cliDescription  Prints current version of installed ignite
// @cliAlias v
// ----------------------------------------------------------------------------

module.exports = async function(context) {
  const pjson = require('../../package.json')
  context.print.info(pjson.version)
}
