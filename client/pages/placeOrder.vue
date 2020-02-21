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
      <div v-if="$auth.$state.user.address">
        <v-card
          flat 
          min-width="300"
          outlined
          class = "px-10 py-6 d-flex "
        >
        <v-col cols=4 class="green lighten-4">

          <v-row>

            <v-col>
              <v-btn
                outlined
                color=blue
                small
                href="/profile"
                :nuxt=true
                class="red--text float-right" 
              >
                Change Address
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-card
              outlined
              class="mb-2 pa-4 grey lighten-3"
            >
              <p class="black--text overline my-1">{{$auth.$state.user.address.fullName}}</p>
              <p class="black--text overline my-1">{{$auth.$state.user.address.streetAddress}}</p>
              <p class="black--text overline my-1">{{$auth.$state.user.address.city}}</p>
              <p class="black--text overline my-1">{{$auth.$state.user.address.county}}</p>
              <p class="black--text overline my-1">{{$auth.$state.user.address.postCode}}</p>
              <p class="black--text overline my-1">{{$auth.$state.user.address.country}}</p>
              <p class="black--text overline my-1">{{$auth.$state.user.address.phoneNumber}}</p>
            </v-card>

          </v-row>

        </v-col>
        <v-col cols=4 class="blue lighten-4">

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

            <p>£{{getCartTotalPrice}}</p>
            <p>£{{getCartTotalPriceWithShipping}}</p>
                  
            <p class="title float-left">Subtotal ({{getCartLength}} items): </p>
            <p class="red--text text--darken-3 title font-weight-bold float-left">&nbsp;£{{getCartTotalPriceWithShipping}}</p>

            <!-- <v-card-subtitle class="float-left pt-0">Subtotal with shipping ({{getCartLength}} items): £{{getCartTotalPriceWithShipping}}</v-card-subtitle> -->

            <v-btn 
              outlined
              block
              text
              :nuxt="true"
              to="/placeOrder"
              class="orange lighten-1"
            >Place Order</v-btn>

          </v-card>

        </v-card>

        </v-col>


        </v-card>
        
      </div>
      <div v-else>
        <v-btn
          outlined
          color=blue
          small
          href="/profile"
          :nuxt=true
          class="red--text float-right" 
        >
          Select Address
        </v-btn>
      </div>
    </v-col>
  </v-row>

  <v-row>
    <v-container>
      <v-card
        outlined
      >
        <v-row
          v-for="(product, index) in getCart"
          :key=index
        >
          <v-col>
            <v-card
              flat
              width="100%"
              class="d-flex pa-4"
            > 

              <v-img
                :src=product.photo
                max-width="80"
                height="120"
                class="mx-4"
              ></v-img>

              <v-container class="py-0">
                <v-row no-gutters>
                  <v-col class="">
                    <p class="subtitle1 grey--text text--darken-3 font-weight-medium my-0">{{product.title}}</p>
                    <p class="grey--text overline my-1">by {{product.owner.name}}</p>
                    <p class="blue--text body-2 font-weight-medium my-0">Hardcover</p>
                    <p class="back--text body-2 font-weight-medium my-1">Quantity: {{product.quantity}}</p>
                    <p align-self=true class="red--text text--darken-3 body-2 font-weight-medium  my-0 ">£{{product.price * product.quantity}}</p>

                  </v-col>

                </v-row>
              </v-container>
            </v-card>
            <v-divider/>

          </v-col>
        </v-row>
      </v-card>
    </v-container>
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




</v-container>  
</template>

<script>
import {mapGetters} from "vuex";
import Address from '~/pages/address/index'

export default {
  components: {
    Address
  },
  middleware: "auth",
  auth: "login",
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
    breadcrumbs: [{text: "Cart", href: '/cart'}, {text: "Place Order", disabled: true}],
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