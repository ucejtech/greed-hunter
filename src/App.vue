<template>
  <v-app>
    <component :is="screen"/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from '@/views/Home.vue';

  @Component({
    components: {
      Home,
    },
  })
export default class extends Vue {
  screen = 'home'
}
</script>

<style scoped>
@import url(assets/styles/global.css);
</style>
