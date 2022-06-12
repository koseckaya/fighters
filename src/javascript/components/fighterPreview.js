import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)
  if (fighter) {

    const fighterPreviewImg = createElement({
      tagName: 'img',
      className: '',
      attributes: {
        src: fighter.source,
      }
    });
    const fighterPreviewInfo = createElement({
      tagName: 'div',
      className: 'fighter-preview___info-block' 
    });

    const fighterPreviewNameTitle = createElement({
      tagName: 'span',
      className: 'fighter-preview___info' ,
    });
    const fighterPreviewName = createElement({
      tagName: 'span',
      className: 'fighter-preview___info-name' ,
    });
    
    fighterPreviewName.innerText = fighter.name;
    fighterPreviewNameTitle.innerText = 'Name ';
    fighterPreviewNameTitle.append(fighterPreviewName);
    const fighterPreviewHealthTitle = createElement({
      tagName: 'span',
      className: 'fighter-preview___info' ,
    });
    const fighterPreviewHealth = createElement({
      tagName: 'span',
      className: '' ,
    });
    fighterPreviewHealthTitle.innerText = 'Health ';
    fighterPreviewHealth.innerText = fighter.health;
    fighterPreviewHealthTitle.append(fighterPreviewHealth);
    const fighterPreviewAttackTitle = createElement({
      tagName: 'span',
      className: 'fighter-preview___info' ,
    });
    const fighterPreviewAttack = createElement({
      tagName: 'span',
      className: '' ,
    });
    fighterPreviewAttackTitle.innerText = 'Attack ';
    fighterPreviewAttack.innerText = fighter.attack;
    fighterPreviewAttackTitle.append(fighterPreviewAttack);
    const fighterPreviewDefenseTitle = createElement({
      tagName: 'span',
      className: 'fighter-preview___info' ,
    });
    const fighterPreviewDefense = createElement({
      tagName: 'span',
      className: '' ,
    });
    fighterPreviewDefenseTitle.innerText = 'Defense ';
    fighterPreviewDefense.innerText = fighter.defense;
    fighterPreviewDefenseTitle.append(fighterPreviewDefense);


    fighterPreviewInfo.append(fighterPreviewNameTitle,fighterPreviewHealthTitle, fighterPreviewAttackTitle, fighterPreviewDefenseTitle)
    
    fighterElement.append(fighterPreviewImg, fighterPreviewInfo)
  }

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
