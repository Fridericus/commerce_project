<template>
  <v-row>

    <v-col>
      <v-row justify="center">
          <p class="display-2 font-weight-light ma-0 black--text py-4">BOOKSTORE</p>
      </v-row>

      <v-row justify="center">
        <v-card 
          flat
          outlined
          width="400px"
          class = "pa-6"
        >
          <v-form
            ref="form"
            lazy-validation
            class="ma-3"
          >
            <p class="headline font-weight-medium black--text">Sign-Up</p>

            <!-- Name field -->
            <v-text-field
              v-model="name"
              label="Your name"
              outlined
              required
              dense
              light
              filled
              :error-messages="nameErrors"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>

            <!-- Email field -->
            <v-text-field
              v-model="email"
              label="Email"
              outlined
              required
              dense
              light
              filled
              :error-messages="emailErrors"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>

            <!-- Password field -->
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              outlined
              required
              dense
              light
              filled
              :error-messages="passwordErrors"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>

            <v-btn
              @click="onSignup"
              block
              depressed   
              outlined               
              color="primary"
            >
              Sign up
            </v-btn>
          </v-form>
        </v-card>
      </v-row>

      <v-row 
        justify="center"
      >
        <p class="body-2 font-weight-medium grey--text text--darken-2 pt-4">Existing Customer?</p>
      </v-row>
      <v-row 
        justify="center"
      >
        <v-btn 
          depressed   
          outlined               
          color="warning"
          :nuxt=true
          :to="`/login/`"
          width="400px"
        >
          Login to Your BOOKSTORE Account
        </v-btn>
      </v-row>

    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email} from 'vuelidate/lib/validators'

export default {
  layout: "none",
  middleware: "auth",
  auth: "guest",
  mixins: [validationMixin],
  validations: {
    name: {required, minLength: minLength(5), maxLength: maxLength(30)},
    email: {required, email},
    password: {required, minLength: minLength(12), maxLength: maxLength(30)}
  },
  data: () => ({
    name: "",
    email: "",
    password: ""
  }),
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength && errors.push('Name must be at most 30 characters long.');
      !this.$v.name.minLength && errors.push('Name must be a minimum of 5 characters long.');
      !this.$v.name.required && errors.push('Name is required.');
      return errors;
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Invaild email address.');
      !this.$v.email.required && errors.push('Email is required.');
      return errors;
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength && errors.push('Password must be at most 30 characters long.');
      !this.$v.password.minLength && errors.push('Password must be a minimum of 12 characters long.');    
      !this.$v.password.required && errors.push('Password is required.');
      return errors;
    }
  },
  methods: {
    async onSignup() {
      try{
        let data = {
          name: this.name,
          email: this.email,
          password: this.password
        }
        let responce = await this.$axios.$post("/api/auth/signup", data);
        console.log(responce);

        if(responce.success){
          this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          });

          this.$router.push("/");
        }
      }catch(err){
        console.log(err);
      }

    },
    // async submit() {
    //   this.$v.$touch();
    //   if(this.$v.$invalid) this.submitStatus = 'ERROR';
    //   else{
    //     // do your submit logic here
    //     this.submitStatus = 'PENDING'

    //     let data = new FormData();
    //     data.append("name", this.name);
    //     data.append("about", this.about);
    //     data.append("photo", this.selectedFile, this.selectedFile.name);

    //     let result = await this.$axios.post('http://localhost:3000/api/owners', data)
    //     let pushD = {
    //       name: this.name,
    //       about: this.about
    //     };
    //     this.owners.push(pushD);
    //     this.name = "",
    //     this.about = "",
    //     this.fileName = ""
    //   }
    // }
  },
}
</script>
 
<style scoped>

</style>