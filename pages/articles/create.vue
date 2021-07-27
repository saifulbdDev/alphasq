<template>
  <v-form ref="form" v-model="valid" lazy-validation class="mt-5">
    <v-col md="6" cols="12" class="mx-auto">
      <v-card class="pa-2">
        <h2>Add New Article</h2>
        <v-text-field
          v-model="title"
          height="40"
          label="Title"
          :error-messages="errors.title"
          required
        ></v-text-field>
        <v-select
          :items="categories"
          item-text="title"
          v-model="category"
          item-value="id"
          :error-messages="errors.category"
          label="Category"
        ></v-select>
        <v-textarea
          name="input-7-1"
          label="Article Description"
          v-model="body"
          :error-messages="errors.body"
        ></v-textarea>

        <v-btn
          color="primary"
          class="mr-4 mt-4"
          @click="save"
          :loading="loading"
          :disabled="loading"
          >Submit</v-btn
        >
      </v-card>
    </v-col>
  </v-form>

  <!-- </v-card> -->
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  layout: "DashboardLayout",
  data: () => ({
    valid: true,
    title: "",
    category: "",
    body: "",
    errors: [],
    loading: false
  }),
  created() {
    this.Data();
  },
  computed: {
    ...mapState("category", ["categories"])
  },
  methods: {
    ...mapActions("category", ["Data"]),

    save() {
      this.loading = true;
      let data = {
        title: this.title,
        category: this.category,
        body: this.body
      };
      this.$store
        .dispatch("article/Created", data)
        .then(res => {
          this.loading = false;
          if (res.data.errors) {
            this.errors = res.data.errors;
          }

          if (res.data.success) {
            this.$router.push("/articles");
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
