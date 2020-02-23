import makeTestSuite from '@zoroaster/mask'
import findPackageJson from '../../src'

const TS = makeTestSuite('test/result/index.json', {
  async getResults() {
    const res = await findPackageJson('test/fixture', this.input, { fields: this.fields, soft: this.soft })
    return res
  },
  jsonProps: ['expected', 'fields'],
  getThrowsConfig() {
    return {
      fn: findPackageJson,
      args: ['test/fixture', this.input],
    }
  },
  mapActual(res) {
    return Object.entries(res).reduce((acc, [k, v]) => {
      if (typeof v == 'string')
        acc[k] = v.replace(/\\/g, '/')
      else acc[k] = v
      return acc
    }, {})
  }
})

export default TS
