<template>
<v-container>
  <v-row>
      <!-- Breadcrumbs -->
      <v-col class="d-flex">
          <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      </v-col>
  </v-row>

  <v-row>

    <v-col cols=3>
      <v-img
        v-if='product'
        :src='product.photo'
        height=300
        width=190
        class = "mx-auto elevation-10"
      ></v-img>
    </v-col>

    <v-col cols=6>
      <v-card
        flat
        outlined
        width="100%"
        height="100%"
        class="d-flex"
      > 
        <v-container>
          <v-row>
            <v-col class="px-10 listing-style">
              <p v-if='product' class="blue--text title font-weight-medium my-0">{{product.title}}</p>
              <p v-if='product' class="grey--text caption mb-0">by {{product.owner.name}}</p>
              <v-rating
                v-if='product'
                :value="product.averageRating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <v-divider class="my-4"></v-divider>
              <div class="d-flex">
                <v-card
                  flat
                  outlined
                  hover
                  width="120px"
                  class="pa-2 mr-2 deep-orange lighten-5"
                > 
                  <p class="black--text body-2 font-weight-medium  my-0">Hardcover</p>
                  <p v-if='product' class="red--text text--darken-3 body font-weight-bold my-0 py-0">£{{product.price}}</p>
                </v-card>

                <v-card
                  flat
                  outlined
                  hover
                  width="120px"
                  class="pa-2 mx-2"
                > 
                  <p class="black--text body-2 font-weight-regular  my-0">Paperback</p>
                  <p v-if='product' class="grey--text  caption font-weight-regular font-italic my-0 py-0">Unavailiable</p>
                </v-card>

                <v-card
                  flat
                  outlined
                  hover
                  width="120px"
                  class="pa-2 mx-2"
                > 
                  <p class="black--text body-2 font-weight-regular  my-0">Audio CD</p>
                  <p v-if='product' class="grey--text  caption font-weight-regular font-italic my-0 py-0">Unavailiable</p>
                </v-card>
              </div>

              <v-divider class="my-4"></v-divider>

              <p v-if='product' class="grey--text text--darken-3 font-weight-light body my-0 py-0">{{product.description}}</p>


            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>

    <v-col class="" cols=3>
      <v-card
        flat
        outlined
        class="pa-3"
      >

        <p v-if='product' class="red--text text--darken-3 title font-weight-regular  my-0">£{{product.price}}</p>
        <p class="grey--text caption">Ships to UK</p>

        <p class="grey--text text--darken-2 caption float-left">Delivery by</p>
        <p class="grey--text text--darken-3 caption float-left font-weight-bold">&nbsp;Tuesday&nbsp;</p>
        <p class="grey--text text--darken-2 caption "> if you order today.</p>

        <p class="green--text text--darken-2 title font-weight-regular  my-0">In stock.</p>

        <v-card-actions class="d-flex flex-column px-0">
            <v-btn outlined text block class="ma-0 yellow lighten-2">Buy Now</v-btn>
            <v-btn @click="addProductToCart(product)" outlined text block class="ma-0 mt-3 px-0 orange lighten-1">Add to Cart</v-btn>
        </v-card-actions>

        <v-divider class="my-2 "></v-divider>

        <div class="d-flex">
          <v-icon class="dark">location_on</v-icon>
          <p class="grey--text caption my-1 pl-2">Delivering to: Frederick - Newcastle NE4 46Y</p>
        </div>

      </v-card>
    </v-col>
  </v-row>

  <v-divider class="my-2"></v-divider>

  <v-row>
    <ReviewSection :product="product" :reviews="reviews"/>
  </v-row>
  
</v-container>

</template>

<script>
import ReviewSection from "~/components/ReviewSection";
import {mapActions} from "vuex";
export default {
  components: {
    ReviewSection
  },
  data: () => ({
    product: null,
    breadcrumbs: [{text: "New", href: "/"}, {text: "", disabled: true}],
    reviews: []
  }),
  created(){
    this.loadProduct(this);
    this.loadReviews(this);
  },
  methods: {
    loadProduct: (self) => {
      
      //console.log(this.$axios);
      self.$axios.$get(`http://localhost:3000/api/products/${self.$route.params.id}`)
      .then(response => {
        // JSON responses are automatically parsed.
        console.log("winning");
        console.log(response);
        self.product = response.products;
        self.breadcrumbs[1].text = response.products.title;

        //this.posts = response.data
      })
      .catch(e => {
        //this.errors.push(e)
      })
    },
    loadReviews: (self) => {
      
      //console.log(this.$axios);
      self.$axios.$get(`http://localhost:3000/api/reviews/${self.$route.params.id}`)
      .then(response => {
        // JSON responses are automatically parsed.
        console.log("winning reviews");
        console.log(response);
        self.reviews = response.reviews;
      })
      .catch(e => {
        //this.errors.push(e)
      })
    },
    // Maps the vuex store actions to methods
    ...mapActions(["addProductToCart"])
  }
}
</script>

<style scoped>

</style>