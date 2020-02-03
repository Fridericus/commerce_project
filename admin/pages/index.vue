<template>
<div>
  <v-row>
    <v-col
      cols="12"
      style="height: 200px;"
      class = "blue lighten-4 "
    >
      <h1>All products</h1>
      <v-btn href="#">A new product</v-btn>
      <v-btn href="#">A new category</v-btn>
      <v-btn href="#">A new owner</v-btn>

    </v-col>
  </v-row>

  <v-row>
    <v-col
      cols="12"
      class = "green lighten-4 d-flex flex-row"
    >
      <v-card
        v-for ="(product, i) in products"
        :key=i
        class="my-12 mx-4"
        max-width="300"
      >
        <v-img
          height="200"
          :src=product.photo
        ></v-img>

        <v-card-title>{{ product.title }}</v-card-title>
        <v-card-text class="pb-0 font-weight-black title black--text">
          <div>£{{ product.price }}</div>
        </v-card-text>        
        
        <v-card-subtitle class="pb-2">{{ product.description }}</v-card-subtitle>

        <v-card-text>

          <v-row
            align="center"
            class="mx-0 pt-0"
          >
            <v-rating
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ml-4">4.5 (413)</div>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- <p>{{ products }}</p> -->

    </v-col>
  </v-row>
</div>
</template>

<script>
export default {

  data: () => ({

  }),
  async asyncData({$axios}) {
    try{
      let responce = await $axios.$get("http://localhost:3000/api/products");
      console.log(responce);
      //this.products = "dfdfdfdfd";
      return { products: responce.products };

    }catch(err){  

    }
  }
};
</script>
