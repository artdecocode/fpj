import { makeTestSuite } from 'zoroaster'
import Context from '../context'
import fpj from '../../src'

const ts = makeTestSuite('test/result', {
  async getResults(input) {
    const res = await fpj({
      text: input,
    })
    return res
  },
  context: Context,
})

// export default ts
