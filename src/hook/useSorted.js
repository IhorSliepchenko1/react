
export const useSortedPosts = (posts, sort) => {
     const sortedPosts = () => {
          if (sort) {
               return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
          }
          return posts;
     }

     return { sortedPosts };
}