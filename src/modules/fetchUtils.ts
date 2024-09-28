export const fetchData = async (
  url: string,
  params: Record<string, string>
) => {
  try {
    const fullUrl = `${url}?${new URLSearchParams(params).toString()}`;
    const response = await fetch(fullUrl);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data', error);
    return null;
  }
};

export const fetchImageUrl = async (fileName: string): Promise<string> => {
  const baseUrl = 'https://en.wikipedia.org/w/api.php';
  const imageParams = {
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  try {
    const data = await fetchData(baseUrl, imageParams);
    const pages = data?.query?.pages as Record<string, any>;

    if (!pages) {
      new Error('Image not found');
    }

    const imageUrl = Object.values(pages)[0].imageinfo[0].url;

    const imgResponse = await fetch(imageUrl, { method: 'HEAD' });

    if (!imgResponse.ok) {
      new Error('Image not found');
    }

    return imageUrl;
  } catch (error) {
    console.error('Error fetching image URL');
    return 'media/urban-bear.jpg';
  }
};
