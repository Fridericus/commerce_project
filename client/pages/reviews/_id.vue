<template>
<div>
  <v-row>
    <v-col 
      cols=6
      class="blue lighten-4 mx-auto"
    >
      <v-card>
        <v-card-title>Create Review</v-card-title>
        <v-row>
          <v-col cols=6>
            <v-img
              v-if='photo'
              :src='photo'
              height=150
              width=100
              class = "mx-auto"
            ></v-img>
          </v-col>
          <v-col cols=6>
            <v-card-subtitle>{{ title }}</v-card-subtitle>
          </v-col>
        </v-row>

        <v-form
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
        >
          <v-card-title>Overall Rating</v-card-title>
          <no-ssr>
            <star-rating v-model="rating"></star-rating>
          </no-ssr>
          <v-card-title>Add photo or video</v-card-title>
          <!-- Picture field -->
          <v-file-input 
            @change="onSelectedFile" 
            accept="image/*" 
            label="Shoppers find images and videos more helpful than text alone."
          >
          </v-file-input>

          <v-card-title>Add a Headline</v-card-title>
          <v-text-field
            v-model="headline"
            :counter="10"
            :rules="headlineRules"
            label="Whats most important to know?"
            required
          ></v-text-field>

          <v-card-title>Write your review</v-card-title>
          <v-text-field
            v-model="body"
            :rules="reviewRules"
            label="What do you like or dislike? What did you see this product for?"
            required
          ></v-text-field>

          <v-btn
            color="warning"
            @click="onAddReview"
            outlined
            tile
            class="mt-5"
          >
            Submit
          </v-btn>

        </v-form>
      </v-card>
    </v-col>
  </v-row>
  <!--/MAIN-->
</div>
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

    rating: 0,
    headline: "",
    body: "",
    fileUpload: null,
    fileName: null,
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