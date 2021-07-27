<template>
  <v-footer class="px-0" color="transparent">
    <v-container class="pa-0">
      <v-row no-gutters class="pa-0">
     
        <div class="mx-auto text-center">
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            :href="icon.link"
            class="mr-1"
           
            icon
          >
            <v-icon size="24px">{{ icon.icon }}</v-icon>
          </v-btn>
        </div>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>


export default {
  name: "Footer",

  data: () => ({
   
    icons: [
      { icon: "mdi-twitter", link: "" },
      { icon: "mdi-github", link: "" },
    ],
   
  }),
};
</script>

