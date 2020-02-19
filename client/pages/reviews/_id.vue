<template>
<v-container>
  <v-row>
      <!-- Breadcrumbs -->
      <v-col class="d-flex">
          <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-card
        outlined
        max-width="1000px"
        class="mx-auto"
      >
        <v-row class="d-flex">
          <v-col cols=3>
            <v-img
              v-if='photo'
              :src='photo'
              class = "mx-6 my-3"
            ></v-img>
          </v-col>

          <v-col>
            <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
              class = "px-6 "
            >
              <v-card-subtitle>{{ title }}</v-card-subtitle>
              <v-card-title>Your Rating</v-card-title>

              <v-rating
                v-if='product'
                v-model="rating"
                color="amber"
                dense
                size="60"
              ></v-rating>       

              <v-card-title>Add a Headline</v-card-title>
              <v-text-field
                v-model="headline"
                :counter="30"
                :rules="headlineRules"
                outlined
                dense
                light
                filled
                label="Whats most important to know?"
                required
              ></v-text-field>

              <v-card-title>Add photo or video</v-card-title>
              <!-- Picture field -->
              <v-file-input 
                @change="onSelectedFile" 
                accept="image/*" 
                outlined
                dense
                light
                filled
                label="Shoppers find images and videos more helpful than text alone."
              >
              </v-file-input>

              <v-card-title>Write your review</v-card-title>
              <v-textarea
                v-model="body"
                :counter="600"
                :rules="reviewRules"
                outlined
                dense
                light
                filled
                label="What do you like or dislike? What did you see this product for?"
                required
              ></v-textarea>

              <v-btn 
                @click="onAddReview"
                outlined 
                text 
                block 
                class="ma-0 orange lighten-1"
              >Buy Now</v-btn>

              <!-- <v-btn
                color="warning"
                @click="onAddReview"
                outlined
                tile
                class="mt-5"
              >
                Submit
              </v-btn> -->
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
  <!--/MAIN-->
</v-container>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  components: {
    StarRating
  },
  // async asyncData({$axios, params}) {
  //   try{
  //     let responce = await $axios.$get(`/api/products/${params.id}'`);

  //     return {
  //       product: responce.product
  //     }

  //   }catch(err){
  //     console.log(err);
  //   }
  // },
  data: () => ({
    title: null,
    price: null,
    description: null,
    photo: null,
    ownerName: null,
    response: null,
    product: null,

    rating: 5,
    headline: "",
    body: "",
    fileUpload: null,
    fileName: null,
    breadcrumbs: [{text: "New", href: "/"}, {text: "",  href: "/"}, {text: "Write a Review", disabled: true}],
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
        self.title = response.products.title;
        self.description = response.products.description;
        self.price = response.products.price;
        self.ownerName = response.products.owner.name;
        self.photo = response.products.photo;

        self.product = response.products;
        self.breadcrumbs[1].text = response.products.title;
        self.breadcrumbs[1].href = `/products/${response.products._id}`;

        //this.posts = response.data
      })
      .catch(e => {
        //this.errors.push(e)
      })
    },
    onSelectedFile(event) {
      console.log(event);
      this.fileUpload = event;
      this.fileName = event.name;
    },
    async onAddReview(){
      try{
        let data = new FormData;
        data.append("headline", this.headline);
        data.append("body", this.body);
        data.append("rating", this.rating);
        data.append("photo", this.fileUpload, this.fileUpload.name);

        let responce = await this.$axios.$post(`/api/reviews/${this.$route.params.id}`, data);
        this.$router.push(`/products/${this.$route.params.id}`);

      }catch(err){

        console.log(err);


      }
    }
  }
}
</script>

}
</script>