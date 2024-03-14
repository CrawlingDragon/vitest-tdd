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
    <div v-show="game.isCompleted">下一关</div>
  </div>
</template>
<script setup lang="ts">
import Map from '../../components/map.vue';
import Player from '../../components/player.vue';
import Cargo from '../../components/cargo.vue';
import Target from '../../components/target.vue';
import { useCargoStore } from '../../store/Cargo';
import { useTargetStore } from '../../store/target';
import { useGameStore } from '../../store/game';

const { cargos, addCargo, createCargo } = useCargoStore();
addCargo(createCargo(2, 2));
addCargo(createCargo(3, 2));

const cargo = useCargoStore();
const { targets, addTarget, createTarget } = useTargetStore();
addTarget(createTarget({ x: 1, y: 3 }));
addTarget(createTarget({ x: 3, y: 3 }));

const { game } = useGameStore();
</script>
<style lang="scss" scoped></style>
