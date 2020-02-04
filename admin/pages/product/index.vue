<template>
  <v-row>
    <v-col
      class = "col-style px-12 py-6"
    >
      <v-row>
        <v-col
          cols="12"
          class = ""
        >
          <h1>Add New Product</h1>
        </v-col>
      </v-row>
        <v-form
          ref="form"
          lazy-validation
        >

          <!-- Category dropdown -->
          <v-select
            :items="categories"
            item-text="type"
            item-value="_id"
            @change="onSelectedCategory"
            label="Category"
            required
            :error-messages="categoryErrors"
            @input="$v.categoryID.$touch()"
            @blur="$v.categoryID.$touch()"
          ></v-select>

          <!-- Owner dropdown -->
          <v-select
            :items="owners"
            item-text="name"
            item-value="_id"
            @change="onSelectedOwner"
            label="Owner"
            required
            :error-messages="ownersErrors"
            @input="$v.ownerID.$touch()"
            @blur="$v.ownerID.$touch()"
          ></v-select>

          <!-- Title field -->
          <v-text-field
            v-model="title"
            label="Title"
            required
            :error-messages="titleErrors"
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
          ></v-text-field>

          <!-- Description field -->
          <v-text-field
            v-model="description"
            label="Description"
            required
            :error-messages="descriptionErrors"
            @input="$v.description.$touch()"
            @blur="$v.description.$touch()"
          ></v-text-field>

          <!-- Price field -->
          <v-text-field
            v-model="price"
            label="Price"
            required
            :error-messages="priceErrors"
            @input="$v.price.$touch()"
            @blur="$v.price.$touch()"
          ></v-text-field>

          <!-- Stock Quantity field -->
          <v-text-field
            v-model="stockQuantity"
            label="Stock Quantity"
            required
            :error-messages="stockQuantityErrors"
            @input="$v.stockQuantity.$touch()"
            @blur="$v.stockQuantity.$touch()"
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
          >
            Add Product
          </v-btn>
        </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, numeric } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    title: {required, minLength: minLength(5), maxLength: maxLength(30)},
    description: {required, minLength: minLength(15), maxLength: maxLength(100)},
    price: {required, numeric},
    stockQuantity: {required, numeric},
    categoryID: {required},
    ownerID: {required},
    selectedFile: {required}
  },
  async asyncData({$axios}) {
    try{
      let categories  = $axios.$get('http://localhost:3000/api/categories');
      let owners = $axios.$get('http://localhost:3000/api/owners');

      // Run both the API requests in parrelel and store the variables in catResponce & ownerResponce.
      const [catResponce, ownerResponce] = await Promise.all([ 
        categories,
        owners
      ]);

      console.log(catResponce.categories);
      console.log(ownerResponce.owners);

      return {
        categories: catResponce.categories,
        owners: ownerResponce.owners
      };

    }catch(err){
      console.log(err);
    }
  },
  data: () => ({
    title: "",
    description: "",
    price: '',
    fileName: "",
    stockQuantity: "",
    categoryID: null,
    ownerID: null,
    selectedFile: null,
  }),
  computed: {
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.maxLength && errors.push('Title must be at most 30 characters long');
      !this.$v.title.minLength && errors.push('Title must be a minimum of 5 characters long');
      !this.$v.title.required && errors.push('Title is required.');
      return errors;
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.maxLength && errors.push('Description must be at most 100 characters long');
      !this.$v.description.minLength && errors.push('Description must be a minimum of 15 characters long');
      !this.$v.description.required && errors.push('Description is required.');
      return errors;
    },
    priceErrors () {
      const errors = []
      if (!this.$v.price.$dirty) return errors;
      !this.$v.price.required && errors.push('Price is required.');
      !this.$v.price.numeric && errors.push('This field accepts numbers only.');
      return errors;
    },
    stockQuantityErrors () {
      const errors = []
      if (!this.$v.stockQuantity.$dirty) return errors;
      !this.$v.stockQuantity.required && errors.push('Stock Quantity is required.');
      !this.$v.stockQuantity.numeric && errors.push('This field accepts numbers only.');
      return errors;
    },
    categoryErrors () {
      const errors = []
      if (!this.$v.categoryID.$dirty) return errors;
      !this.$v.categoryID.required && errors.push('Category is required.');
      return errors;
    },
    ownersErrors () {
      const errors = []
      if (!this.$v.ownerID.$dirty) return errors;
      !this.$v.ownerID.required && errors.push('Owner is required.');
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
      if(event) {
        console.log("there");
        this.selectedFile = event;
        this.fileName = event.name;
      }else{
       console.log("not there");
        this.selectedFile = "";
        this.fileName = "";
      }
    },
    onSelectedCategory(event) {
      console.log(event);
      this.categoryID = event;
    },
    onSelectedOwner(event) {
      console.log(event);
      this.ownerID = event;
    },
    async submit() {
      this.$v.$touch();
      if(this.$v.$invalid) this.submitStatus = 'ERROR';
      else{
        // do your submit logic here
        this.submitStatus = 'PENDING'

        let data = new FormData();
        data.append("title", this.title);
        data.append("description", this.description);
        data.append("price", this.price);
        data.append("ownerID", this.ownerID);
        data.append("categoryID", this.categoryID);
        data.append("stockQuantity", this.stockQuantity);
        data.append("photo", this.selectedFile, this.selectedFile.name);

        let result = await this.$axios.post('http://localhost:3000/api/products', data)
        this.$router.push("/");

      }
    }
  }
}
</script>

<style scoped>
.col-style{
  border-style: solid;
  border-width: 1px;
  border-color: rgb(199, 199, 199);
}
</style>