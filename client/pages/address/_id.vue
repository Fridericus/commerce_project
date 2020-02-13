<template>
<v-row>
  <v-col>
    <v-card>
      <v-card-title>Edit an address</v-card-title>
        <v-form
          v-if=address
          ref="form"
          lazy-validation
          class="ma-3"
        >
          <!-- Country Dropdown -->
          <v-select
            v-model=address.country
            :items="countries"
            item-text="name"
            item-value="alpha2Code"
            filled
            label="Country"
            required

          ></v-select>

          <!-- Full Name field -->
          <v-text-field
            v-model=address.fullName
            label="Full Name"
            required
          ></v-text-field>

          <!-- Street Address 1 field -->
          <v-text-field
            v-model=address.streetAddress
            label="Street and number, P.O box, c/o."
            required
          ></v-text-field>

          <!-- Street Address 2 field
          <v-text-field
            v-model=address.streetAddress2
            label="Apartment, suite, unit, building, floor, etc."
            required
          ></v-text-field> -->

          <!-- City field -->
          <v-text-field
            v-model=address.city
            label="City"
            required
          ></v-text-field>

          <!-- County field -->
          <v-text-field
            v-model=address.county
            label="County"
            required
          ></v-text-field>

          <!-- Post Code field -->
          <v-text-field
            v-model=address.postCode
            label="Post Code"
            required
          ></v-text-field>


          <!-- Phone Number field -->
          <v-text-field
            v-model=address.phoneNumber
            label="Phone Number"
            required
          ></v-text-field>


          <!-- Delivery Instructions -->
          <v-text-field
            v-model=address.deliveryInstructions
            label="Provide details such as building description, a nearby landmark, or other naigation instructions."
            required
          ></v-text-field>

          <!-- Security code Instructions -->
          <v-text-field
            v-model=address.securityCode
            label=""
            required
          ></v-text-field>

          <v-btn
            color="warning"
            @click="onUpdateAddress"
            outlined
            tile
            class="mt-5"
          >
           Update Address
          </v-btn>
        </v-form>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
export default {
  data() {
    return {
      country: "",
      fullName: "",
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      county: "", 
      postCode: "",
      phoneNumber: "",
      deliveryInstructions: "",
      securityCode: "",
      countries: null,
      address: null
    }
  },
  created(){
    this.loadCountires(this);
    // this.loadReviews(this);
  },
  methods: {
    loadCountires: (self) => {
      // try{

        console.log("loading countries");
        let countriesResponce = self.$axios.$get("http://localhost:3000/api/countries")
        .then(response => {
          // JSON responses are automatically parsed.
          self.countries = response;
          console.log(response);
          //this.posts = response.data
        })
        .catch(e => {
          //this.errors.push(e)
        })

        let singleAddress = self.$axios.$get(`/api/addresses/${self.$route.params.id}`)
        .then(response => {
          // JSON responses are automatically parsed.
          self.address = response.address;
          console.log(response);
          //this.posts = response.data
        })
        .catch(e => {
          //this.errors.push(e)
        })

        // [countriesResponce, singleAddress] = await Promise.all([
        //   countriesResponce,
        //   singleAddress
        // ]);

        // return {
        //   countries: countriesResponce,
        //   address: singleAddress
        // };

      // }catch(err){
      //   console.log(err);
      // }
      // .then(response => {
      //   // JSON responses are automatically parsed.
      //   self.countries = response;
      //   console.log(response);
      //   //this.posts = response.data
      // })
      // .catch(e => {
      //   //this.errors.push(e)
      // })
    },
    async onUpdateAddress(){
      try{
        let data = {
          country: this.address.country,
          fullName: this.address.fullName,
          streetAddress: this.address.streetAddress,
          city: this.address.city,
          county: this.address.county,
          postCode: this.address.postCode,
          phoneNumber: this.address.phoneNumber,
          deliveryInstructions: this.address.deliveryInstructions,
          securityCode: this.address.securityCode
        };

        let responce = await this.$axios.$put(`/api/address/${this.$route.params.id}`, data);
        if (responce.success){
          this.$router.push("/");
        }
      }catch(err){
        console.log(err);
      }
    }
  }
}
</script>