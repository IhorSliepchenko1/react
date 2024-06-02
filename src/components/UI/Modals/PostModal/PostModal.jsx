import { useRef, useState } from "react";
import AlertModal from "../AlertModal/AlertModal";
import ModalBody from "../ModalBody/ModalBody";

const PostModal = ({ count, setModal, setData }) => {
  const containerRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const arrLocalStorage = JSON.parse(localStorage.getItem(`newPost`)) || [];
  localStorage.setItem(`newPost`, JSON.stringify(arrLocalStorage));

  let newCount = JSON.parse(localStorage.getItem(`count`)) || count;
  localStorage.setItem(`count`, JSON.stringify(newCount));

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

  return (
    <>
      <ModalBody
        handleChange={handleChange}
        containerRef={containerRef}
        setModal={setModal}
        text={`add`}
      />

      {alert && <AlertModal text={`Заполните все поля`} />}
    </>
  );
};

export default PostModal;
