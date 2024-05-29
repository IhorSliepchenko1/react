import cl from "./MyInput.module.scss";

const MyInput = (props) => {
  return (
    <>
      <div className={cl.container}>
        <label htmlFor={props.type} className={cl.label}>
          {`${props.labelText}:`}
        </label>
        <div className={props.inpPassClass}>
          <input
            name={props.type}
            type={props.type}
            className={cl.input}
            ref={props.reference}
          />

          {props.children}
        </div>
      </div>
    </>
  );
};

export default MyInput;
