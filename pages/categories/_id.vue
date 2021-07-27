<template>
  <v-card class="mx-auto" max-width="700">
    <v-img
      class="white--text align-end"
      height="400px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>{{details.title}}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
       {{details.slug}}
    </v-card-subtitle>

   

    <v-card-actions>
      <v-btn color="orange" text>
        Share
      </v-btn>

      <v-btn color="orange" text to="/categories">
        back
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import {  mapState } from "vuex";
export default {
  layout: "DashboardLayout",
  computed: {
    ...mapState("category", ["details"]),
    
  },
  created() {
    this.$store.dispatch("category/Details", this.$route.params.id);
  }
};
</script>
