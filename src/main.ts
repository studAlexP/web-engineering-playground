import { initComments } from './modules/comment.js';
import { fetchData } from './modules/fetchUtils.js';
import { extractBears, displayBears } from './modules/bearParser.js';

const baseUrl = 'https://en.wikipedia.org/w/api.php';
const title = 'List_of_ursids';

const params = {
  action: 'parse',
  page: title,
  prop: 'wikitext',
  section: '3',
  format: 'json',
  origin: '*',
};

const getBearData = async () => {
  try {
    const data = await fetchData(baseUrl, params);

    if (!data) {
      console.error('Error fetching bear data');
      return;
    }

    const wikitext = data.parse.wikitext['*'];
    const bears = await extractBears(wikitext);

    if (bears && bears.length > 0) {
      displayBears(bears);
    } else {
      console.warn('No bears found.');
    }
  } catch (error) {
    console.error('Error fetching bear data');
  }
};

initComments();
getBearData();
