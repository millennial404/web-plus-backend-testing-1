import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    const initialPostCount = postsService['posts'].length;

    const createdPost = postsService.create(post);

    expect(postsService['posts'].length).toBe(initialPostCount + 1);
    expect(createdPost.text).toBe(post.text);
    expect(createdPost).toHaveProperty('id');
    expect(createdPost).toHaveProperty('date');
  });

  it('should find a post', () => {
    const createdPost = postsService.create(post);
    const foundPost = postsService.find(createdPost.id);

    expect(foundPost).toBeDefined();
    expect(foundPost?.id).toBe(createdPost.id);
    expect(foundPost?.text).toBe(post.text);
    expect(foundPost?.date).toBe(createdPost.date);
  });
});