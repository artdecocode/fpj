import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import fpj from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof fpj, 'function')
  },
  async 'calls package without error'() {
    await fpj()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await fpj({
      text: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T