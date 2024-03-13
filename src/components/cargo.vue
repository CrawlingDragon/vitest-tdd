<template>
  <div class="absolute" :style="position">
    <img :src="onTarget ? cargoOnTargetImg : cargoImg" alt="箱子" />
  </div>
</template>
<script setup lang="ts">
import cargoImg from '../assets/cargo.png';
import cargoOnTargetImg from '../assets/cargo_on_target.png';
import { usePosition } from '../composables/usePosition';

interface Props {
  x: number;
  y: number;
  onTarget: boolean;
}
const props = defineProps<Props>();
const { position } = usePosition(props);
</script>
<style lang="scss" scoped></style>
../store/CArgo
