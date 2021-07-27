<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Register Author</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="mdi-account "
          name="username"
          v-model="data.name"
          label="User Name"
          :error-messages="errors.name"
          type="text"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-email-outline "
          name="email"
          v-model="data.email"
          label="Email"
          :error-messages="errors.email"
          type="text"
        ></v-text-field>
        <v-text-field
          id="password"
          prepend-icon="mdi-lock"
          name="password"
          v-model="data.password"
          label="Password"
          :error-messages="errors.password"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" to="/login"> Sign in instead</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="Register">submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Register",
  layout: "AuthLayout",
  auth: 'guest',
  data() {
    return {
      data: {
        name: "",
        email: "",
        password: ""
      },
    
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  computed:{
    ...mapState('auths', ['errors'])
  },

  methods: {
    async Register() {
      this.$store.dispatch("auths/Registrar", this.data);
    }
  }
};
</script>

<style></style>
