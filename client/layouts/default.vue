<template>
  <v-app dark>

    <NavBar/>

    <v-content>
        <nuxt />
    </v-content>

    <v-footer
      app
      dark
      padless
      inset
      absolute
      hide-on-scroll
    >
      <v-card
        flat
        tile
        class="light-blue darken-3 white--text text-center"
      >

        <v-card-text class="white--text pt-3">
          Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Super Store</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "~/components/NavBar";
export default {
  components: {
    NavBar
  }
}
</script>
