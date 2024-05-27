import axios from "axios";

export class PostService {
     static async getPosts(page, limit) {
          try {
               const response = await axios.get(`https://jsonplaceholder.typicode.com/comments`, {
                    params: {
                         _limit: limit,
                         _page: page
                    }
               })

               const count = await response.headers["x-total-count"];
               return [response.data, count];
          } catch (error) {
               console.error(error);
               return [];
          }
     };

     static async getAll() {
          try {
               const response = await axios.get(`https://jsonplaceholder.typicode.com/comments`)
               return [response];

          } catch (error) {
               console.error(error);
               return [];
          }
     };
}


