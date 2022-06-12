import { controls } from '../../constants/controls';

const GAME_TICK = 200; // in miliseconds
const CRIT_DELAY = 10 * 1000;

export async function fight(firstFighter, secondFighter) {
  let winnerCallback;

  const first = {
    ...firstFighter,
    canCrit: true,
    canAttack: true,
    pressedButtons: new Set(),
    critCombination: controls.PlayerOneCriticalHitCombination,
    attackButton: controls.PlayerOneAttack,
    blockButton: controls.PlayerOneBlock,
  };
  const second = {
    ...secondFighter,
    canCrit: true,
    canAttack: true,
    pressedButtons: new Set(),
    critCombination: controls.PlayerTwoCriticalHitCombination,
    attackButton: controls.PlayerTwoAttack,
    blockButton: controls.PlayerTwoBlock,
  };

  const firstFighterHealth = document.getElementById('left-fighter-indicator');
  const secondFighterHealth = document.getElementById('right-fighter-indicator');

  const keydownHandler = (event) => {
    switch (event.code) {
      case controls.PlayerOneAttack:
      case controls.PlayerOneBlock:
        first.pressedButtons.add(event.code);
        break;

      case controls.PlayerTwoAttack:
      case controls.PlayerTwoBlock:
        second.pressedButtons.add(event.code);
        break;
    }

    if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
      first.pressedButtons.add(event.code);
    }

    if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
      second.pressedButtons.add(event.code);
    }
  }

  const keyupHandler =  (event) => {
    if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
      first.pressedButtons.delete(event.code);
    }

    if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
      second.pressedButtons.delete(event.code);
    }
  }

  window.addEventListener('keydown', keydownHandler );

  window.addEventListener('keyup', keyupHandler);

  function tickGame() {
    doGame();

    renderHealth();

    clearTick();
  }

  function doGame() {
    // обновить объекты игроков в соответствевии с полученным уроном
    if (first.health === 0) {
      finishGame(secondFighter);
      return;
    }

    if (second.health === 0) {
      finishGame(firstFighter);
      return;
    }

    fighterAttack(first, second);

    fighterAttack(second, first);


    first.canAttack = true;
    second.canAttack = true;
  }

  function fighterAttack(attacker, defender) {
    // проверка на крит атакующего игрока
    if (
      attacker.canCrit &&
      attacker.critCombination.every(key => attacker.pressedButtons.has(key))
    ) {
      attacker.canCrit = false;
      attacker.canAttack = false;
      setTimeout(() => { attacker.canCrit = true; }, CRIT_DELAY);
      const fighterHealth = defender.health - getCritDamage(attacker);
      defender.health = fighterHealth <= 0 ? 0 : fighterHealth;
    }



    // проверка возможность удара атакующим игроком
    if (
      attacker.canAttack &&
      !attacker.pressedButtons.has(attacker.blockButton) &&
      !defender.pressedButtons.has(defender.blockButton) &&
      attacker.pressedButtons.has(attacker.attackButton)
    ) {

      const fighterHealth = defender.health - getDamage(attacker, defender);
      defender.health = fighterHealth <= 0 ? 0 : fighterHealth;
    }
  }

  function renderHealth() {
    firstFighterHealth.style.width = Math.floor(first.health / firstFighter.health * 100) + '%';
    secondFighterHealth.style.width = Math.floor(second.health / secondFighter.health * 100) + '%';
  }

  function clearTick() {
    first.pressedButtons.clear();
    second.pressedButtons.clear();
  }

  function finishGame(winner) {
    window.removeEventListener('keydown', keydownHandler)
    window.removeEventListener('keyup', keyupHandler)
    winnerCallback(winner)
  }

  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    winnerCallback = resolve;
    setInterval(tickGame, GAME_TICK);
  });
}

export function getDamage(attacker, defender) {
  // return damage

  const resultDamage = getHitPower(attacker) - getBlockPower(defender);

  return resultDamage <= 0 ? 0 : resultDamage;
}

export function getHitPower(fighter) {
  // return hit power
  let criticalHitChance = 1 + Math.random()
  const calculatedDamage = (fighter.attack * criticalHitChance).toFixed(2);

  return Number(calculatedDamage)
}

export function getBlockPower(fighter) {
  // return block power
  let dodgeChance = 1 + Math.random()
  const calculatedBlock = (fighter.defense * dodgeChance).toFixed(2);

  return Number(calculatedBlock)
}

export function getCritDamage(fighter) {
  return 2 * fighter.attack;
}

