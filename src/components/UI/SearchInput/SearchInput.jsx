import cl from "./SearchInput.module.scss";
import Image from "../img/Image";
import MyInput from "../input/inputSearch/MyInput";
import searcIcon from "./../../../assets/search.png";
import cross from "./../../../assets/cross.png";

const SearchInput = ({
  searchValue,
  fetchDataSearchUser,
  inputRef,
  refreshData,
  clickRef,
}) => {
  return (
    <div ref={clickRef} className={cl.activeFocus}>
      <MyInput
        type={`text`}
        placeholder={`search by user name`}
        inputRef={inputRef}
        oninput={() => fetchDataSearchUser(inputRef.current.value)}
      />

      <Image
        image={searchValue > 0 ? cross : searcIcon}
        onclick={() =>
          searchValue > 0 ? refreshData() : console.log("click user icon")
        }
        classname={cl.searcIcon}
      />
    </div>
  );
};

export default SearchInput;
