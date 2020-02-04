<template>
  <v-row>
    <v-col>
      <v-card class = "pa-6">
        <v-card-title>Update {{product.title}}</v-card-title>
        <v-form
          ref="form"
          lazy-validation
        >

          <!-- Category dropdown -->
          <v-select
            :items="categories"
            @change="onSelectedCategory"
            item-text="type"
            item-value="_id"
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
            :placeholder="product.title"
            :error-messages="titleErrors"
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
          ></v-text-field>

          <!-- Description field -->
          <v-text-field
            v-model="description"
            label="Description"
            required
            :placeholder="product.description"
            :error-messages="descriptionErrors"
            @input="$v.description.$touch()"
            @blur="$v.description.$touch()"
          ></v-text-field>

          <!-- Price field -->
          <v-text-field
            v-model="price"
            label="Price"
            required
            :placeholder="String(product.price)"
            :error-messages="priceErrors"
            @input="$v.price.$touch()"
            @blur="$v.price.$touch()"
          ></v-text-field>

          <!-- Stock Quantity field -->
          <v-text-field
            v-model="stockQuantity"
            label="Stock Quantity"
            required
            :placeholder="String(product.stockQuantity)"
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
          >
            Update Product
          </v-btn>
        </v-form>
      </v-card>
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
  async asyncData({$axios, params}){
    try{
      let categories = $axios.$get('http://localhost:3000/api/categories');
      let owners = $axios.$get('http://localhost:3000/api/owners');
      let product = $axios.$get(`http://localhost:3000/api/products/${params.id}`);

      // Run both the API requests in parrelel and store the variables in catResponce & ownerResponce.
      const [catResponce, ownerResponce, productResponce] = await Promise.all([ 
        categories,
        owners,
        product
      ]);

      console.log(owners);
      console.log(categories);
      console.log(product);

      return {
        categories: catResponce.categories,
        owners: ownerResponce.owners,
        product: productResponce.products
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
      this.categoryID = event;
    },
    onSelectedOwner(event) {
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

        let result = await this.$axios.put(`http://localhost:3000/api/products/${this.$route.params.id}`, data);
        this.$router.push("/");
        console.log(data);
        console.log(result);
      }
    }
  }
}
</script>