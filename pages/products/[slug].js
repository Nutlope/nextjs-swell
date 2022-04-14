import swell from '../../swell'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Product({ product }) {
  const router = useRouter()
  async function checkout(productId) {
    await swell.cart.setItems([])
    await swell.cart.addItem({
      product_id: productId,
      quantity: 1,
    })
    const cart = await swell.cart.get()
    router.push(cart.checkout_url)
  }
  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="mx-auto mt-16 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto flex flex-col sm:flex-row">
          <Image
            alt="coffee"
            className="rounded-lg"
            src={product.images[0].file.url}
            width={560}
            height={640}
            objectFit="cover"
          />
          <div className="mt-10 flex flex-col sm:mt-0 sm:ml-10">
            <h1 className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
              {product.name}
            </h1>
            <h1 className="mt-3 text-4xl font-bold text-gray-500 sm:text-3xl sm:tracking-tight lg:text-3xl">
              ${product.price}
            </h1>
            <button
              className="mt-5 rounded-md border border-transparent bg-orange-600 px-4 py-3 font-medium text-white shadow-sm hover:bg-orange-400 sm:px-8"
              onClick={() => checkout(product.id)}
            >
              Checkout
            </button>
            <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold">
              Description
            </div>
            <p className="max-w-xl">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const swellProduct = await swell.products.get(params.slug)
  return {
    props: {
      product: swellProduct,
    },
  }
}

export async function getStaticPaths() {
  const swellProducts = await swell.products.list()
  let fullPaths = []
  for (let product of swellProducts.results) {
    fullPaths.push({ params: { slug: product.id } })
  }

  return {
    paths: fullPaths,
    fallback: 'blocking',
  }
}
