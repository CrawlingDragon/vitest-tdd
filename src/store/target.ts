import { defineStore } from "pinia";
import { reactive } from "vue";
import { Position } from "../composables/usePosition";


interface Target { x: number; y: number }
export const useTargetStore = defineStore('target', () => {
  // 目标点
  let targets = reactive<Target[]>([])
  const createTarget = ({ x, y }: Target) => {
    return { x, y }
  }
  function addTarget(target: Target) {
    targets.push(target)
  }

  function findTarget(postion: Position) {
    return targets.find((target) => target.x === postion.x && target.y === postion.y)
  }
  return { targets, createTarget, addTarget, findTarget }
})