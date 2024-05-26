
const PaginationButton = (props) => {
  return (
    <button
      onClick={() => {
        props.func(props.item);
      }}
      className={props.classname}
      ref={props.refEl}
    >
      {props.text}
    </button>
  );
};

export default PaginationButton;
