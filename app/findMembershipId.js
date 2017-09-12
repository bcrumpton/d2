import keys from './config';

export default function () {
  const apiKey = keys.apiKey;
  const playerForm = document.querySelector('.player-form');
  // const membershipType = 1;
  const displayName = document.getElementById('displayName');
  let memberId;


  const totalTimePlayed = document.querySelector('.total-time-played');

  function getBaseStats() {
    fetch(`https://www.bungie.net/Platform/Destiny2/1/Account/${memberId}/Stats/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': apiKey
      }
    })
    .then(response => response.json())
    .then((data) => {
      totalTimePlayed.innerHTML =
      data.Response.mergedAllCharacters.merged.allTime.secondsPlayed.basic.displayValue;
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
      getBaseStats(memberId);
    });
  }

  // Form submit
  playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    findMemberId(displayName);
  });
}
