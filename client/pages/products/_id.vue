<template>
<div>
  <v-row>
      <!-- Breadcrumbs -->
      <v-col class="d-flex">
          <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      </v-col>
  </v-row>
  <v-row>

    <v-col class="green lighten-4" cols=4>
      <v-img
        v-if='product'
        :src='product.photo'
        height=300
        width=190
        class = "mx-auto"
      ></v-img>
    </v-col>

    <v-col class="blue lighten-4" cols=4>
      <v-card
        flat
        tile
        width="100%"
        class="d-flex"
      > 
        <v-container>
          <v-row>
            <v-col class="px-12 listing-style">
              <p v-if='product' class="blue--text title font-weight-medium my-0">{{product.title}}</p>
              <p v-if='product' class="grey--text caption">by {{product.ownerName}}</p>
              <v-rating
                v-if='product'
                :value="product.averageRating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
              <p class="grey--text caption my-0">Ships to UK</p>
              <p class="blue--text body-2 font-weight-medium my-0">Hardcover</p>
              <p v-if='product' class="black--text title font-weight-light my-0">£{{product.price}}</p>

              <v-divider class="mt-2"></v-divider>

            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>

    <v-col class="orange lighten-4" cols=4>
      <v-card
        flat
        tile
      >
        <v-card-actions class="pt-3">
            <v-btn outlined text>Buy Now</v-btn>
            <v-btn @click="addProductToCart(product)" outlined text>Add to Cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <ReviewSection :product="product" :reviews="reviews"/>
  </v-row>
</div>
</template>

<script>
import ReviewSection from "~/components/ReviewSection";
import {mapActions} from "vuex";
export default {
  components: {
    ReviewSection
  },
  data: () => ({
    title: null,
    price: null,
    description: null,
    photo: null,
    ownerName: null,
    product: null,
    breadcrumbs: [{text: "Category", href: "index"}, {text: "", disabled: true}],
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