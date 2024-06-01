import { useEffect, useState } from "react";
import cl from "./UserPosts.module.scss";
import Post from "../../components/UI/Post/Post";
import Loader from "../../components/UI/Loader/Loader";
import EditModal from "../../components/UI/Modals/EditModals/EditModal";

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState(
    JSON.parse(localStorage.getItem(`newPost`))
  );
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setLoader(true);

    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  const delletPost = (id) => {
    let newArr = JSON.parse(localStorage.getItem(`newPost`)).filter(
      (item, index) => index !== id
    );
    setUserPosts(newArr);
  };

  useEffect(() => {
    localStorage.setItem(`newPost`, JSON.stringify(userPosts));
  }, [delletPost]);

  return (
    <>
      <div className={cl.wrapper}>
        {loader ? (
          <Loader />
        ) : userPosts.length > 0 ? (
          userPosts.map((item, index) => (
            <div className={cl.slot} key={index}>
              <div className={cl.btn_slot}>
                <button className={cl.delete} onClick={() => delletPost(index)}>
                  delete
                </button>
                <button className={cl.edit} onClick={() => setModal(true)}>
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
          <h2 className={cl.nullPost}>To create a post, return to the main page</h2>
        )}
      </div>

      {modal && <EditModal setModal={setModal} />}
    </>
  );
};

export default UserPosts;
