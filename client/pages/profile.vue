<template>
<v-container>

  <v-row>

    <!-- Profile column -->
    <v-col>
      <v-card
        flat 
        max-width="600"
        min-width="300"
        outlined
        class = "px-10 py-6"
      >
        <v-row class="">
          <v-col>
            <p class="text--text title font-weight-medium mb-2">Your Profile</p>
          </v-col>
          <v-col>
            <v-btn
              outlined
              color=red
              small
              @click="onLogout"
              class="red--text float-right" 
            >
              Logout
            </v-btn>
          </v-col>
        </v-row>

        <v-card 
          flat 
        >
          <v-form
            ref="form"
            lazy-validation
          >

            <!-- Name field -->
            <v-text-field
              v-model="name"
              :placeholder=$auth.$state.user.name
              label="Name"
              required
              dense
              filled
              outlined
              :error-messages="nameErrors"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>

            <!-- Email field -->
            <v-text-field
              v-model="email"
              :placeholder=$auth.$state.user.email
              label="Email"
              dense
              filled
              outlined
              required
              :error-messages="emailErrors"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>

            <!-- Password field -->
            <v-text-field
              v-model="password"
              label="Password"
              dense
              filled
              outlined
              required
              :error-messages="passwordErrors"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>

            <!-- Password field -->
            <v-text-field
              v-model="rePassword"
              label="Re enter password"
              dense
              filled
              outlined
              required
              
              :error-messages="rePasswordErrors"
              @input="$v.rePassword.$touch()"
              @blur="$v.rePassword.$touch()"
            ></v-text-field>

            <v-btn
              @click="submit"
              outlined
              block
              class="orange lighten-1 mb-2"
            >
              Update Profile
            </v-btn>
          </v-form>
        </v-card>
      </v-card>
    </v-col>

    <!-- Address column -->
    <v-col>
      <!-- <v-card
        flat 
        max-width="600"
        min-width="300"
        outlined
        class = "px-10 py-6"
      >
        <v-row class="">
          <v-col>
            <p class="text--text title font-weight-medium mb-2">Your Addresses</p>
          </v-col>
          <v-col>
            <v-btn
              outlined
              color=red
              small
              @click="onLogout"
              class="red--text float-right" 
            >
              Logout
            </v-btn>
          </v-col>
        </v-row>
      </v-card> -->
    <Address/>
    </v-col>

  </v-row>
</v-container>
</template>

<script>
import Address from '~/pages/address/index'
import { validationMixin } from 'vuelidate'
import { maxLength, minLength, email, sameAs} from 'vuelidate/lib/validators'

export default {
  components: {
    Address
  },
  
  middleware: "auth",
  auth: "login",

  mixins: [validationMixin],
  validations: {
    name: {minLength: minLength(5), maxLength: maxLength(30)},
    email: {email},
    password: { minLength: minLength(12), maxLength: maxLength(30)},
    rePassword: { sameAsPassword: sameAs('password')}
  }, 

  data: () => ({
    name: "",
    email: "",
    password: "",
    rePassword: ""
  }),
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength && errors.push('Name must be at most 30 characters long.');
      !this.$v.name.minLength && errors.push('Name must be a minimum of 5 characters long.');
      return errors;
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Invaild email address.');
      return errors;
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength && errors.push('Password must be at most 30 characters long.');
      !this.$v.password.minLength && errors.push('Password must be a minimum of 12 characters long.');    
      return errors;
    },
    rePasswordErrors () {
      const errors = []
      if (!this.$v.rePassword.$dirty) return errors;
      !this.$v.rePassword.sameAsPassword && errors.push('Passwords must match.');
      return errors;
    }
  },
  methods: {
    async submit() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      try {
        let response = await this.$axios.put('/api/auth/user', data);

        if (response.success){
          this.name = "";
          this.email = "";
          this.password = "";

          await this.$auth.fetchUser();
        }

      }catch(err){


      }
    },
    async onLogout() {
      try{
        await this.$auth.logout();
      }catch(err){
        console.log(err);
      }
    }
  }
}
</script>