<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="articles"
      sort-by="title"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Article List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" to="/articles/create">
            New article
          </v-btn>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="editedItem.title"
                  height="40"
                  label="Title"
                  :error-messages="errors.title"
                  required
                ></v-text-field>
                <v-select
                  :items="categories"
                  item-text="title"
                  v-model="editedItem.category"
                  item-value="id"
                  :error-messages="errors.category"
                  label="Category"
                ></v-select>
                <v-textarea
                  name="input-7-1"
                  label="Article Description"
                  v-model="editedItem.body"
                  :error-messages="errors.body"
                ></v-textarea>
              </v-card-text>

              <v-card-actions class="align-center">
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn
                  color="primary"
                  class="mr-4 "
                  @click="save"
                  :loading="loading"
                  :disabled="loading"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.name" class="p-3">
            <td>#{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.category_title }}</td>
            <td>{{ item.body.substring(0,20)+".."  }}</td>

            <td>
              {{ $moment(item.created_at).format("MMMM Do YYYY") }}
            </td>

            <td>
              {{ $moment(item.updated_at).format("MMMM Do YYYY") }}
            </td>
            <td>
              <v-btn
                color="primary"
                small
                class="mr-2"
                text
                @click="editItem(item)"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                color="error"
                small
                class="mr-2"
                @click="removearticle(item.id)"
              >
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
              <v-btn color="primary" :to="`articles/${item.id}`">
                Details
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="Data">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  layout: "DashboardLayout",
  data: () => ({
    dialog: false,

    headers: [
      {
        text: "Id",
        align: "start",
        sortable: true,
        value: "id"
      },
      { text: "Title", value: "title", sortable: true },
      { text: "Category Title", value: "category_title", sortable: true },
      { text: "Description", value: "body", sortable: true },
      { text: "Created", value: "created_at", sortable: true },
      { text: "Updated", value: "updated_at", sortable: true },
      { text: "Actions", value: "actions", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {
      title: "",
      body: "",
      category: null
    },
    errors: [],
    loading: false,
    success: ""
  }),

  created() {
    this.articleData();
    this.Data();
  },
  computed: {
    ...mapState("article", ["articles"]),
    ...mapState("category", ["categories"]),

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit article";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    ...mapActions({
      articleData: "article/Data",
      Data: "category/Data"
    }),

    editItem(item) {
      this.editedIndex = this.articles.indexOf(item);
      var obg = Object.assign({}, item);

      obg.category = parseFloat(obg.category);
      this.editedItem = obg;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async removearticle(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          console.log(result);
          if (result.value === true) {
            console.log(result);
            let data = {
              id: id
            };
            console.log(data);
            this.$store
              .dispatch("article/Delete", data)
              .then(res => {
                this.$swal.fire("Deleted!", res.data.success, "success");
                this.articleData();
              })
              .catch(() => {});
          }
        });
    },

    save() {
      this.loading = true;
      let data = {
        id: this.editedItem.id,
        title: this.editedItem.title,
        body: this.editedItem.body,
        category: this.editedItem.category
      };
      this.$store
        .dispatch("article/Update", data)
        .then(res => {
          this.loading = false;
          if (res.data.errors) {
            this.errors = res.data.errors;
          }

          if (res.data.success) {
            this.close();
            this.articleData();
            this.$swal.fire("Good job!", res.data.success, "success");
            this.success = res.data.success;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
