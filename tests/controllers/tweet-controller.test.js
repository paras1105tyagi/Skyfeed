
import { getTweet } from '../../src/controllers/tweet-controller.js';
import TweetService from '../../src/service/tweet-service.js';
jest.mock('../../src/service/tweet-service.js');
import { mockRequest, mockResponse } from '../mocker.js';
test('should return tweets', async () => {
  const req = mockRequest({ params: { id: 1 } }); // 👈 set id
  const res = mockResponse();
  const response = [
    { id: 1, content: 'Tweet 1' },
    { id: 2, content: 'Tweet 2' }
  ];

  (TweetService.prototype.get).mockResolvedValue(response);

  await getTweet(req, res);

  expect(res.json).toHaveBeenCalledWith({
    success: true,
    message: "Tweet retrieved successfully",
    data: response,
    err: {},
  });
});



