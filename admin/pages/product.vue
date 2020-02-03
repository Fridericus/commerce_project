<template>
  <v-row>
    <v-col>
      <v-card class = "pa-6">
        <v-card-title>Add a product</v-card-title>
        <v-form
          ref="form"
          lazy-validation
        >

          <!-- Category dropdown -->
          <v-select
            :items="categories"
            item-text="type"
            label="Category"
            required
          ></v-select>

          <!-- Owner dropdown -->
          <v-select
            :items="owners"
            item-text="name"
            label="Owner"
            required
          ></v-select>

          <!-- Title field -->
          <v-text-field
            v-model="title"
            label="Title"
            required
          ></v-text-field>

          <!-- Description field -->
          <v-text-field
            v-model="description"
            label="Description"
            required
          ></v-text-field>

          <!-- Price field -->
          <v-text-field
            v-model="price"
            label="Price"
            required
          ></v-text-field>

          <!-- Title field -->
          <v-text-field

            label="Stock Quantity"
            required
          ></v-text-field>
          
          <!-- Picture field -->
          <v-file-input accept="image/*" label="Picture input"></v-file-input>
          <p>{{selectedFile}}</p>
          <v-btn
            color="warning"
          >
            Add Product
          </v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
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
    price: 0,
    stockQuant: "",
    fileName: "",
    categoryID: null,
    ownerID: null,
    selectedFile: null
  }),
  methods: {
    onSelectedFile(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    }
  }
}
</script>