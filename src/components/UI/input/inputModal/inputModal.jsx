const InputModal = (props) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      className={props.classname}
    />
  );
};

export default InputModal;
