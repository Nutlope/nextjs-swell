export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  try {
    // Regenerate our index and product routes
    const productName = req.body.data.name
    const productSlug = productName.replace(/\s/g, '-').toLowerCase()
    await res.unstable_revalidate('/')
    await res.unstable_revalidate(`/${productSlug}`)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
