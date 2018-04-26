import React from 'react';

export default function UnitIconComponent(props) {
  let icon;
  switch (props.iconLabel) {
    case 'video':
      icon = 'video';
      break;
    case 'page':
      icon = 'text';
      break;
    case 'multipleChoiceQuizz':
      icon = 'question';
      break;
    case 'singleChoiceQuizz':
      icon = 'question';
      break;
    case 'textQuizz':
      icon = 'question';
      break;
    case 'figure':
      icon = 'image';
      break;
    default:
      icon = 'question';
  }
  return(<svg className="icon sz-18"><use xlinkHref={ SpritePath + '#' + icon } /></svg>)
}
