import swell from 'swell-js'

const SWELL_STORE_ID = process.env.NEXT_PUBLIC_SWELL_STORE_ID
const SWELL_PUBLIC_KEY = process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY

swell.init(SWELL_STORE_ID, SWELL_PUBLIC_KEY)

export default swell
