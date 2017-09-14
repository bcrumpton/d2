export default function createEmblemElements(characterData) {
  const emblem = document.createElement('IMG');
  emblem.src = 'https:/bungie.net' + characterData.Response.character.data.emblemBackgroundPath;

  const body = document.querySelector('body');
  body.appendChild(emblem);
}
