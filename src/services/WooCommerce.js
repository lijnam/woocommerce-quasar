import axios from 'axios'
async function products (page, perPage) {
  let products = await axios.get(env('WOOCOMMERCE_API_URL') + 'products',
    {
      params: {
        'status': 'publish',
        'per_page': perPage,
        'page': page
      }
    })
  // console.log(products)
  return products.data
}

async function orders () {
  let orders = await axios.get('orders')
  return orders.data
}

export default {
  products,
  orders
}
