import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'

const WooCommerceAPI = new WooCommerceRestApi({
  url: env('WOOCOMMERCE_URL'),
  consumerKey: env('WOOCOMMERCE_CONSUMER_KEY'),
  consumerSecret: env('WOOCOMMERCE_CONSUMER_SECRET'),
  version: 'wc/v3'
})

async function products (page, perPage) {
  let products = WooCommerceAPI.get('products',
    {
      'status': 'publish',
      'per_page': perPage,
      'page': page
    })
  products = await products
  // console.log(products)
  return products.data
}

async function orders () {
  let orders = WooCommerceAPI.get('orders')
  return orders.data
}

export default {
  products,
  orders
}
