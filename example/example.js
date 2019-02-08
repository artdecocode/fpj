/* yarn example/ */
import fpj from '../src'
import { dirname } from 'path'

(async () => {
  const zoroaster = await fpj(
    dirname('example/example.js'),
    'zoroaster'
  )
  console.log(zoroaster)
  const read = await fpj(
    dirname('example/example.js'),
    '@wrote/read'
  )
  console.log(read)
})()