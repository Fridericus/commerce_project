<template>
<v-container>
  <v-row class="my-6">
    <v-col class = "pa-0 d-flex">

      <!-- This is the first column (customer reviews heading) -->
      <div class="d-flex flex-column align-center">
        <p class="headline grey--text text--darken-3 ma-0 ">Customer Reviews</p>
        <div 
          v-if="product"
          class="d-flex align-center my-5"
        >
          <v-rating
            :value="product.averageRating"
            color="amber"
            dense
            half-increments
            readonly
            size="24"
          ></v-rating>
          <p class="body grey--text text--darken-3 font-weight-medium ma-0 ">&nbsp;&nbsp;{{product.averageRating}} out of 5</p>
        </div>

        <v-card-actions 
          v-if="product"
          class="d-flex flex-column px-0"
        >
            <v-btn 
              :nuxt=true
              :to="`/reviews/${product._id}`"
              outlined 
              text 
              block class="ma-0 px-3 yellow lighten-2">Write a Review</v-btn>
        </v-card-actions>
      </div>

       <!-- This is the second column (with the customer reviews) -->
       <div class = "blue lighten-3 mx-12">
        <v-card 
          tile
          flat
          max-width="600px"
        >
          <p class="body font-weight-bold my-0 py-0">Customer Images</p>
          <div class="d-flex">
          <v-img
            v-for="(review, review_id) in reviews" 
            :key="review_id"
            :src="review.photo"
            max-width="150px"
            max-height="150px"
            class="my-1 mr-2"
          ></v-img>
          </div>

        </v-card>
        
        <div class="d-flex flex-column">
          <v-card 
            v-for="(review, review_id) in reviews" 
            :key="review_id"
            tile
            flat
            width="600px"
            class="mt-6"
          >
            <v-list-item class = "ma-0 pa-0">
              <v-list-item-avatar color="grey"></v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle>{{ review.user.name }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class = "ma-0 pa-0">
              <v-rating
                :value="review.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="18"
                class = "my-0 py-0"
              ></v-rating>
              <v-list-item-content>
                <p class="body font-weight-bold my-0 py-0">&nbsp;&nbsp;{{ review.headline }}</p>
              </v-list-item-content>
            </v-list-item>
            <v-card-text class = "ma-0 pa-0 pb-3">
              {{ review.body }}
            </v-card-text>
            <v-list-item class = "ma-0 pa-0">
              <v-img
                :key="review_id"
                :src="review.photo"
                max-width="100px"
                max-height="100px"
                class="my-1 mr-2"
              ></v-img>
            </v-list-item>
          <v-divider/>
          </v-card>
         </div>

      </div>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  props: ["product", "reviews"],
};
</script>