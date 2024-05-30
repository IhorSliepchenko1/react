const Image = (props) => {
  return (
    <img
      src={props.image}
      alt={props.image}
      onClick={() => props.onclick()}
      className={props.classname}
    />
  );
};

export default Image;
