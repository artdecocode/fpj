/* yarn example/ */
import fpj from '../src'
import { dirname } from 'path'

(async () => {
  const zoroaster = await fpj(
    dirname('example/example.js'),
    'myPackage',
    { soft: true },
  )
  console.log(zoroaster)
})()