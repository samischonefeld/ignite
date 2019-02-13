const { system, filesystem } = require('gluegun')
const tempy = require('tempy')

const IGNITE = filesystem.path(`${__dirname}/../../../bin/ignite`)
const IGNITE_BOILERPLATE = filesystem.path(`${__dirname}/../../../../ignite-andross`)
const APP_NAME = 'Foo'

jest.setTimeout(10 * 60 * 1000)

const originalDir = process.cwd()
const opts = { stdio: 'inherit' }

beforeEach(() => {
  const tempDir = tempy.directory()
  process.chdir(tempDir)
})

afterEach(() => {
  process.chdir(originalDir)
})

test('spins up a min app and performs various checks', async done => {
  // ignite the eternal flame
  // If you have to ignite it, how is it eternal?
  const result = await system.run(`${IGNITE} new ${APP_NAME} --min -b ${IGNITE_BOILERPLATE} --debug`, opts)

  // um
  expect(result).toContain(`Ignited Foo`)

  // Jump into the app directory
  process.chdir(APP_NAME)

  // check that the project was generated
  const dirs = filesystem.subdirectories('.')
  expect(dirs).toContain('ios')
  expect(dirs).toContain('android')
  expect(dirs).toContain('App')

  // check the contents of ignite/ignite.json
  const igniteJSON = filesystem.read(`${process.cwd()}/ignite/ignite.json`)
  expect(typeof igniteJSON).toBe('string')
  expect(igniteJSON).toMatch(/"generators": {/)

  // check the Containers/App.js file
  const appJS = filesystem.read(`${process.cwd()}/App/Containers/App.js`)
  expect(appJS).toMatch(/class App extends Component {/)

  // run ignite g component
  await system.run(`${IGNITE} g component Test`, opts)
  expect(filesystem.inspect(`${process.cwd()}/App/Components/Test.js`).type).toBe('file')

  // spork a screen and edit it
  await system.run(`${IGNITE} spork component.ejs`, opts)
  const sporkedFile = `${process.cwd()}/ignite/Spork/ignite-andross/component.ejs`
  await filesystem.write(sporkedFile, 'SPORKED!')
  expect(filesystem.inspect(sporkedFile).type).toBe('file')
  await system.run(`${IGNITE} generate component Sporkified`, opts)
  expect(filesystem.read(`${process.cwd()}/App/Components/Sporkified.js`)).toBe('SPORKED!')

  done()
})
