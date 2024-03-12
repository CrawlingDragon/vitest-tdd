import { usePlayState } from "../store/play";
import { computed } from "vue";
export function useMove() {
  const { player, playMoveLeftHand, playMoveRightHand, playMoveUpHand, playMoveDownHand } = usePlayState();


  window.addEventListener('keyup', (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowLeft':
        console.log('player', player);
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
  });

}

