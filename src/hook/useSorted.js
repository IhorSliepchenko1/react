
export const useSortedPosts = (setData) => {
     const sortedPosts = (data, sort, sortTo) => {
          data.sort((a, b) => {
               if (sort === `id`) {
                    return sortTo === `a-z`
                         ? a[sort] - b[sort]
                         : b[sort] - a[sort];

               }
               else {
                    return sortTo === `a-z`
                         ? a[sort].localeCompare(b[sort])
                         : b[sort].localeCompare(a[sort]);
               }


          })

          setData([...data])

          return data;
     }

     return { sortedPosts };
}
