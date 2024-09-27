import { fetchImageUrl } from './fetchUtils.js';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

export const extractBears = async (wikitext: string) => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');

    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)]]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=(.*?)([|\n])/);

      if (nameMatch && binomialMatch && imageMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');
        const range = rangeMatch ? rangeMatch[1].trim() : 'Range not available';

        try {
          const imageUrl = await fetchImageUrl(fileName);
          const bear = {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl,
            range: range,
          };
          bears.push(bear);
        } catch (error) {
          console.error('Error fetching image URL for bear: ', nameMatch[1]);
        }
      }
    }
  }

  return bears;
};

export const displayBears = (bears: Bear[]) => {
  const moreBearsSection = document.querySelector('.more_bears');

  if (!moreBearsSection) {
    console.error('More bears section not found');
    return;
  }

  bears.forEach((bear) => {
    const bearDiv = document.createElement('div');
    const bearHeading = document.createElement('h3');
    const bearImage = document.createElement('img');
    const bearRange = document.createElement('p');

    bearHeading.textContent = `${bear.name} (${bear.binomial})`;
    bearImage.setAttribute('src', bear.image);
    bearImage.setAttribute('alt', bear.name);
    bearImage.style.width = '200px';
    bearImage.style.height = 'auto';

    bearRange.innerHTML = `<strong>Range:</strong> ${bear.range}`;

    bearDiv.appendChild(bearHeading);
    bearDiv.appendChild(bearImage);
    bearDiv.appendChild(bearRange);

    moreBearsSection.appendChild(bearDiv);
  });
};
