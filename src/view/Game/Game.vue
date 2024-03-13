<template>
  <div class="relative">
    <Map></Map>
    <template v-for="target in targets">
      <Target :x="target.x" :y="target.y" />
    </template>
    <Player />
    <template v-for="item in cargos">
      <Cargo :x="item.x" :y="item.y" :onTarget="item.onTarget" />
    </template>
  </div>
</template>
<script setup lang="ts">
import Map from '../../components/map.vue';
import Player from '../../components/player.vue';
import Cargo from '../../components/cargo.vue';
import Target from '../../components/target.vue';
import { useCargoStore } from '../../store/Cargo';
import { useTargetStore } from '../../store/target';

const { cargos, addCargo, createCargo } = useCargoStore();
addCargo(createCargo(2, 2));
addCargo(createCargo(3, 2));

const { targets, addTarget, createTarget } = useTargetStore();
addTarget(createTarget({ x: 2, y: 3 }));
addTarget(createTarget({ x: 3, y: 3 }));
</script>
<style lang="scss" scoped></style>
