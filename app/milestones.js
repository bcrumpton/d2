import keys from './config';


export default function () {
  const apiKey = keys.apiKey;
  const milestoneHashes = [];

  fetch('https://www.bungie.net/Platform/Destiny2/Milestones/', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'X-API-Key': apiKey
    }
  })
  .then(response => response.json())
  .then((data) => {
    Object.keys(data.Response).forEach((key) => {
      milestoneHashes.push(key);
    });
  })
  .then(() => {
    for (let i = 0; i < milestoneHashes.length; i += 1) {
      fetch(`https://www.bungie.net/Platform/Destiny2/Milestones/${milestoneHashes[i]}/Content/`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'X-API-Key': apiKey
        }
      })
      .then(response => response.json)
      .then(() => {
        // There's not much to do here except getting Bungie written descriptions of activities.
        // There are a few nice tips on gameplay though!
      });
    }
  });
}
