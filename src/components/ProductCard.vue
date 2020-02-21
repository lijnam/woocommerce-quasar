<template>
  <div class="row">
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
        swipeable
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

    <!--   <q-card-section class="q-pb-none">

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{product.name}}
          </div>
        </div>

      </q-card-section> -->

      <q-card-section class="q-pt-none">

        <q-card-actions
          align="center"
          class=""
        >
          <div
            class="text-subtitle1"
            v-html="product.price_html"
          >
          </div>
          <q-btn
            flat
            icon="more_vert"
          >More options</q-btn>
        </q-card-actions>
      </q-card-section>

      <q-separator />

    </q-card>
  </div>

</template>

<script>
export default {
  name: 'ProductCard',
  props: ['products'],
  data () {
    return {
    }
  },
  methods: {
    getCarouselImage (image) {
      let imageIndex = image.lastIndexOf('/') + 1
      let imageName = image.substr(imageIndex)
      let imageExtension = imageName.substr(imageName.lastIndexOf('.'))
      imageName = imageName.substr(0, imageName.lastIndexOf('.')) + '-324x324'
      //   console.log(image.substr(0, imageIndex) + imageName + imageExtension)
      image = image.substr(0, imageIndex) + imageName + imageExtension
      return image
    }
  }
}
</script>

<style>
.q-carousel__slide {
  background-size: contain; /* don't crop the image  */
  background-repeat: no-repeat; /* only show the image one time  */
  /* background-color: rgb(3, 3, 3); color to fill empty space with  */
}
.q-carousel__navigation-inner {
  overflow-x: auto;
}
</style>
