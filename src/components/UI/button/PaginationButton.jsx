const PaginationButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={props.classname}
      ref={props.refEl}
    >
      {props.text}
    </button>
  );
};

export default PaginationButton;
