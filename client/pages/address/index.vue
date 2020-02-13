<template>
  <v-row>
    <v-col class="d-flex">
      
      <v-card href="/address/add" nuxt=true class="ma-2">
        <v-card-title>Add an address</v-card-title>
        <p>{{message}}</p>

      </v-card>
      
      <div v-if='addresses'>
        <v-card
          v-for="(address, index) in addresses"
          :key=index
          class="ma-2"
        >
          <v-card-text>{{address.fullName}}</v-card-text>
          <v-card-text>{{address.streetAddress}}</v-card-text>
          <v-card-text>{{address.city}}</v-card-text>
          <v-card-text>{{address.county}}</v-card-text>
          <v-card-text>{{address.postCode}}</v-card-text>
          <v-card-text>{{address.country}}</v-card-text>
          <v-card-text>{{address.phoneNumber}}</v-card-text>
          <v-btn :to="`/address/${address._id}`" >Edit</v-btn>
          <v-btn @click="onDeleteAddress(address._id, index)">Delete</v-btn>
          <v-btn @click="onSetDefault(address._id, index)">Set as Default</v-btn>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      message: ""
    }
  },
  async asyncData({$axios}){
    try{
      let responce = await $axios.$get("/api/addresses");
      console.log(responce.addresses);
      return {
        addresses: responce.addresses
      }

    }catch(err){
      console.log(err);
    }
  },
  methods: {
    async onDeleteAddress(id, index){
      try{
        let responce = await this.$axios.$delete(`/api/addresses/${id}`);
        if(responce.success){
          this.message = responce.message;
          this.addresses.splice(index, 1);
        }
      }catch(err){
        this.message = err.message;
        console.log("onDeleteAddress catch: " + err);
      }
    },
    async onSetDefault(id){
      try{
        let responce = await this.$axios.$put('/api/address/set/default', {id: id});
        if(responce.success){
          this.message = responce.message;
          await this.$auth.fetchUser();
        }
      }catch(err){
        this.message = err.message;
        console.log(err);
      }
    }
  }
}
</script>