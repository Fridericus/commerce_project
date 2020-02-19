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
      <v-card
        flat 
        max-width="800"
        min-width="400"
        outlined
        class = "px-10 py-6 mx-auto"
      >
        <v-card-title>Add a new address</v-card-title>
          <v-form
            ref="form"
            lazy-validation
            class="ma-3"
          >
            <!-- Country Dropdown -->
            <v-select
              :items="countries"
              v-model="country"
              item-text="name"
              item-value="alpha2Code"
              value="Ukraine"
              filled
              outlined
              dense
              light
              label="Country"
              required

            ></v-select>

            <!-- Full Name field -->
            <v-text-field
              v-model="fullName"
              label="Full Name"
              required
              outlined
              dense
              light
              filled
            ></v-text-field>

            <!-- Street Address 1 field -->
            <v-text-field
              v-model="streetAddress1"
              label="Street and number, P.O box, c/o."
              required
              outlined
              dense
              light
              filled
            ></v-text-field>

            <!-- Street Address 2 field -->
            <v-text-field
              v-model="streetAddress2"
              label="Apartment, suite, unit, building, floor, etc."
              required
              outlined
              dense
              light
              filled
            ></v-text-field>

            <!-- City field -->
            <v-text-field
              v-model="city"
              label="City"
              required
              outlined
              dense
              light
              filled
            ></v-text-field>

            <!-- County field -->
            <v-text-field
              v-model="county"
              label="County"
              required
              outlined
              dense
              light
              filled
            ></v-text-field>

            <!-- Post Code field -->
            <v-text-field
              v-model="postCode"
              label="Post Code"
              required
              outlined
              dense
              light
              filled
            ></v-text-field>

            <!-- Phone Number field -->
            <v-text-field
              v-model="phoneNumber"
              label="Phone Number"
              required
              outlined
              dense
              light
              filled
            ></v-text-field>

            <!-- Delivery Instructions -->
            <v-text-field
              v-model="deliveryInstructions"
              label="Provide details such as building description, a nearby landmark, or other naigation instructions."
              required
              outlined
              dense
              light
              filled
            ></v-text-field>

            <!-- Security code Instructions -->
            <v-text-field
              v-model="securityCode"
              label="Security code if required"
              required
              outlined
              dense
              light
              filled
            ></v-text-field>

            <v-btn
              @click="onAddAddress"
              outlined
              text
              block
              class="mt-5 orange lighten-1"
            >
            Add Address
            </v-btn>
          </v-form>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  // async asyncData({$axios}) {
  //   try{
  //     let response = await $axios.$get("http://localhost:3000/api/countries");
  //     console.log("responce: "+ response);
  //     return {
  //       countries: responce.data 
  //     };
  //   }catch(err){
  //     console.log(err);
  //   }
  // },
  data() {
    return {
      breadcrumbs: [{text: "Profile", href: '/profile'}, {text: "Add Address", disabled: true}],
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
      countries: null
    }
  },
  created(){
    this.loadCountires(this);
    // this.loadReviews(this);
  },
  methods: {
    loadCountires: (self) => {
      
      console.log("loading countries");
      self.$axios.$get("http://localhost:3000/api/countries")
      .then(response => {
        // JSON responses are automatically parsed.
        self.countries = response;
        console.log(response);
        //this.posts = response.data
      })
      .catch(e => {
        //this.errors.push(e)
      })
    },
    async onAddAddress(){
      try{
        let data = {
          country: this.country,
          fullName: this.fullName,
          streetAddress: this.streetAddress1 + " " + this.streetAddress2,
          city: this.city,
          county: this.county,
          postCode: this.postCode,
          phoneNumber: this.phoneNumber,
          deliveryInstructions: this.deliveryInstructions,
          securityCode: this.securityCode
        };

        let responce = await this.$axios.$post("/api/address", data);
        if (responce.success){
          this.$router.push("/");
        }
      }catch(err){
        console.log("/");
      }
    }
  }
}
</script>