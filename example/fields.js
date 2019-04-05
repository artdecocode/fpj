/* yarn example/ */
import fpj from '../src'
import { dirname } from 'path'

(async () => {
  const zoroaster = await fpj(
    dirname('example/example.js'),
    'zoroaster',
    { fields: ['author', 'bin'] },
  )
  console.log(zoroaster)
})()