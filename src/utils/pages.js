
export const getPagesArray = (totalCount, limit) => {
     const totalPages = Math.ceil(totalCount / limit)
     return Array.from({ length: totalPages }, (_, i) => i + 1);

}