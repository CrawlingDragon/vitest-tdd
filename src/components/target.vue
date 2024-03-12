<template>
  <div class="absolute" :style="position">
    <img :src="targetImg" alt="" />
  </div>
</template>
<script setup lang="ts">
import targetImg from '../assets/target.png';
import { usePosition } from '../composables/usePosition';

const props = defineProps({
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
});

const { position } = usePosition({ x: props.x, y: props.y });
</script>
<style lang="scss" scoped></style>
