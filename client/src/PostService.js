import axios from "axios";

const url = "api/posts/";
//Class för att hantera API
class PostService {
  //Get posts from database
  static getPosts() {
    return new Promise((resolve, reject) => {
      axios.get(url).then((res) => {
        const data = res.data;
        resolve(
          data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
          }))
        );
      })
        .catch((err) => {
          reject(err);
        })

    });
  }
  //CREATE
  static insertPost(text) {
    return axios.post(url, { text: text });
  }
  //UPDATE
  static updatePost(text, id) {
    const updateUrl = url + "update/" + id;
    return axios.put(`${updateUrl}`, { text: text });
  }

  //DELTE
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
