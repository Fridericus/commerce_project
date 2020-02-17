<template>
<v-container>  
  <v-row>
    <v-col>
      <p>The total price is £{{getCartTotalPriceWithShipping}}</p>
      <div ref="card"></div>
      <v-btn @click="onPurchase">
        Purchase
      </v-btn>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  data: () => ({
    error: "",
    stripe: null,
    card: null
  }),
  computed: {
    ...mapGetters(['getCart', 'getCartTotalPriceWithShipping', 'getEstimatedDelivery']),
  },
  mounted() {
    this.stripe = Stripe("pk_test_DqFxF52keh5qMVT9vKZWfc5J00TN4UGkOy");
    let elements = this.stripe.elements();
    this.card =  elements.create("card");
    this.card.mount(this.$refs.card);
  },
  methods: {
    async onPurchase() {
      try{
        let token = await this.stripe.createToken(this.card);
        let response = await this.$axios.$post('/api/payment', {
          token: token,
          totalPrice: this.getCartTotalPriceWithShipping,
          cart: this.getCart,
          estimatedDelivery: this.getEstimatedDelivery
        });

        if (response.success){
          this.$store.commit("clearCart");
          this.$router.push("/");
        }
      }catch(err){console.log(err);}
    }
  }
}
</script>

<style scoped>
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>