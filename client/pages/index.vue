<template>
<div>

<!-- Carousel -->
<v-carousel>
  <v-carousel-item
    v-for="(item,i) in items"
    :key="i"
    :src="item.src"
    reverse-transition="fade-transition"
    transition="fade-transition"
  ></v-carousel-item>
</v-carousel>

<v-container>
  <div>
    <v-card
      class="d-flex flex-wrap justify-center"
      flat
    >
      <v-card
        v-for="(product, i) in products"
        :key=i
        :hover=true
        :nuxt=true
        :to="`/products/${product._id}`"
        flat
        outlined
        width="350px"
        class="d-flex ma-2"
      > 

        <v-img
          :src=product.photo
          max-width="150"
          height="285"
        ></v-img>
        <v-container>
          <v-row style="height: 100%;">
            <v-col class="mx-4">

                <div style="height: 100%;" class="d-flex align-start flex-column">
                    <div class="mb-auto">
                      <p class="blue--text title font-weight-medium my-0">{{product.title}}</p>
                      <p class="grey--text caption">by {{product.owner.name}}</p>
                    </div>

                    <div class="mt-auto">
                      <p class="grey--text caption my-0">Ships to UK</p>
                      <p class="blue--text body-2 font-weight-medium my-0">Hardcover</p>
                      <p class="black--text title font-weight-light my-0">£{{product.price}}</p>
                      <v-divider class="mt-2"></v-divider>
                      <v-card-actions class="pt-3">
                          <v-btn outlined text>View Item</v-btn>
                      </v-card-actions>
                    </div>
                </div>

            </v-col>
          </v-row>
        </v-container>
      </v-card>
      </v-card>
  </div>

</v-container>

<!-- 
<v-container>
<v-row class="red lighten-4"> -->

  <!-- Featured item -->
  <!-- <v-col class="grey lighten-4 mx-12">
    <v-row class="red lighten-4">
      <v-col 
       align=center
       class="grey lighten-4"
      >
        <v-card 
          flat 
          align=center
          class="grey lighten-4 featured-style"
        >
          <FeaturedProduct/>
        </v-card>
      </v-col>
    </v-row> -->

    <!-- <v-row class="red lighten-4">
      <v-col align=center class="green lighten-4">
        <v-card 
          flat 
          width="1000"
          align=center
          class="blue lighten-2 featured-style"
        >
          <v-row
            v-for="(product, i) in products"
            :key=i
          >
            <v-col>
              <v-card
                flat
                tile
                width="100%"
                class="d-flex"
                :nuxt=true
                :to="`/products/${product._id}`"
              > 

                <v-img
                  :src=product.photo
                  max-width="150"
                  height="255"
                ></v-img>
                <v-container>
                  <v-row>
                    <v-col class="px-12 listing-style">
                      <p class="blue--text title font-weight-medium my-0">{{product.title}}</p>
                      <p class="grey--text caption">by {{product.owner.name}}</p>
                      <p class="grey--text caption my-0">Ships to UK</p>
                      <p class="blue--text body-2 font-weight-medium my-0">Hardcover</p>
                      <p class="black--text title font-weight-light my-0">£{{product.price}}</p>

                      <v-divider class="mt-2"></v-divider>
                      <v-card-actions class="pt-3">
                          <v-btn outlined text>Buy Now</v-btn>
                          <v-btn outlined text>Add to Cart</v-btn>
                      </v-card-actions>

                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row> 

</v-row>
</v-container> -->
</div>
</template>

<script>
import FeaturedProduct from '~/pages/FeaturedProduct'
export default {
  components: {
    FeaturedProduct
  },
  async asyncData({$axios}){
    try {
      let responce = await $axios.$get('/api/products');
      console.log(responce);
      return {
        products: responce.products
      }

    }catch(err){
      console.log(err);
    }
  },
  data: () => ({
    items: [
      {
        src: 'https://cdn.waterstones.com/images/00142806-3600x1000.jpeg',
      },
      {
        src: 'https://cdn.waterstones.com/images/00142199-3600x1000.jpeg',
      },
      {
        src: 'https://cdn.waterstones.com/images/00142203-3600x1000.jpeg',
      }
    ],
  })
}
</script>

<style scoped>
.featured-style{
  /* width: 500px;
  height: 500px; */
}

.listing-style{
  text-align: left;
}
</style>