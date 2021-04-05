<template>
  <div class="pl-5">
    <div id="target"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Food from '@/assets/img/food.png';
import Greed from '@/assets/img/greed.png';

interface BoardItem {
  hasFood: boolean;
}

@Component
export default class Grid extends Vue {
  @Prop({ default: 10 })
  value!: number;

  food = Food;

  player = Greed;

  playerRendered = false;

  playerPosition = 0;

  probability = 0.2;

  boardItems: BoardItem[] = [];

  mounted(): void {
    this.populateBoard(this.value);
    this.startListener();
  }

  updateScore(): void {
    this.$emit('update:score');
  }

  populateBoard(rows: number, cola?: number): void {
    const e = document.getElementById('target');
    const cols = cola || rows;
    let id = 0;
    for (let r = 0; r < rows; r += 1) {
      const row = document.createElement('div');
      row.className = 'row';
      for (let c = 0; c < cols; c += 1) {
        const col = document.createElement('div');
        col.className = 'col';
        col.id = `${id}`;
        const itemObj = {
          hasFood: false,
        };
        if (!this.playerRendered && this.randomBoolean(0.1)) {
          Grid.appendElement(col, this.player);
          this.playerRendered = true;
          this.playerPosition = id;
        } else if (this.randomBoolean()) {
          Grid.appendElement(col, this.food);
          itemObj.hasFood = true;
        }
        row.appendChild(col);
        id += 1;
        this.boardItems.push(itemObj);
      }
      if (e) e.appendChild(row);
    }
  }

  static appendElement(col: HTMLElement, imgData: string): void {
    const img = document.createElement('img');
    img.setAttribute('src', imgData);
    col.append(img);
  }

  randomBoolean(probability?: number): boolean {
    return Math.random() < (probability || this.probability);
  }

  startListener(): void {
    console.log('started');
    document.addEventListener('keypress', (e) => {
      const { key } = e;
      switch (key) {
        case 'w':
          this.moveUp();
          break;
        case 's':
          this.moveDown();
          break;
        case 'a':
          this.moveLeft();
          break;
        case 'd':
          this.moveRight();
          break;
        default:
          break;
      }
    });
  }

  moveUp(): void {
    if (this.playerPosition > this.value - 1) {
      const newPosition = this.playerPosition - this.value;
      this.move(newPosition);
    }
  }

  moveDown(): void {
    if (this.playerPosition < this.value ** 2 - 1 - (this.value - 1)) {
      const newPosition = this.playerPosition + this.value;
      this.move(newPosition);
    }
  }

  move(newPosition: number): void {
    const playerCol = document.getElementById(`${this.playerPosition}`);
    const newPlayerCol = document.getElementById(`${newPosition}`);
    if (newPlayerCol) {
      newPlayerCol.innerHTML = '';
      Grid.appendElement(newPlayerCol, this.player);
      this.playerPosition = newPosition;
    }
    if (this.boardItems[newPosition].hasFood) {
      this.updateScore();
      this.boardItems[newPosition].hasFood = false;
    }
    if (playerCol) playerCol.innerHTML = '';
  }

  moveLeft(): void {
    if (this.playerPosition > 0) {
      const newPosition = this.playerPosition - 1;
      this.move(newPosition);
    }
  }

  moveRight(): void {
    if (this.playerPosition < this.value ** 2 - 1) {
      const newPosition = this.playerPosition + 1;
      this.move(newPosition);
    }
  }
}
</script>

 <style>
.row,
#target {
  width: 100%;
  height: 100%;
  text-align: center;
}
.col {
  /* display: inline-block; */
  min-height: 47px;
  min-width: 47px;
  /* padding: 8px 10px; */
  border: 2px solid #43144a;
}
.col img {
  width: 90%;
}
.col:hover {
  background-color: #333333;
  color: #ffffff;
}
</style>
