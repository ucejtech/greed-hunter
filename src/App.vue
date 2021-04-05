<template>
  <v-app>
    <component :is="screen" @route="(v) => screen = v" @end:game="endGame" :game-ended="gameState"/>
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

  gameState = {
    ended: false,
    score: 0,
    timeSpent: 0,
    availableFood: 0,
    message: '',
  }

  endGame({
    score, timeSpent, availableFood, message,
  }: { score: number, timeSpent: number, availableFood: number, message: string }): void {
    this.gameState.score = score;
    this.gameState.timeSpent = timeSpent;
    this.gameState.ended = true;
    this.gameState.availableFood = availableFood;
    this.gameState.message = message;

    this.screen = 'home';
  }
}
</script>

<style scoped>
@import url(assets/styles/global.css);
</style>
