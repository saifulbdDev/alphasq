<template>
  <v-form ref="form" v-model="valid" lazy-validation class="mt-5">
    <v-col md="6" cols="12" class="mx-auto">
      <v-card class="pa-2">
        <h2>Add New Category</h2>
        <v-text-field
          v-model="title"
          height="40"
          label="Title"
          :error-messages="errors.title"
          required
        ></v-text-field>
        <v-text-field
          v-model="slug"
          :error-messages="errors.slug"
          height="40"
          label="Slug"
          required
        ></v-text-field>

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
export default {
  layout: "DashboardLayout",
  data: () => ({
    valid: true,
    title: "",
    slug: "",
    errors: [],
    loading: false
  }),
 

  methods: {
    save() {
      this.loading = true;
      let data = {
        title: this.title,
        slug: this.slug
      };
      this.$store
        .dispatch("category/Created", data)
        .then(res => {
          this.loading = false;
          if (res.data.errors) {
            this.errors = res.data.errors;
          }

          if (res.data.success == "Category created successfully !") {
            this.$router.push("/categories");
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
