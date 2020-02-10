<template>
<v-row 
  align="center"
>
  <v-col cols=4>
    <v-card 
      flat 
      class="grey lighten-4 featured-style"
    >
      <v-img
        :src=featured.src
        height="300"
        width="200"
      >
      </v-img>
    </v-card>
  </v-col>

  <v-col 
    cols=8
  >
    <v-card 
      flat 
      class="grey lighten-4 featured-style"
    >
      <p class = "text-justify font-weight-regular display-3 my-1">{{featured.title}}</p>
      <p class = "text-justify font-regular title my-0">{{featured.description}}</p>
      <p class = "text-justify font-regular subtitle-2">{{featured.author}}</p>

    </v-card>
  </v-col>
</v-row>
</template>

<script>
export default {
  data: () => ({
    featured: {
      title: "Future Crimes",
      description: "Inside the Digital Underground and the Battle For Our Connected World",
      author: "Marc Goodman",
      src: require('../components/fc.jpg')
    }
  })
}
</script>

<style scoped>

</style>