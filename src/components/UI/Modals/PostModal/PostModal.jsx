import cl from "./PostModal.module.scss";
import closeModal from "./../../../../assets/closeModal.png";
import { useEffect, useRef, useState } from "react";
import InputModal from "../../input/inputModal/inputModal";
import AlertModal from "../AlertModal/AlertModal";

const PostModal = ({ count, setModal, setData }) => {
  const containerRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const arrLocalStorage = JSON.parse(localStorage.getItem(`newPost`)) || [];
  localStorage.setItem(`newPost`, JSON.stringify(arrLocalStorage));

  let newCount = JSON.parse(localStorage.getItem(`count`)) || count;
  localStorage.setItem(`count`, JSON.stringify(newCount));

  const clearInputs = () => {
    for (let i = 0; i < containerRef.current.childNodes.length; i++) {
      containerRef.current.childNodes[i].value = "";
    }
  };

  const closeModalFn = () => {
    setModal(false);
    console.log(`modal close`);
  };

  const handleChange = () => {
    const arr = [];

    for (let i = 0; i < containerRef.current.childNodes.length; i++) {
      arr.push(containerRef.current.childNodes[i].value);
    }

    if (!arr.includes("")) {
      newCount += 1;

      arrLocalStorage.push({
        name: arr[0],
        email: arr[1],
        body: arr[2],
        postId: 0,
        id: newCount,
      });

      localStorage.setItem(`count`, JSON.stringify(newCount));
      localStorage.setItem(`newPost`, JSON.stringify(arrLocalStorage));

      setData((prev) => [...prev, ...arrLocalStorage]);
      setModal(false);
    } else {
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 700);
    }
  };

  const arrPlaceholder = [`theme`, `user name`, `desc`];

  return (
    <>
      <div className={cl.modalContainer}>
        <div className={cl.modal}>
          <div className={cl.cross} onClick={closeModalFn}>
            <img src={closeModal} alt="closeModal" className={cl.closeModal} />
          </div>
          <div>
            <div className={cl.inputContainer} ref={containerRef}>
              {arrPlaceholder.map((item) => (
                <InputModal
                  key={item}
                  placeholder={item}
                  classname={cl.input}
                />
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

      {alert && <AlertModal text={`Заполните все поля`} />}
    </>
  );
};

export default PostModal;
