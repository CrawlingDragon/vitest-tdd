import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useCargoStore } from './Cargo';


interface Game {
  isCompleted: boolean;
}

export const useGameStore = defineStore('game', () => {
  const game = reactive<Game>({
    isCompleted: false
  })

  function detectionGameCompleted() {
    const { cargos } = useCargoStore()

    // game.isCompleted = cargos.every((c) => c.onTarget);
    game.isCompleted = cargos.every((c) => c.onTarget)
  }

  return { game, detectionGameCompleted }
})