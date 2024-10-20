import { initComments } from './modules/comment.ts';
import { fetchData } from './modules/fetchUtils.ts';
import { extractBears, displayBears } from './modules/bearParser.ts';

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

const getBearData = async (): Promise<void> => {
  try {
    const data = await fetchData(baseUrl, params);

    if (
      data === null ||
      data.parse === undefined ||
      data.parse.wikitext === undefined
    ) {
      console.error('Error fetching bear data');
      return;
    }

    const wikitext = data.parse.wikitext['*'];
    const bears = await extractBears(wikitext);

    if (bears.length > 0) {
      displayBears(bears);
    } else {
      console.warn('No bears found.');
    }
  } catch (error) {
    console.error('Error fetching bear data');
  }
};

initComments();
void getBearData();
