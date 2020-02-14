<template>
<!-- <v-container> -->
  <v-row class="red lighten-4">
    <v-col 
      cols=8
      class="green lighten-4 px-8"
    >
      <v-card 
        flat 
        width="1000"
        class="blue lighten-4 featured-style"
      >
        <v-row
          v-for="(product, index) in getCart"
          :key=index
        >
          <v-col>
            <v-card
              flat
              tile
              width="100%"
              class="d-flex"
              :nuxt="true"
            > 

              <v-img
                :src=product.photo
                max-width="150"
                height="255"
              ></v-img>
              <v-container>
                <v-row>
                  <v-col class="px-12 listing-style">
                    <p class="blue--text title font-weight-medium my-0">{{product.title}}</p>
                    <p class="grey--text caption">by {{product.owner.name}}</p>
                    <p class="grey--text caption my-0">Ships to UK</p>
                    <p class="blue--text body-2 font-weight-medium my-0">Hardcover</p>
                    <p class="black--text title font-weight-light my-0">£{{product.price}}</p>

                    <v-divider class="mt-2"></v-divider>
                    <v-select
                      :items=[1,2,3,4,5,6,7,8,9,10]
                      @change="onChangeQuantity($event, product)"
                      :value="product.quantity"
                    >
                    </v-select>
                    <v-card-actions class="pt-3">
                        <v-btn @click="$store.commit('removeProduct', product)" outlined text>Delete</v-btn>
                    </v-card-actions>

                  </v-col>
                </v-row>
              </v-container>
            </v-card>
            <v-divider class="mt-2"></v-divider>

          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col 
      cols=4
      class="orange lighten-4"
    >
    <v-card 
      flat 
      align=center
      class="flex-column purple lighten-4 pb-4"
    >      
      <v-card 
        flat 
        align=center
        outlined
        class="blue lighten-4 pb-4"
      >
        <v-card-subtitle>Subtotal ({{getCartLength}} items): </v-card-subtitle>
        <v-btn outlined text>Proceed to checkout</v-btn>

      </v-card>

      <v-card 
        flat 
        align=center
        outlined
        class="blue lighten-4 my-4"
        
      >
        <v-card-subtitle>Recently viewed items</v-card-subtitle>

      </v-card>
    </v-card>
    </v-col>
  </v-row>
<!-- </v-container> -->
</template>

<script>
import { mapGetters } from "vuex"
// import {mapActions} from "vuex";
// import {mapMutations} from "vuex";

export default {
  data: () => ({
  }),
  computed: {
    ...mapGetters(["getCart", "getCartLength", "getCartTotalPrice"]),
    // ...mapMutations(["changeQty"]),
    // ...mapActions(["updateQty"])

  },
  methods: {
    onChangeQuantity(event, product){
      console.log(this.$store.commit);
      console.log(event);
      let qty = event;
      this.$store.commit("changeQty", {product, qty});
    },
    checkQty(prodQty, qty){
      if (parseInt(prodQty) === parseInt(prodQty)) {
        return true;
      }else{
        return false;
      }
    }
  },

}
</script>