import cl from "./MeSelect.module.scss";

const MySelect = ({ data, selectRef, selectChange }) => {
  return (
    <select className={cl.select} ref={selectRef} onChange={selectChange}>
      {data.map((item, index) => (
        <option value={item.value} key={index}>
          {item.text}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
