interface ApiResponse {
  parse?: {
    wikitext?: {
      '*': string;
    };
  };
  query?: {
    pages?: Record<
      string,
      {
        imageinfo?: Array<{ url: string }>;
      }
    >;
  };
}

export const fetchData = async (
  url: string,
  params: Record<string, string>
): Promise<ApiResponse | null> => {
  try {
    const fullUrl = `${url}?${new URLSearchParams(params).toString()}`;
    const response = await fetch(fullUrl);
    return (await response.json()) as ApiResponse;
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
    const pages = data?.query?.pages as Record<
      string,
      { imageinfo?: Array<{ url: string }> }
    >;

    if (pages == null) {
      Error('Image not found');
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error: Pages object type is dynamic and may not match exactly with the expected shape
    const imageUrl = Object.values(pages)[0].imageinfo[0].url;

    const imgResponse = await fetch(imageUrl, { method: 'HEAD' });

    if (!imgResponse.ok) {
      Error('Image not found');
    }

    return imageUrl;
  } catch (error) {
    console.error('Error fetching image URL');
    return 'media/urban-bear.jpg';
  }
};
