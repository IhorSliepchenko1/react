import { useEffect, useState } from "react";
import cl from "./Modal.module.scss";

const Modal = ({ text }) => {
  const delay = 1000;
  const interval = delay / 100;
  //   const [modal, setModal] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loading = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + interval;

        if (newProgress >= delay) {
          clearInterval(loading);
        }

        return newProgress;
      });
    }, interval);

    return () => clearInterval(loading);
  }, [delay, interval]);

  const progressPercentage = (progress / delay) * 100;

  return (
    <div className={cl.modalContainer}>
      <div className={cl.modal}>
        <p>{text}</p>
        <span
          className={cl.timeLine}
          style={{ width: `${progressPercentage}%` }}
        ></span>
      </div>
    </div>
  );
};

export default Modal;
