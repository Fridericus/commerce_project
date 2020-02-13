<template>
  <v-row>
    <v-col cols=6 class="red lighten-4 mx-auto">
      <v-card 
        flat
        tile 
        outlined
        class = "pa-6"
      >
        <v-card-title>Sign In</v-card-title>
        <v-form
          ref="form"
          lazy-validation
          class="ma-3"
        >

          <!-- Email field -->
          <v-text-field
            v-model="email"
            label="Email"
            required
            :error-messages="emailErrors"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>

          <!-- Password field -->
          <v-text-field
            v-model="password"
            label="Password"
            required
            :error-messages="passwordErrors"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>

          <v-btn
            color="warning"
            @click="onLogin"
            outlined
            tile
            class="mt-5"
          >
            Login
          </v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email} from 'vuelidate/lib/validators'

export default {
  middleware: "auth",
  auth: "guest",
  layout: "none",
  mixins: [validationMixin],
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(12), maxLength: maxLength(30)}
  },
  data: () => ({
    email: "",
    password: ""
  }),
  computed: {
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
    async onLogin() {
      try{

      this.$auth.loginWith("local", {
        data: {
          email: this.email,
          password: this.password
        }
      });

          this.$router.push("/");
      }catch(err){
        console.log(err);
      }

    }
  },
}
</script>
 
<style scoped>

</style>