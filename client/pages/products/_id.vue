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
        :src=photo
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
              <p class="blue--text title font-weight-medium my-0">{{title}}</p>
              <p class="grey--text caption">by {{ownerName}}</p>
              <p class="grey--text caption my-0">Ships to UK</p>
              <p class="blue--text body-2 font-weight-medium my-0">Hardcover</p>
              <p class="black--text title font-weight-light my-0">£{{price}}</p>

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
            <v-btn outlined text>Add to Cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
export default {
  data: () => ({
    title: null,
    price: null,
    description: null,
    photo: null,
    ownerName: null,
    response: null,
    breadcrumbs: [{text: "Category", href: "index"}, {text: "", disabled: true}],
  }),
  created(){
    this.loadProduct(this);
  },
  methods: {
    loadProduct: (self) => {
      
      //console.log(this.$axios);
      self.$axios.$get(`http://localhost:3000/api/products/${self.$route.params.id}`)
      .then(response => {
        // JSON responses are automatically parsed.
        console.log("winning");
        console.log(response);
        self.response = response;
        self.breadcrumbs[1].text = response.products.title;
        self.title = response.products.title;
        self.description = response.products.description;
        self.price = response.products.price;
        self.ownerName = response.products.owner.name;
        self.photo = response.products.photo;

        //this.posts = response.data
      })
      .catch(e => {
        //this.errors.push(e)
      })
    }
  }
}
</script>

<style scoped>

</style>