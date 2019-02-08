/* yarn example/ */
import fpj from '../src'

(async () => {
  const res = await fpj({
    text: 'example',
  })
  console.log(res)
})()