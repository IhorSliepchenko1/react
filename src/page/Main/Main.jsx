import cl from "./Main.module.scss";
import { useEffect, useRef, useState, useCallback } from "react";
import { selectData } from "../../components/data/selectData";
import { PostService } from "../../API/PostService.js";
import Post from "../../components/UI/Post/Post";
import Pagination from "../../components/UI/Pagination/Pagination";
import MySelect from "../../components/UI/select/MySelect";
import searcIcon from "./../../../public/search.png";
import MyInput from "../../components/UI/input/inputSearch/MyInput.jsx";
import { useFocus } from "../../hook/useFocus.js";

const Main = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [count, setCount] = useState(0);
  const { handleClickInside, clickRef } = useFocus();
  const selectRef = useRef(null);
  const inputRef = useRef(null);

  const countPosts = useCallback(() => {
    setLimit(selectRef.current.value !== "all" ? +selectRef.current.value : 0);
  }, []);

  const fetchDataLimit = async () => {
    const result = await PostService.getPosts(page, limit);

    setData(result[0]);
    setCount(+result[1]);

    return result;
  };

  const fetchDataAll = async () => {
    const result = await PostService.getAll();
    setData(result[0].data);
    setLimit(0);

    return result;
  };

  const fetchDataSearchUser = async (input) => {
    const result = await PostService.getAll();
    let lengthValue = await input.length;

    const searchResult = result[0].data.filter(
      (user) =>
        user.email.slice(0, lengthValue).toLowerCase() === input.toLowerCase()
    );

    setData(searchResult);
    setLimit(0);
  };

  useEffect(() => {
    limit > 0 ? fetchDataLimit() : fetchDataAll();
  }, [page, limit]);

  return (
    <div>
      <div className={cl.container}>
        <div className={cl.header}>
          <h2 className={cl.numPage}>
            Page # {page} / {limit === 0 ? 1 : Math.ceil(count / limit)}
          </h2>

          <div
            ref={clickRef}
            className={cl.activeFocus}
            onClick={() =>
              handleClickInside(`2px 2px 15px 3px rgba(21, 66, 31, 1)`)
            }
          >
            <MyInput
              type={`text`}
              placeholder={`search by user`}
              inputRef={inputRef}
              oninput={() => fetchDataSearchUser(inputRef.current.value)}
            />
            <img src={searcIcon} alt="searcIcon" className={cl.searcIcon} />
          </div>

          <MySelect
            data={selectData}
            selectRef={selectRef}
            selectChange={() => countPosts()}
          />
        </div>

        <div className={cl.containerPosts}>
          {data.map((item) => (
            <Post
              key={item.id}
              id={item.id}
              name={item.name}
              email={item.email}
              body={item.body}
            />
          ))}
        </div>
        <div style={{ marginTop: 20 }}>
          {limit === 0 ? (
            <></>
          ) : (
            <Pagination
              setPage={setPage}
              count={count}
              limit={limit}
              page={page}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
