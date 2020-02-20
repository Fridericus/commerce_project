<template>
  <v-app-bar
    app
    dark
    hide-on-scroll
    height="100"
  >
    <div class="d-flex flex-column v-toolbar-container">
      <div class="v-toolbar-b1 d-flex align-center justify-space-between px-4">
        <div class="d-flex align-center">
          <v-btn 
            icon 
            small 
            class="mx-2"
          >
            <v-icon>language</v-icon>
          </v-btn>
          <p class="font-weight-light ma-0 pa-0">Ship to: United Kingdom</p>
        </div>

        <div class="d-flex align-center">

          <template v-if="$auth.$state.user">
            <nuxt-link
              to="/profile"
              class="white--text px-3 link-style"
              style="text-decoration:none;"
            >
              Hello, {{ $auth.$state.user.name }}
            </nuxt-link>
          </template>
          <template v-else>
            <nuxt-link
              to="/login"
              class="white--text px-3 link-style"
              style="text-decoration:none;"
            >
              <span>Hello,</span>
              <span>Sign In</span>
            </nuxt-link>
          </template>

          <v-btn
            v-if="isAuthenticated"
            small  
            icon 
            :nuxt=true
            :to="`/profile/`"
            class="px-5"
          >            
            <v-icon>person</v-icon>
          </v-btn>
          <v-btn
            v-else
            small  
            icon 
            :nuxt=true
            :to="`/profile/`"
            class="px-5"
          >            
            <v-icon>person</v-icon>
          </v-btn>

          <v-btn 
            icon
            small
            :nuxt=true
            :to="`/cart/`"
            class="px-5"
          >
            <v-badge
              v-if="getCartLength > 0"
              color="pink"
              overlap
              offset-y=13
            >
              <template v-slot:badge>
                {{getCartLength}}
              </template>            
              <v-icon>shopping_cart</v-icon>
            </v-badge>
            <v-icon v-else>shopping_cart</v-icon>

            
          </v-btn>
        </div>

      </div>


      <div class="v-toolbar-b2 d-flex align-center justify-space-between px-12">

        <p class="headline font-weight-light pa-0 ma-0 black--text">BOOKSTORE</p>

        <v-tabs 
          height="60px"
          light
          centered
          slider-size=0
          color=black
          :show-arrows=true
        >
          <v-tab
            :nuxt=true
            :to="`/`"
          >NEW</v-tab>
          <v-tab>BEST SELLERS</v-tab>
          <v-tab>FICTION</v-tab>
          <v-tab>NON-FICTION</v-tab>
          <v-tab>CHILDRENS</v-tab>
        </v-tabs>

        <Search class="search-style"/>

      </div>
    </div>
  </v-app-bar>
</template>

<script>
import {mapGetters} from "vuex";
import Search from '~/components/Search';
export default {
  components: {
    Search
  },
  data: () => ({
    title: "Super Store",
    drawer: null
  }),
  computed: {
    ...mapGetters(["getCartLength", "isAuthenticated", "loggedInUser"]),
  }
}
</script>

<style scoped>

.v-toolbar >>> .v-toolbar__content { padding: 0px !important; }

.v-toolbar-container {
  width: 100%;
  padding: 0;
  margin: 0;
}

.v-toolbar-b1 {
  height: 40px;
  padding: 0;
  margin: 0;
  background-color: cadetblue;
}

.v-toolbar-b2 {
  height: 60px;
  background-color: white;

}

.extension-style{
  background-color:  red;
}

.search-style{
  width: 800px;
  min-width: 200px;
}

</style>