<template>
<v-container>
<!-- <v-row class="red lighten-4">
  <v-col class="grey lighten-4 mx-12">
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

    <v-row class="red lighten-4">
      <v-col align=center class="green lighten-4">
        <v-card 
          flat 
          width="600"
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
                :nuxt="true"
                :to="`/products/${product.objectID}`"  
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

</v-container>
</template>

<script>
import FeaturedProduct from '~/pages/FeaturedProduct'
export default {
  components: {
    FeaturedProduct
  },
  watchQuery: ["title"],
  async asyncData({$axios, query}){
    try{
      let responce = await $axios.$post('/api/search', {title: query.title });

      console.log(responce);

      return {
        products: responce.products
      }

    }catch(err){
      console.log(err);
    }
  }

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