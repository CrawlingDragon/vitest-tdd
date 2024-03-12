import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { usePlayState } from "../play"
import { useMove } from '../../components/play'
import { useMapState } from "../map";
import { useCargoStore } from "../../store/Cargo"


describe('test  player', () => {

  beforeEach(() => {
    setActivePinia(createPinia());
  })
  describe('test keybord event of player', () => {

    beforeEach(() => {

      const { setupMap } = useMapState()
      let newMap = [
        [1, 2, 2, 1],
        [1, 2, 2, 1],
        [1, 2, 2, 1]
      ];

      setupMap(newMap)
    })
    it('when player move left', () => {

      const { player } = usePlayState()

      player.x = 1
      player.y = 2

      useMove()
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowLeft' }))
      // playMoveLeftHand()
      expect(player.x).toBe(1)
    })
    it('when player move right', () => {
      const { player } = usePlayState()
      player.x = 1
      useMove()
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowRight' }))
      expect(player.x).toBe(2)
    })
    it('when player move up', () => {
      const { player } = usePlayState()
      player.y = 1
      useMove()
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowUp' }))
      expect(player.y).toBe(0)
    })
    it('when player move down', () => {
      const { player } = usePlayState()
      player.y = 1
      useMove()
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown' }))
      expect(player.y).toBe(2)
    })
  })

  describe('player move,when collision wall', () => {
    beforeEach(() => {
      const { setupMap } = useMapState()
      let newMap = [
        [1, 1, 1, 1],
        [1, 2, 2, 1],
        [1, 2, 2, 1],
        [1, 1, 1, 1]
      ];

      setupMap(newMap)
    })
    it('player move left', () => {
      const { player, playMoveLeftHand, } = usePlayState()
      player.x = 1
      player.y = 1
      useMove()
      playMoveLeftHand()
      // 因为左边是墙，所以x还是1，这里就是先写了测试，然后在写逻辑
      expect(player.x).toBe(1)
    })
    it('player move right', () => {
      const { player, playMoveRightHand, } = usePlayState()
      player.x = 2
      player.y = 2
      useMove()
      playMoveRightHand()
      expect(player.x).toBe(2)
    })
    it('player move up', () => {
      const { player, playMoveUpHand, } = usePlayState()
      player.x = 1
      player.y = 1
      useMove()
      playMoveUpHand()
      expect(player.y).toBe(1)
    })
    it('player move down', () => {
      const { player, playMoveDownHand, } = usePlayState()
      player.x = 1
      player.y = 2
      useMove()
      playMoveDownHand()
      expect(player.y).toBe(2)
    })
  }
  )
  describe('player move,when cargo player', () => {
    beforeEach(() => {
      const { setupMap } = useMapState()
      // 测试用例
      // 1. 玩家在地图上
      setupMap([
        [1, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 2, 1],
      ])
    })
    it('player move left,touch cargo', () => {
      const { player, playMoveLeftHand } = usePlayState()
      const { cargos, createCargo, addCargo } = useCargoStore()
      addCargo(createCargo(2, 1))
      player.x = 3
      player.y = 1
      playMoveLeftHand()
      expect(player.x).toBe(2)
      expect(cargos[0].x).toBe(1)
    })
    it('player move right,touch cargo', () => {
      const { player, playMoveRightHand } = usePlayState()
      const { cargos, createCargo, addCargo } = useCargoStore()
      addCargo(createCargo(2, 1))
      player.x = 1
      player.y = 1
      playMoveRightHand()
      expect(player.x).toBe(2)
      expect(cargos[0].x).toBe(3)
    })
    it('player move up,touch cargo', () => {
      const { player, playMoveUpHand } = usePlayState()
      const { cargos, createCargo, addCargo } = useCargoStore()
      addCargo(createCargo(2, 2))
      player.x = 2
      player.y = 3
      playMoveUpHand()
      expect(player.y).toBe(2)
      expect(cargos[0].y).toBe(1)
    })
    it('player move down,touch cargo', () => {
      const { player, playMoveDownHand } = usePlayState()
      const { cargos, createCargo, addCargo } = useCargoStore()
      addCargo(createCargo(2, 2))
      player.x = 2
      player.y = 1
      playMoveDownHand()
      expect(player.y).toBe(2)
      expect(cargos[0].y).toBe(3)
    })
    it('fix', () => {
      const { setupMap } = useMapState()
      const { player, playMoveRightHand } = usePlayState()

      // 测试用例
      // 1. 玩家在地图上
      setupMap([
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1],
      ])
      player.x = 1
      player.y = 1
      playMoveRightHand()
      expect(player.x).toBe(2)
    })
    it('next place is wall,when player move left and touch cargo and ', () => {
      const { player, playMoveLeftHand } = usePlayState()
      const { cargos, createCargo, addCargo } = useCargoStore()
      addCargo(createCargo(1, 1))
      player.x = 2
      player.y = 1
      playMoveLeftHand()
      expect(player.x).toBe(2)
      expect(cargos[0].x).toBe(1)

    })
    it('next place is wall,when player move right and touch cargo and ', () => {
      const { player, playMoveRightHand } = usePlayState()
      const { cargos, createCargo, addCargo } = useCargoStore()
      addCargo(createCargo(4, 1))
      player.x = 3
      player.y = 1
      playMoveRightHand()
      expect(player.x).toBe(3)
      expect(cargos[0].x).toBe(4)
    })
    it('next place is wall,when player move up and touch cargo and ', () => {
      const { player, playMoveUpHand } = usePlayState()
      const { cargos, createCargo, addCargo } = useCargoStore()
      addCargo(createCargo(3, 1))
      player.x = 3
      player.y = 2
      playMoveUpHand()
      expect(player.y).toBe(2)
      expect(cargos[0].y).toBe(1)
    })
    it(' player move left and touch cargo with cargo ', () => {
      const { player, playMoveLeftHand } = usePlayState()
      const { cargos, createCargo, addCargo } = useCargoStore()
      addCargo(createCargo(2, 1))
      addCargo(createCargo(3, 1))
      player.x = 4
      player.y = 1
      playMoveLeftHand()
      expect(player.x).toBe(4)
      expect(cargos[0].x).toBe(2)

    })
  })
})

