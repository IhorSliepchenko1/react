export const useEditingPosts = ({ setUserPosts, userPosts, setModal, setIdPost, setAlert, idPost, containerRef }) => {

     const delletPost = (id) => {
          let newArr = JSON.parse(localStorage.getItem(`newPost`)).filter(
               (item) => item.id !== id
          );

          let count = JSON.parse(localStorage.getItem(`count`));
          localStorage.setItem(`count`, JSON.stringify(count - 1));

          newArr.forEach((item) => {
               if (item.id > id) {
                    item.id = item.id - 1;
               }
          });

          setUserPosts(newArr);
          localStorage.setItem(`newPost`, JSON.stringify(newArr));
     };

     const callEdit = (indexPost, idPost) => {
          setModal(true);
          setIdPost(idPost);

          setTimeout(() => {
               const editedPost = userPosts.filter((item, id) => {
                    if (id === indexPost) {
                         return item;
                    }
               });

               const arrName = [`name`, `email`, `body`];

               arrName.map((item, index) => {
                    containerRef.current.childNodes[index].value = editedPost[0][item];
               });
          }, 250);
     };

     const savePost = () => {
          let arr = [
               containerRef.current.childNodes[0].value,
               containerRef.current.childNodes[1].value,
               containerRef.current.childNodes[2].value,
          ];

          if (!arr.includes("")) {
               let result = {
                    name: arr[0],
                    email: arr[1],
                    body: arr[2],
                    postId: 0,
                    id: idPost,
               };

               const localArr = JSON.parse(localStorage.getItem(`newPost`));

               localArr.map((item, index) => {
                    if (item.id === idPost) {
                         localArr[index] = result;
                    }
               });

               localStorage.setItem(`newPost`, JSON.stringify(localArr));

               setUserPosts(JSON.parse(localStorage.getItem(`newPost`)));

               setModal(false);
          } else {
               setAlert(true);

               setTimeout(() => {
                    setAlert(false);
               }, 700);
          }
     };


     return {
          delletPost,
          callEdit,
          savePost,
     };
}