<template>
  <div class="absolute" :style="position">
    <img :src="PlayerImg" alt="" />
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import PlayerImg from '../assets/keeper.png';
import { usePlayState } from '../store/play';
import { usePosition } from '../composables/usePosition';
const { player } = usePlayState();

const { position } = usePosition(player);
useMove();
function useMove() {
  const { playMoveLeftHand, playMoveRightHand, playMoveUpHand, playMoveDownHand } = usePlayState();
  function move(e: KeyboardEvent) {
    switch (e.code) {
      case 'ArrowLeft':
        playMoveLeftHand();
        break;
      case 'ArrowRight':
        playMoveRightHand();
        break;
      case 'ArrowUp':
        playMoveUpHand();
        break;
      case 'ArrowDown':
        playMoveDownHand();
        break;
    }
  }

  onMounted(() => {
    window.addEventListener('keyup', move);
  });

  onUnmounted(() => {
    window.removeEventListener('keyup', move);
  });
}
</script>
<style lang="scss" scoped></style>
