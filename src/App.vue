<template>
  <v-app>
    <component :is="screen" @route="(v) => screen = v"/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from '@/views/Home.vue';
import Game from '@/views/Game.vue';

  @Component({
    components: {
      Home,
      Game,
    },
  })
export default class extends Vue {
  screen = 'home'
}
</script>

<style scoped>
@import url(assets/styles/global.css);
</style>
