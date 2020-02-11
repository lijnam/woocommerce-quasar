<template>
  <q-page padding>
    <q-card
      class="my-card"
      v-for="product in products"
      v-bind:key="product.id"
    >
      <q-img :src="product.images[0].src">
        <div class="absolute-bottom">
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </div>
      </q-img>

      <q-card-actions>
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import WooCommerce from '../services/WooCommerce.js'
export default {
  name: 'PageIndex',
  data () {
    return {
      products: null
    }
  },
  methods: {
    async loadProducts () {
      let products = await WooCommerce.products()
      this.products = products
    }
  },
  created () {
    this.loadProducts()
  }
}
</script>
