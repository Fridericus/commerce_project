<template>
<v-row>
  <v-col cols=5 class = "red lighten-4 mx-auto">
    <v-card v-for="(review, review_id) in reviews" 
    :key="review_id"
    tile
    flat
    >
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle>by {{ review.user.name }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-rating
          :value="review.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
        <v-list-item-content>
          <v-card-subtitle class="headline">{{ review.headline }}</v-card-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        {{ review.body }}
      </v-card-text>
      <!-- {{ review._id }}
      {{ review.photo }} -->
      <v-divider/>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: ["product", "reviews"],
};
</script>