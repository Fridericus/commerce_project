<template>
<div>

  <v-navigation-drawer
    v-model="drawer"
    app
    width=200
  >
    <v-list dense>
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-contact-mail</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar
    app
    class="light-blue darken-4 px-2"
    dark
    extensionHeight="35px"
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title class="pr-10" v-text="title" />

    <!-- <v-text-field
      hide-details
      label="Search"
      single-line
      rounded
      outlined
      dense
      clearable
      color=""
      filled
      class="px-6"
    ></v-text-field> -->

    <Search/>
    <v-spacer/>

    <v-btn icon>
      <v-icon>location_on</v-icon>
    </v-btn>
    <v-btn icon>
    <v-icon>language</v-icon>
    </v-btn>
    <v-btn icon>
    <v-icon>shopping_cart</v-icon>
    </v-btn>

    <template 
      v-slot:extension
      class="extension-style"
    >
      <v-tabs align-with-title>
        <v-tab>Browsing History</v-tab>
        <v-tab>Todays Deals</v-tab>
        <v-tab>Your Store</v-tab>
        <v-tab>Gift Cards</v-tab>
        <v-tab>Registry</v-tab>
        <v-tab>Sell</v-tab>
      </v-tabs>
    </template>

  </v-app-bar>
</div>
</template>

<script>
import Search from '~/components/Search';
export default {
  components: {
    Search
  },
  data: () => ({
    title: "Super Store",
    drawer: null
  }),
}
</script>

<style scoped>

.extension-style{
  background-color:  red;  
}

</style>