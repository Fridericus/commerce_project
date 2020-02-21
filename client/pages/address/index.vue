<template>

  <v-card
    flat 
    max-width="600"
    min-width="300"
    outlined
    class = "px-10 py-6"
  >
    <v-row class="">
      <v-col>
        <p class="text--text title font-weight-medium mb-2">Your Addresses</p>
        <p>{{message}}</p>
      </v-col>
      <v-col>
        <v-btn
          outlined
          color=blue
          small
          href="/address/add"
          :nuxt=true
          class="red--text float-right" 
        >
          Add Address
        </v-btn>
      </v-col>
    </v-row>
    <v-row>

      <div v-if='addresses'>
        <v-card
          v-for="(address, index) in addresses"
          :key=index
          outlined
          class="mb-2 pa-4 grey lighten-3"
        >
          <p class="black--text overline my-1">{{address.fullName}}</p>
          <p class="black--text overline my-1">{{address.streetAddress}}</p>
          <p class="black--text overline my-1">{{address.city}}</p>
          <p class="black--text overline my-1">{{address.county}}</p>
          <p class="black--text overline my-1">{{address.postCode}}</p>
          <p class="black--text overline my-1">{{address.country}}</p>
          <p class="black--text overline my-1">{{address.phoneNumber}}</p>

          <div class="mt-2">
            <v-btn 
              small
              outlined
              :to="`/address/${address._id}`" 
            >Edit</v-btn>
            <v-btn 
              small 
              outlined
              @click="onDeleteAddress(address._id, index)"
            >Delete</v-btn>
            <v-btn 
              small 
              outlined
              @click="onSetDefault(address._id, index)"
            >Set as Default</v-btn>

          </div>
        </v-card>
      </div>
    </v-row>
  </v-card>

</template>

<script>
export default {
  data: () => ({
      message: "",
      addresses: null
  }),
  methods: {
    async onDeleteAddress(id, index){
      try{

        setTimeout(async () => {
          let responce = await this.$axios.$delete(`/api/addresses/${id}`);
          if(responce.success){
            this.message = responce.message;
            this.addresses.splice(index, 1);
          }
        }, 0);

      }catch(err){
        this.message = err.message;
        console.log("onDeleteAddress catch: " + err);
      }
    },
    async onSetDefault(id){
      try{

        setTimeout(async () => {
          let responce = await this.$axios.$put('/api/address/set/default', {id: id});
          if(responce.success){
            this.message = responce.message;
            await this.$auth.fetchUser();
          }
        }, 0);

      }catch(err){
        this.message = err.message;
        console.log(err);
      }
    },
    loadAddresses: (self) => {
      
      //console.log(this.$axios);

      self.$axios.$get("/api/addresses")
      .then(response => {
        // JSON responses are automatically parsed.
        console.log("winning addresses");
        console.log(response);
        self.addresses = response.addresses;

        // self.breadcrumbs[1].text = response.products.title;

        //this.posts = response.data
      })
      .catch(e => {
        //this.errors.push(e)
        console.log(e);
      })
    },
  },
  created(){
    this.loadAddresses(this);
  }

}
</script>