<template>
  <v-main class="game d-flex align-center">
    <v-row justify="center" align="center" class="full-height" no-gutters>
      <v-col cols="12" md="5" class="card-parent">
        <v-card class="card px-5">
          <div
            class="py-3 title-frame d-flex justify-space-between align-center"
          >
            <div class="grid-indicator">Grid: <strong>10 x 10</strong></div>
            <div class="d-flex align-center">
              <heart id="heart" />
              <progress class="ml-n4" max="100" :value="timer" />
            </div>
            <div class="time-counter">
              Time spent: <strong> {{ formattedTime }} s</strong>
            </div>
          </div>
          <div class="game-board">
            <grid @update:score="score += 1" @update:moves="moves += 1" @end:game="endGame" />
          </div>
          <div
            class="py-5 title-frame d-flex justify-space-between align-center"
          >
            <div class="grid-indicator">
              Maximum moves: <strong>100</strong>
            </div>
            <div class="grid-indicator">
              Food: <strong>{{ score }}</strong>
            </div>
            <div class="time-counter">Total moves: <strong>{{ moves  }}</strong></div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Heart from '@/assets/img/abstract/heart.svg';
import Grid from '../components/grid.vue';
import { secToMinutes } from '../utils/conversion';

@Component({
  components: {
    Heart,
    Grid,
  },
})
export default class Game extends Vue {
  timer = 100;

  timeManager !: number | undefined;

  timeSpent = 0;

  score = 0;

  moves = 0;

  get formattedTime(): string | number {
    return secToMinutes(this.timeSpent);
  }

  mounted(): void {
    this.increase();
  }

  increase(): void {
    this.timeManager = setInterval(() => {
      // this.timer -= 10;
      this.timeSpent += 1;
    }, 1000);
  }

  beforeDestroy(): void {
    clearInterval(this.timeManager);
  }

  endGame({ availableFood, message }: { availableFood: number, message: string }): void {
    this.$emit('end:game', {
      score: this.score, timeSpent: this.timeSpent, availableFood, message,
    });
  }
}
</script>

<style scoped>
.game {
  background: url("../assets/img/game-bg.png") no-repeat;
  background-size: cover;
}
.card-parent {
  height: 100%;
}
.game .card {
  width: 100%;
  max-height: 100%;
  background: #ffffff;
  border-radius: 17.5186px;
}
.indicator {
  max-width: 143px;
}
.grid-indicator,
.time-counter {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 15.7668px;
  line-height: 18px;
  color: #23144b;
  margin: 0px 8.75931px;
}
#heart {
  z-index: 100;
  max-height: 51px;
  max-width: 43px;
}
progress[value] {
  -webkit-appearance: none;
  appearance: none;
}
progress[value]::-webkit-progress-bar {
  background: linear-gradient(180deg, #853594 47.39%, #692789 47.4%);
  border: 1.45507px solid #532461;
  box-sizing: border-box;
  border-radius: 12.661px;
}
progress[value]::-webkit-progress-value {
  background: linear-gradient(180deg, #f07cc3 44.27%, #c5418e 44.28%);
  border: 1.87639px solid #fffffd;
  box-sizing: border-box;
  border-radius: 11.0238px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
