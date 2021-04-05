<template>
  <v-main class="home px-6">
    <v-row justify-md="center" align="center" class="full-height" no-gutters>
      <v-col cols="12" md="3">
        <v-card flat color="transparent" class="mesh">
          <mesh id="mesh" />
        </v-card>
      </v-col>
      <v-col cols="12" md="5" class="d-flex align-center flex-column">
        <greed />
        <h1 class="game-title mt-7">{{ gameEnded.ended ? 'Game Over' : 'Greedy Hunter' }}</h1>
        <h4 class="game-aim mt-5" v-if="!gameEnded.ended">
          The aim is to eat all the food in record time Confiure your game grid
          below 👇🏼
        </h4>
        <div class="game-aim" v-else>
          <h4>{{ gameEnded.message }}</h4>
          <h4>
          Total Food: <strong>{{ gameEnded.score }} / {{ gameEnded.availableFood }}</strong>
        </h4>
          <h4>
          Time Spent: <strong>{{ formattedTime(gameEnded.timeSpent) }}</strong>
        </h4>
        </div>
        <form class="mt-7 d-flex flex-column align-center" @submit="(e) => e.preventDefault()">
          <div class="d-flex justify-center">
            <label>Game grid </label>
            <input type="number" value="10" width="161px" />
          </div>
          <button class="mt-7" @click="$emit('route', 'game')">Start Game</button>
        </form>
      </v-col>
      <v-col cols="12" md="3">
        <v-card flat color="transparent" class="mesh">
          <mesh id="mesh" />
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Mesh from '@/assets/img/abstract/mesh.svg';
import Greed from '@/assets/img/greed.svg';
import { secToMinutes } from '@/utils/conversion';

interface GameState {
    ended: boolean;
    score: number;
    timeSpent: number;
    availableFood: number;
}

@Component({
  components: {
    Mesh,
    Greed,
  },
})
export default class Home extends Vue {
  @Prop({
    default: {
      ended: false,
      score: 0,
      timeSpent: 0,
      availableFood: 0,
      message: '',
    },
  })
  gameEnded!: GameState

  // eslint-disable-next-line class-methods-use-this
  formattedTime(sec: number): string {
    return secToMinutes(sec);
  }
}
</script>

<style scoped>
.home {
  background: var(--color-primary);
}
#mesh {
  width: 90%;
  height: 80%;
}
.game-title {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 64px;
  line-height: 77px;
  text-align: center;
  color: var(--color-secondary);
}
.game-aim {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  max-width: 485px;
  color: var(--text-gray);
  text-align: center;
}
form label {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  color: #ee8d94;
  margin: 0px 30px;
}
form input {
  border: 4px solid #ee8d94;
  box-sizing: border-box;
  border-radius: 5px;
  width: 140px;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  color: #ffffff;
}
form input:focus {
  outline: none;
}
form button {
  width: 348px;
  height: 84px;
  left: 546px;
  top: 713px;
  background: #853594;
  border-radius: 10px;

  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;
  color: #ffffff;
  text-align: center;
}
</style>
