<template>
  <v-app>
    <v-container fluid fill-height class="auth-bg">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <nuxt></nuxt>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  props: {
    source: String
  }
};
</script>

<style></style>
