import { useEffect, useRef, useState } from "react";
import cl from "./UserPosts.module.scss";
import Post from "../../components/UI/Post/Post";
import Loader from "../../components/UI/Loader/Loader";
import EditModal from "../../components/UI/Modals/EditModals/EditModal";
import { useEditingPosts } from "../../hook/useEditingPosts";

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState(
    JSON.parse(localStorage.getItem(`newPost`))
  );
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [idPost, setIdPost] = useState(0);

  const containerRef = useRef(null);

  const { delletPost, callEdit, savePost } = useEditingPosts({
    setUserPosts,
    userPosts,
    setModal,
    setIdPost,
    setAlert,
    idPost,
    containerRef,
  });

  useEffect(() => {
    setLoader(true);

    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className={cl.wrapper}>
        {loader ? (
          <Loader />
        ) : userPosts && userPosts.length > 0 ? (
          userPosts.map((item, index) => (
            <div className={cl.slot} key={index}>
              <div className={cl.btn_slot}>
                <button
                  className={cl.delete}
                  onClick={() => delletPost(item.id)}
                >
                  delete
                </button>
                <button
                  className={cl.edit}
                  onClick={() => callEdit(index, item.id)}
                >
                  edit
                </button>
              </div>
              <Post
                id={item.id}
                name={item.name}
                email={item.email}
                body={item.body}
                classNull={cl.classNull}
              />
            </div>
          ))
        ) : (
          <h2 className={cl.nullPost}>
            To create a post, return to the main page
          </h2>
        )}
      </div>

      {modal && (
        <EditModal
          setModal={setModal}
          handleChange={() => savePost()}
          alert={alert}
          containerRef={containerRef}
        />
      )}
    </>
  );
};

export default UserPosts;
