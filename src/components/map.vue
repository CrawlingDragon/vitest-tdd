<template>
  <div>
    <div v-for="(item, index) in map" class="flex" :key="index">
      <div v-for="it in item" :key="it">
        <template v-if="it === MapTile.WALL">
          <img :src="wall" alt="" />
        </template>
        <template v-if="it === MapTile.FLOOR">
          <img :src="floor" alt="" />
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import floor from '../assets/floor.png';
import wall from '../assets/wall.png';
import { useMapState, MapTile } from '../store/map';
const { map } = useMapState();
</script>
<style lang="scss" scoped></style>
