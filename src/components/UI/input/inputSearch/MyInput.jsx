import cl from "./MyInput.module.scss";

const MyInput = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className={cl.input}
      ref={props.inputRef}
      onInput={() => props.oninput()}
    />
  );
};

export default MyInput;
