import App from '../../app'
import { showModal } from './modal'
import { removeArena } from '../arena';

export function showWinnerModal(fighter) {
  // call showModal function 
  showModal({
    title: 'WINNER', bodyElement: fighter.name, onClose: () => {
      removeArena();
      App.startApp()
    }
  })
}
