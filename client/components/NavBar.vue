<template>
<div>
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

          <template v-if="$auth.$state.loggedIn">
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
              to="/logIn"
              class="white--text px-3 link-style"
              style="text-decoration:none;"
            >
              <span>Hello,</span>
              <span>Sign In</span>
            </nuxt-link>
          </template>

          <v-btn 
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

        <div class="logo ">
          <p class="headline font-weight-light pa-0 ma-0 black--text">BOOKSTORE</p>
        </div>

        <v-tabs 
          height="60px"
          light
          centered
          slider-size=0
          color=black
        >
          <v-tab
            :nuxt=true
            :to="`/`"
          >Home</v-tab>
          <v-tab>Books</v-tab>
          <v-tab>New</v-tab>
          <v-tab>Deals</v-tab>
        </v-tabs>

        <Search class="search-style"/>

      </div>
    </div>
    <!-- <v-btn
      icon
      :nuxt="true"
      :to="`/`"
    >
          <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-toolbar-title 
      class="pr-10" 
      v-text="title" 
    />
    <Search/>
    <v-spacer/>

    <template v-if="$auth.$state.loggedIn">
      <nuxt-link
        to="/profile"
        class="white--text"
      >
        <span class="">Hello,</span>
        <span class="">{{ $auth.$state.user.name }}</span>

      </nuxt-link>
    </template>
    <template v-else>
      <nuxt-link
        to="/logIn"
        class="white--text"
      >
        <span class="">Hello,</span>
        <span class="">Sign In</span>

      </nuxt-link>
    </template>
    <v-btn icon>
      <v-icon>location_on</v-icon>
    </v-btn>
    <v-btn icon>
    <v-icon>language</v-icon>
    </v-btn>
    <v-btn 
      icon
      :nuxt="true"
      :to="`/cart/`"
    >
    <v-icon>shopping_cart</v-icon>
    </v-btn>
    <span>{{getCartLength}}</span>

    <template 
      v-slot:extension
      class="extension-style light-red"
    >
      <v-tabs align-with-title>
        <v-tab>Browsing History</v-tab>
        <v-tab>Todays Deals</v-tab>
        <v-tab>Your Store</v-tab>
        <v-tab>Gift Cards</v-tab>
        <v-tab>Registry</v-tab>
        <v-tab>Sell</v-tab>
      </v-tabs>
    </template> -->

  </v-app-bar>
</div>
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
    ...mapGetters(["getCartLength"])
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

.logo-text-style{
    color: black;
    font-size: 4;
    font-style: italic;
}

.search-style{
  width: 800px;
  min-width: 200px;
}

</style>