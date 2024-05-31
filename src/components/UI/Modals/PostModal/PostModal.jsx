import cl from "./PostModal.module.scss";
import closeModal from "./../../../../assets/closeModal.png";
import { useRef, useState } from "react";
import InputModal from "../../input/inputModal/inputModal";

const PostModal = ({ onclick, data }) => {
  const containerRef = useRef(null);
  const [id, setId] = useState(data.length);

  const [newPosts, setNewPosts] = useState({
    name: ``,
    email: ``,
    body: ``,
    postId: 0,
    id: 0,
  });
  localStorage.setItem(`push`, JSON.stringify(newPosts));

  const clearInputs = () => {
    for (let i = 0; i < containerRef.current.childNodes.length; i++) {
      containerRef.current.childNodes[i].value = "";
    }
  };

  const handleChange = () => {
    const arr = [];

    for (let i = 0; i < containerRef.current.childNodes.length; i++) {
      arr.push(containerRef.current.childNodes[i].value);
    }
    setId((prev) => prev + 1);
    setNewPosts((prev) => ({
      ...prev,
      name: arr[0],
      email: arr[1],
      body: arr[2],
      id: id,
    }));

    data.push(newPosts);

    localStorage.setItem(`push`, JSON.stringify(newPosts));
  };

  const arrPlaceholder = [`theme`, `user name`, `desc`];

  return (
    <div className={cl.modalContainer}>
      <div className={cl.modal}>
        <div className={cl.cross} onClick={() => onclick()}>
          <img src={closeModal} alt="closeModal" className={cl.closeModal} />
        </div>
        <div>
          <div className={cl.inputContainer} ref={containerRef}>
            {arrPlaceholder.map((item) => (
              <InputModal key={item} placeholder={item} classname={cl.input} />
            ))}
          </div>

          <div className={cl.btnContainer}>
            <button className={cl.clear} onClick={clearInputs}>
              clear-all
            </button>
            <button
              className={cl.add}
              onClick={(e) => {
                handleChange(e);
              }}
            >
              add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
