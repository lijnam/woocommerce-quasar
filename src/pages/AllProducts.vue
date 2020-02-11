<template>
  <q-page
    padding
    class="row"
  >
    <q-card
      class="col-xs-12 col-sm-4 col-md-3 "
      flat
      v-for="(product,product_key) in products"
      v-bind:key="product.id"
    >
      <q-carousel
        transition-prev="slide-right"
        transition-next="slide-left"
        control-color="grey"
        keep-alive
        animated
        navigation
        infinite
        thumbnails
        :value="product.images[0].id"
        v-model="products[product_key].carousel_image"
      >
        <q-carousel-slide
          v-for="image in product.images"
          v-bind:key="image.id"
          :name="image.id"
          :img-src="getCarouselImage(image.src)"
        />

      </q-carousel>

      <q-card-section>

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{product.name}}
          </div>
        </div>

        <!--    <q-rating
          v-model="stars"
          :max="5"
          size="32px"
        /> -->
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div
          class="text-subtitle1"
          v-html="product.price_html"
        >
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="center">
        <q-btn
          flat
          round
          icon="event"
        />
        <q-btn
          flat
          color="primary"
        >
          Reserve
        </q-btn>
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
      products.map((product) => {
        product.carousel_image = product.images[0].id
        return product
      })
      this.products = products
    },
    getCarouselImage (image) {
      let imageIndex = image.lastIndexOf('/') + 1
      let imageName = image.substr(imageIndex)
      let imageExtension = imageName.substr(imageName.lastIndexOf('.'))
      imageName = imageName.substr(0, imageName.lastIndexOf('.')) + '-324x324'
      //   console.log(image.substr(0, imageIndex) + imageName + imageExtension)
      image = image.substr(0, imageIndex) + imageName + imageExtension
      return image
    }
  },
  created () {
    this.loadProducts()
  }
}
</script>

<style  scoped>
.q-carousel__slide {
  background-size: contain; /* don't crop the image  */
  background-repeat: no-repeat; /* only show the image one time  */
  /* background-color: rgb(3, 3, 3); color to fill empty space with  */
}
</style>
