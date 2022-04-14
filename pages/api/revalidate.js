export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const { data } = JSON.parse(req.body)
  console.log('data is: ', data)
  // Regenerate our index and product routes
  try {
    await res.unstable_revalidate('/')
    await res.unstable_revalidate(`/${data.id}`)
    return res.status(200).json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
