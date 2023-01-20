export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Regenerate our index and product routes
  try {
    await res.revalidate('/')
    await res.revalidate(`/products/${req.body.data.id}`)
    return res.status(200).json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
