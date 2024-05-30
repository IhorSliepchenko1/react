const MySelect = (props) => {
  return (
    <div className={props.selectContainer}>
      <span>{props.text}</span>
      <select
        className={props.classname}
        ref={props.selectRef}
        onChange={props.selectChange}
      >
        {props.data.map((item, index) => (
          <option value={item.value} key={index}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MySelect;
