<template>
<v-row>
  <v-col
    class = "blue lighten-4"
  >
    <v-row>
      <v-col
        cols="12"
        class = "red lighten-4"
      >
        <h1>All products</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        class = "red lighten-4 my-1"
      >
        <v-btn tile outlined text n-link to="/product">A new product</v-btn>
        <v-btn tile outlined text n-link to="/category">A new category</v-btn>
        <v-btn tile outlined text n-link to="/owner">A new owner</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        class = "red lighten-4 d-flex flex-wrap mx-auto"
      >
        <v-card
          v-for ="(product, i) in products"
          :key=i
          flat
          tile
          class="card-style"
          max-width="200"
        >
          <v-img
            height="150"
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
          <v-card-actions>
            <v-btn n-link :to="'/product/'+`${product._id}`" tile outlined text href="product" class="warning lighten-1">Update</v-btn>
            <v-btn @click="onDeleteProduct(product._id, i)" tile outlined text class="red lighten-1">Delete</v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
  </v-col>
</v-row>
</template>

<script>
export default {

  async asyncData({$axios}) {
    try{
      let responce = await $axios.$get("http://localhost:3000/api/products");
      console.log(responce);
      return { products: responce.products };

    }catch(err){  

    }
  },
  methods: {
    async onDeleteProduct (id, index) {
      try{
        let responce = await this.$axios.$delete('http://localhost:3000/api/products/'+`${id}`);
        if (responce.status){
          this.products.splice(index,1);
        }
      }catch(err){
        console.log(err);
      }
    }
  }

};
</script>

<style scoped>
.card-style{
  border-style: solid;
  border-width: 1px;
  border-color: rgb(199, 199, 199);
}
</style>