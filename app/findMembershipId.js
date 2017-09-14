import keys from './config';
import createEmblemElements from './createEmblemElements';

export default function () {
  const apiKey = keys.apiKey;
  const playerForm = document.querySelector('.player-form');
  const displayName = document.getElementById('displayName');
  let memberId;


  function getCharacter(character) {
    fetch(`https://www.bungie.net/Platform/Destiny2/1/Profile/${memberId}/Character/${character}/?components=200`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': apiKey
      }
    })
    .then(res => res.json())
    .then((data) => {
      createEmblemElements(data);
    });
  }

  function getProfile() {
    fetch(`https://www.bungie.net/Platform/Destiny2/1/Profile/${memberId}/?components=100`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': apiKey
      }
    })
    .then(response => response.json())
    .then((data) => {
      data.Response.profile.data.characterIds.forEach((character) => {
        getCharacter(character);
      });
    });
  }


  function findMemberId() {
    fetch(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/1/${displayName.value}/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': apiKey
      }
    })
    .then(response => response.json())
    .then((data) => {
      memberId = data.Response[0].membershipId;
      getProfile(memberId);
    });
  }

  // Form submit
  playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    findMemberId(displayName);
  });
}
