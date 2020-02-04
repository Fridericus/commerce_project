<template>
  <v-row>
    <v-col cols=6>
      <v-card
        flat
        tile 
        outlined
        class = "pa-6"
      >
        <v-card-title>Add a category</v-card-title>
        <v-card 
          outlined
          tile
        >
          <v-form
            ref="form"
            lazy-validation
            class="ma-3"
          >

            <!-- Category field -->
            <v-text-field
              v-model="category"
              label="Category name"
              required
              :error-messages="categoryErrors"
              @input="$v.category.$touch()"
              @blur="$v.category.$touch()"
            ></v-text-field>

            <v-btn
              color="warning"
              @click="submit"
              outlined
              tile
              class="mt-5"
            >
              Add Category
            </v-btn>
          </v-form>
        </v-card>
      </v-card>
    </v-col>

    <v-col cols=6>
      <v-card
        class="pa-6 overflow-y-auto"
        max-height="50vh"
        flat
        tile 
        outlined
      >
        <v-card-title>Current Categories</v-card-title>

          <v-card
            class="ma-3"
            tile
            flat
            outlined
          >
            <v-list-item
              v-for="(item, i) in categories"
              :key="i"
              dense
            >
              <v-list-item-content>
                <v-list-item-title>{{item.type}}</v-list-item-title>
                  <v-divider
                    v-if="i + 1 < categories.length"
                    :key="i"
                  ></v-divider>
              </v-list-item-content>
            </v-list-item>
          </v-card>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength,} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    category: {required, minLength: minLength(5), maxLength: maxLength(20)},
  },
  async asyncData({$axios}) {
    try{
      let responce = await $axios.$get('http://localhost:3000/api/categories');
      return {
        categories: responce.categories
      };
    }catch(err){
      console.log(err);
    }
  },
  data: () => ({
    category: "",
  }),
  computed: {
    categoryErrors () {
      const errors = []
      if (!this.$v.category.$dirty) return errors;
      !this.$v.category.maxLength && errors.push('Category must be at most 20 characters long');
      !this.$v.category.minLength && errors.push('Category must be a minimum of 5 characters long');
      !this.$v.category.required && errors.push('Category is required.');
      return errors;
    }
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if(this.$v.$invalid) this.submitStatus = 'ERROR';
      else{
        try{
          // Submit logic here
          this.submitStatus = 'PENDING'
          let data = { type: this.category};
          let responce = await this.$axios.$post('http://localhost:3000/api/categories', data);
          this.categories.push(data);
          this.category = "";
        }catch(err){
          console.log(err);
        }
      }
    }
  },

}
</script>