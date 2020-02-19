<template>
<v-container>
  <v-row>
    <v-col 
      cols=8
      class="px-4"
    >
      <v-card 
        flat 
        width="1000"
        outlined
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
              class="d-flex pa-4"
            > 

              <v-img
                :src=product.photo
                max-width="100"
                height="150"
                class="mx-4"
              ></v-img>

              <v-container class="py-0">
                <v-row no-gutters>
                  <v-col class="">
                    <p class="subtitle1 grey--text text--darken-3 font-weight-medium my-0">{{product.title}}</p>
                    <p class="grey--text overline my-1">by {{product.owner.name}}</p>
                    <p class="blue--text body-2 font-weight-medium my-0">Hardcover</p>

                    <v-divider class="mt-2"></v-divider>

                    <a @click="$store.commit('removeProduct', product)" class="blue--text caption link pt-2">Delete</a>

                  </v-col>
                  <v-col >
                    <div class="d-flex justify-center">
                      <p align-self=true class="red--text text--darken-3 title font-weight-bold  my-0">£{{product.price * product.quantity}}</p>
                    </div>
                  </v-col>

                  <v-col>
                    <v-select
                      :items=[1,2,3,4,5,6,7,8,9,10]
                      filled
                      outlined
                      dense
                      @change="onChangeQuantity($event, product)"
                      :value="product.quantity"
                      width="50"
                    >
                    </v-select>
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
      class=""
    >
    <v-card 
      flat 
      align=center
      class="flex-column pb-4"
    >      
      <v-card 
        flat 
        align=center
        outlined
        class="pa-4 grey lighten-3"
      >


        <!-- <v-card-subtitle>Shipping Options</v-card-subtitle>
        <v-container class="d-flex px-0" fluid>
          <v-col>
            <v-radio-group @change="onChooseShipping" value="normal" :mandatory="true">
              <v-radio label="Normal" value="normal"></v-radio>
              <v-radio label="Fast" value="fast"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col>
            <p :v-if=shippingPrice>£{{shippingPrice}}</p>
            <p :v-if=estimatedDelivery>{{estimatedDelivery}}</p>
          </v-col>
        </v-container> -->

        <p class="title float-left">Subtotal ({{getCartLength}} items): </p>
        <p class="red--text text--darken-3 title font-weight-bold float-left">&nbsp;£{{getCartTotalPrice}}</p>

        <!-- <v-card-subtitle class="float-left pt-0">Subtotal with shipping ({{getCartLength}} items): £{{getCartTotalPriceWithShipping}}</v-card-subtitle> -->

        <v-btn 
          outlined
          block
          text
          :nuxt="true"
          to="/placeOrder"
          class="orange lighten-1"
        >Proceed to checkout</v-btn>

      </v-card>

    </v-card>

    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  data: () => ({
    shippingPrice: null,
    estimatedDelivery: null
  }),
  async asyncData({$axios, store}){
    try{

      let response = await $axios.$post('/api/shipment', {shipment: "normal"});

      store.commit('setShipment', {price: response.shipment.price, estimatedDelivery: response.shipment.estimated});

      return {
        shippingPrice: response.shipment.price,
        estimatedDelivery: response.shipment.estimated
      }

    }catch(err){
      console.log(err);
    }
  },
  computed: {
    ...mapGetters(["getCart", "getCartLength", "getCartTotalPrice", "getCartTotalPriceWithShipping"])
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
    },
    async onChooseShipping(shipment){
      console.log(shipment);

      try{
        let response = await this.$axios.$post("/api/shipment", {
          shipment: shipment
        });

        this.$store.commit("setShipment", {
          price: response.shipment.price,
          estimatedDelivery: response.shipment.estimated
        });

        this.shippingPrice = response.shipment.price;
        this.estimatedDelivery = response.shipment.estimated;

      }catch(err){
        console.log(err);
      }
    }

  }

}
</script>