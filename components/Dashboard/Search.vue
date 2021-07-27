<template>
  <form action="#">
    <label class="search-label" :data-search="search">
      <input type="text" placeholder="Search" @click="search = 'open'" @blur="search='close'"/>
      <v-icon :color="config.light.iconColor" size="28">mdi-magnify</v-icon>
    </label>
  </form>
</template>

<script>
import config from '../../config';

export default {
  name: 'Search',
  data(){
    return {
      config,
      search: "close"
    }
  },
}

</script>




