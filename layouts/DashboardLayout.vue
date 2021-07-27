<template>
  <v-app class="pa-6">
    <Header />
    <Sidebar />
    <v-main class="content ">
        <nuxt></nuxt>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "~/components/Dashboard/Header.vue";
import Sidebar from "~/components/Dashboard/Sidebar";
import Footer from "~/components/Dashboard/Footer";

export default {
 
  name: "Layout",
  components: { Footer, Header, Sidebar },

  methods: {}
};
</script>
