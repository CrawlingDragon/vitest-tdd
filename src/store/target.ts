import { defineStore } from "pinia";
import { reactive } from "vue";


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
  return { targets, createTarget, addTarget }
})