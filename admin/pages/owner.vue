<template>
  <v-row>
    <v-col cols=6>
      <v-card 
        flat
        tile 
        outlined
        class = "pa-6"
      >
        <v-card-title>Add a new owner</v-card-title>
        <v-form
          ref="form"
          lazy-validation
          class="ma-3"
        >
          <!-- Name field -->
          <v-text-field
            v-model="name"
            label="Owner name"
            required
            :error-messages="nameErrors"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>

          <!-- About field -->
          <v-text-field
            v-model="about"
            label="Owner about"
            required
            :error-messages="aboutErrors"
            @input="$v.about.$touch()"
            @blur="$v.about.$touch()"
          ></v-text-field>

          <!-- Picture field -->
          <v-file-input 
            @change="onSelectedFile" 
            accept="image/*" 
            label="Picture input"
            :error-messages="selectedFileErrors"
            @input="$v.selectedFile.$touch()"
            @blur="$v.selectedFile.$touch()"
          >
          </v-file-input>

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
    </v-col>

    <v-col cols=6>
      <v-card
        class="pa-6 overflow-y-auto"
        max-height="50vh"
        flat
        tile 
        outlined
      >
        <v-card-title>Current Owners</v-card-title>
        <v-card
          class="mx-auto "
          tile
          flat
          outlined
        >
          <v-list-item
            v-for="(owner, i) in owners"
            :key="i"
            dense
          >
            <v-list-item-content>
              <v-list-item-title>{{owner.name}}</v-list-item-title>
                <v-divider
                  v-if="i + 1 < owners.length"
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
    name: {required, minLength: minLength(5), maxLength: maxLength(30)},
    about: {required, minLength: minLength(10), maxLength: maxLength(80)},
    selectedFile: {required}
  },
  async asyncData({$axios}) {
    try{
      let responce = await $axios.$get('http://localhost:3000/api/owners');
      return {
        owners: responce.owners,
      }
    }catch(err){
      console.log(err);
    }
  },
  data: () => ({
    name: "",
    about: "",
    selectedFile: "",
    fileName: ""
  }),
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength && errors.push('Name must be at most 30 characters long');
      !this.$v.name.minLength && errors.push('Name must be a minimum of 5 characters long');
      !this.$v.name.required && errors.push('Name is required.');
      return errors;
    },
    aboutErrors () {
      const errors = []
      if (!this.$v.about.$dirty) return errors;
      !this.$v.about.maxLength && errors.push('About must be at most 20 characters long');
      !this.$v.about.minLength && errors.push('About must be a minimum of 80 characters long');
      !this.$v.about.required && errors.push('About is required.');
      return errors;
    },
    selectedFileErrors () {
      const errors = []
      if (!this.$v.selectedFile.$dirty) return errors;
      !this.$v.selectedFile.required && errors.push('Image is required is required.');
      return errors;
    }
  },
  methods: {
    onSelectedFile(event) {
      console.log(event);
      this.selectedFile = event;
      this.fileName = event.name;
    },
    async submit() {
      this.$v.$touch();
      if(this.$v.$invalid) this.submitStatus = 'ERROR';
      else{
        // do your submit logic here
        this.submitStatus = 'PENDING'

        let data = new FormData();
        data.append("name", this.name);
        data.append("about", this.about);
        data.append("photo", this.selectedFile, this.selectedFile.name);

        let result = await this.$axios.post('http://localhost:3000/api/owners', data)
        let pushD = {
          name: this.name,
          about: this.about
        };
        this.owners.push(pushD);
        this.name = "",
        this.about = "",
        this.fileName = ""
      }
    }
  },
}
</script>