<template>
<v-container >

  <v-row>
    <v-col>
      <p>{{$auth.$state.user.address.name}}</p>
      <p>{{$auth.$state.user.address.streetAddress}}</p>
      <p>{{$auth.$state.user.address.city}}</p>
      <p>{{$auth.$state.user.address.country}}</p>
      <p>{{$auth.$state.user.address.phoneNumber}}</p>
      <p>{{$auth.$state}}</p>

    </v-col>
  </v-row>

  <v-row 
    v-for="(product, index) in getCart"
    :key=index
  >
    <v-col>
      <p>{{product.title}}</p>
      <p>{{product.owner.name}}</p>
      <p>{{product.price * product.quantity}}</p>
      <p>{{product.quantity}}</p>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <p>£{{getCartTotalPrice}}</p>
      <p>£{{getCartTotalPriceWithShipping}}</p>
    </v-col>
  </v-row>

  <v-row>
    <v-radio-group @change="onChooseShipping" value="normal" :mandatory="true">
      <v-radio label="Normal" value="normal"></v-radio>
      <v-radio label="Fast" value="fast"></v-radio>
    </v-radio-group>
    <v-col>
      <p :v-if=shippingPrice>£{{shippingPrice}}</p>
      <p :v-if=estimatedDelivery>{{estimatedDelivery}}</p>
    </v-col>
  </v-row>

</v-container>  
</template>

<script>
import {mapGetters} from "vuex";
export default {
  layout: "none",
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
  data: () => ({
    shippingPrice: null,
    estimatedDelivery: null
  }),
  computed: {
    ...mapGetters(["getCart", "getCartTotalPrice", "getCartTotalPriceWithShipping"])
    
  },
  methods: {
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