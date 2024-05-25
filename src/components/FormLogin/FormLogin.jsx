import MyInput from "../UI/input/MyInput";
import cl from "./FormLogin.module.scss";
import MyButton from "./../UI/button/MyButton";
import CloseEye from "./assets/CloseEye";
import OpenEye from "./assets/OpenEye";
import { useState } from "react";
import { useVerification } from "../../hook/useVerification";
import Modal from "../UI/Modal/Modal";

const FormLogin = () => {
  const [open, setOpen] = useState(false);
  const { login, password, handleInfo, modal, setModal, text } =
    useVerification();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className={cl.container}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={cl.form}
        >
          <div className={cl.input_container}>
            <MyInput type={`email`} labelText={`Login`} reference={login} />

            <div className={cl.containerPass}>
              <MyInput
                type={open ? `text` : `password`}
                labelText={`Password`}
                reference={password}
              />

              <span className={cl.icon} onClick={handleClick}>
                {open ? <CloseEye /> : <OpenEye />}
              </span>
            </div>
          </div>
          <div className={cl.btn}>
            <MyButton onClick={handleInfo} text={`Войти`} />
          </div>
        </form>
      </div>
      ({modal && <Modal text={text} />})
    </>
  );
};

export default FormLogin;
