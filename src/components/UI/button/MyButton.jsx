import cl from "./MyButton.module.scss";

const MyButton = (props) => {
  return (
    <button className={cl.btn_Login} onClick={() => props.onClick()}>
      Войти
    </button>
  );
};

export default MyButton;
