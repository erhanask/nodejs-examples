class Post {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }

  getInfo() {
      return this.title+' '+this.body;
  }

}
class PostController {
    constructor() {
        this.posts = [];
    }

    addPost(title, body) {
        const post = new Post(title, body);
        this.posts.push(post);
    }

    getPosts() {
        return this.posts;
    }
}

const postController = new PostController();
postController.addPost('Title 1', 'Body 1');
postController.addPost('Title 2', 'Body 2');
postController.addPost('Title 2', 'Body 3');

for (let i = 0; i < postController.getPosts().length; i++) {
    console.log(postController.getPosts()[i].getInfo());
}