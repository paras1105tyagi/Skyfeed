import TweetRepository from "../../src/repository/tweet-repository.js";
import Tweet from "../../src/models/tweet.js";
jest.mock('../../src/models/tweet.js');


describe('Tweet Repository Test Suite', ()=>{
test('should create a new tweet and return it', async()=>{
   const data ={
    content: '#Testing tweet repository',
   }
    const spy = jest.spyOn(Tweet, 'create').mockImplementation((data)=>{
        return {
            ...data,createdAt: '2024-06-10T05:21:36.000Z', updatedAt: '2024-06-10T05:21:36.000Z', 
        }
    });
    const tweetReposiotry = new TweetRepository();

    const tweet = await tweetReposiotry.create(data);
    
    expect(spy).toHaveBeenCalled();
    expect(tweet.content).toBe(data.content);
    expect(tweet.createdAt).toBeDefined();

})

test('should not create a new tweet and return error', async()=>{
    const data = {
        content: 'Testing tweet',
    }
    const spy = jest.spyOn(Tweet,'create').mockImplementation(()=>{
        throw new Error('something went wrong');
    });
    const tweetRepository = new TweetRepository();
    const tweet = await tweetRepository.create(data).catch((err)=> {
       expect(err).toBeInstanceOf(Error);
       expect(err.message).toBe('something went wrong');
    });
});
});


describe('Get all tweets', () => {
  test('should return all tweets with pagination', async () => {
    const data = [
      {
        content: 'First tweet',
        createdAt: '2024-06-10T05:21:36.000Z',
        updatedAt: '2024-06-10T05:21:36.000Z',
      },
      {
        content: 'Second tweet',
        createdAt: '2024-06-10T05:21:36.000Z',
        updatedAt: '2024-06-10T05:21:36.000Z',
      },
    ];
    const mockLimit = jest.fn().mockResolvedValue(data.slice(0, 2));
    const mockSkip = jest.fn(() => ({ limit: mockLimit }));
    const mockPopulate = jest.fn(() => ({ skip: mockSkip }));
    jest.spyOn(Tweet, 'find').mockReturnValue({ populate: mockPopulate });

    const tweetRepository = new TweetRepository();
    const tweets = await tweetRepository.getAll(0, 2);

    expect(Tweet.find).toHaveBeenCalled();
    expect(mockPopulate).toHaveBeenCalledWith('hashtags');
    expect(mockSkip).toHaveBeenCalledWith(0);
    expect(mockLimit).toHaveBeenCalledWith(2);
    expect(tweets).toHaveLength(2);
    expect(tweets[0].content).toBe('First tweet');
    expect(tweets[1].content).toBe('Second tweet');
  });
});
