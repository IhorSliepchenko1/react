import MyInput from "../UI/input/inputLogin/MyInput";
import cl from "./FormLogin.module.scss";
import MyButton from "../UI/button/MyButton";
import CloseEye from "./assets/CloseEye";
import OpenEye from "./assets/OpenEye";
import { useState } from "react";
import { useVerification } from "../../hook/useVerification";
import { user } from "../data/loginData";
import LoginModal from "../UI/Modals/LoginModal";

const FormLogin = () => {
  const [open, setOpen] = useState(false);
  const { login, password, handleInfo, modal, text } = useVerification(user);

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
                inpPassClass={cl.inpPassClass}
                labelText={`Password`}
                reference={password}
                children={
                  <span className={cl.icon} onClick={handleClick}>
                    {open ? <CloseEye /> : <OpenEye />}
                  </span>
                }
              />
            </div>
          </div>
          <div className={cl.btn}>
            <MyButton onClick={handleInfo} text={`Login`} />
          </div>
        </form>
      </div>
      {modal && <LoginModal text={text} />}
    </>
  );
};

export default FormLogin;
