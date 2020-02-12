<template>
  <q-page
    padding
    class="row justify-center"
  >
    <div class="col-lg-8 col-md-8">
      <q-infinite-scroll
        @load="loadProducts"
        :offset="250"
      >
        <product-card v-bind:products="products"></product-card>

        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots
              color="primary"
              size="40px"
            />
          </div>
        </template>
      </q-infinite-scroll>
    </div>

  </q-page>
</template>

<script>

import WooCommerce from '../services/WooCommerce.js'
import ProductCard from '../components/ProductCard'

export default {
  name: 'AllProducts',
  components: {
    'product-card': ProductCard
  },
  data () {
    return {
      products: [],
      page: 1,
      per_page: 8,
      all_products_loaded: false
    }
  },
  methods: {
    async loadProducts (index, done) {
      if (!this.all_products_loaded) {
        let products = await WooCommerce.products(this.page, this.per_page)
        products.map((product) => {
          product.carousel_image = product.images[0].id
          return product
        })
        if (products.length < 1) {
          this.all_products_loaded = true
        }
        this.products = [].concat.apply(this.products, products)
        this.page++
      }
      done()
    }
  },
  created () {
    // this.loadProducts()
  }
}
</script>
