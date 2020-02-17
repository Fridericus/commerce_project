<template>
<v-container>  
  <v-row>
    <v-col>
      <p>{{ $auth.$state.user.name }}</p>
    </v-col>
  </v-row>
  <v-row 
    v-for="(order, index) in orders"
    :key=index
    class="red lighten-4 ma-2"
  >
    <v-col>
      <p>{{ order.estimatedDelivery }}</p>
        <v-row 
          v-for="(product, index) in order.products"
          :key=index
          class="blue lighten-4 ma-2"
        >
          <v-col>
             <p>{{ product }}</p>
          </v-col>
        </v-row>
    </v-col>
  </v-row>
  <v-row>
    <v-col>

    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/orders");
      console.log(response.products);

      return {
        orders: response.products
      };

    }catch(err){
      console.log(err);
    }
  }
}
</script>