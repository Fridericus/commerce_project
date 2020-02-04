<template>
  <v-app dark>

    <v-app-bar
      fixed
      app
    >
      <v-container class = "d-flex">
        <v-toolbar-title v-text="title" />
        <v-btn text outlined class="mx-6" n-link to="/" >Home</v-btn>
        <v-spacer />
      </v-container>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    
    <v-footer
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: "Admin Page",
    }
  }
}
</script>
