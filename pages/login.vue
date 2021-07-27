<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login Author</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="mdi-email-outline "
          v-model="email"
          :rules="emailRules"
          :error-messages="errors.email"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          id="password"
          v-model="password"
          :error-messages="errors.password"
          prepend-icon="mdi-lock"
          label="Password"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" to="/registrar">create new account</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="login"
        :loading="loading"
        :disabled="loading"
        >Login</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import Notification from "~/components/Notification";

export default {
  name: "Login",
  layout: "AuthLayout",
  auth: "guest",
  components: {
    Notification
  },

  data() {
    return {
      loading: false,
      email: "",
      password: "",
      errors: [],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },

  methods: {
    // async CheckValid(type) {
    //   let data = {
    //     type: type,
    //     value: this[type]
    //   };

    //   this.$store
    //     .dispatch("auths/CheckValid", data)
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(() => {});
    // },
    async login() {
      this.loading = true;
      try {
        let data = await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });
        if (data.data.success) {
          this.$router.push("/dashboard");
        }
        if (data.data.errors) {
          this.errors = data.data.errors;
        }
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    }
  }
};
</script>

<style></style>
