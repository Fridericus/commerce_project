<template>
  <v-row>
    <v-col cols=6>
      <v-card
        flat
        tile 
        outlined
        class = "pa-6"
      >
        <v-card-title>Profile Page</v-card-title>
        <v-card-subtitle href="#" @click="onLogout">Logout</v-card-subtitle>
        <v-card 
          outlined
          tile
        >
          <v-form
            ref="form"
            lazy-validation
            class="ma-3"
          >

            <!-- Name field -->
            <v-text-field
              v-model="name"
              :placeholder=$auth.$state.user.name
              label="Name"
              required
              :error-messages="nameErrors"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>

            <!-- Email field -->
            <v-text-field
              v-model="email"
              :placeholder=$auth.$state.user.email
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
              @click="submit"
              outlined
              tile
              class="mt-5"
            >
              Update Profile
            </v-btn>
          </v-form>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { maxLength, minLength, email} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    name: {minLength: minLength(5), maxLength: maxLength(30)},
    email: {email},
    password: { minLength: minLength(12), maxLength: maxLength(30)}
  },
  // async asyncData({$axios}) {
  //   try{
  //     let responce = await $axios.$get('http://localhost:3000/api/categories');
  //     return {
  //       categories: responce.categories
  //     };
  //   }catch(err){
  //     console.log(err);
  //   }
  // },
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
      await this.$auth.logout();
    }
  }
}
</script>