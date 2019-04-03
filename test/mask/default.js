import makeTestSuite from '@zoroaster/mask'
import findPackageJson from '../../src'

const TS = makeTestSuite('test/result/index.json', {
  async getResults(input) {
    const res = await findPackageJson('test/fixture', input)
    return res
  },
  jsonProps: ['expected'],
  getThrowsConfig(input) {
    return {
      fn: findPackageJson,
      args: ['test/fixture', input],
    }
  },
})

export default TS
