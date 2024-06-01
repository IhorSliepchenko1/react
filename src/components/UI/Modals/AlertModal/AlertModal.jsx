import { useEffect, useState } from "react";
import cl from "./AlertModal.module.scss";

const AlertModal = ({ text }) => {
  const delay = 1000;
  const interval = delay / 100;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lineTime = setInterval(() => {
      setProgress((prev) => prev + 1);

      if (progress >= 100) {
        clearInterval(lineTime);
      }
    }, interval);
    return () => {
      clearInterval(lineTime);
    };
  }, []);

  return (
    <div className={cl.modalContainer}>
      <div className={cl.modal}>
        <p>{text}</p>
        <span className={cl.timeLine} style={{ width: `${progress}%` }}></span>
      </div>
    </div>
  );
};

export default AlertModal;
