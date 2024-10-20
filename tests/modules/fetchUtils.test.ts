import { fetchImageUrl } from '../../src/modules/fetchUtils.ts';

global.fetch = jest.fn();

describe('fetchImageUrl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the image URL if the image is found', async () => {
    const mockData = {
      query: {
        pages: {
          '123': {
            imageinfo: [{ url: 'https://example.com/test.jpg' }],
          },
        },
      },
    };
    const mockHeadResponse = { ok: true };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockData),
    });

    (fetch as jest.Mock).mockResolvedValueOnce(mockHeadResponse);

    const result = await fetchImageUrl('Test.jpg');

    expect(result).toBe('https://example.com/test.jpg');
  });

  it('should return the fallback image URL if the image is not found', async () => {
    console.error = jest.fn();

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(null),
    });

    const result = await fetchImageUrl('test.jpg');

    expect(result).toBe('media/urban-bear.jpg');
    expect(console.error).toHaveBeenCalledWith('Error fetching image URL');
  });
});
