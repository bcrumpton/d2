import createEmblemElements from './createEmblemElements';

export default function addEmblemElements(emblem) {
  const element = createEmblemElements(emblem);
  const body = document.querySelector('body');
  body.appendChild(emblem);
}
