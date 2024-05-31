import cl from "./Main.module.scss";
import { useEffect, useRef, useState, useCallback } from "react";
import { selectData } from "../../components/data/selectData";
import { PostService } from "../../API/PostService.js";
import Post from "../../components/UI/Post/Post";
import Pagination from "../../components/UI/Pagination/Pagination";
import Select from "./../../components/UI/select/MySelect.jsx";
import searcIcon from "./../../assets/search.png";
import cross from "./../../assets/cross.png";
import MyInput from "../../components/UI/input/inputSearch/MyInput.jsx";
import { useFocus } from "../../hook/useFocus.js";
import Image from "../../components/UI/img/Image.jsx";
import { useSortedPosts } from "./../../hook/useSorted";

const Main = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState(0);
  const [ceilPage, setCeilPage] = useState(10);

  const { sortedPosts } = useSortedPosts(setData);

  const selectRef = useRef(null);
  const selectRefSort = useRef("");
  const inputRef = useRef(null);
  const clickRef = useRef(null);
  const focus = useFocus(clickRef);

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

  const refreshData = () => {
    inputRef.current.value = "";

    return fetchDataLimit();
  };

  useEffect(() => {
    limit > 0 ? fetchDataLimit() : fetchDataAll();
    selectRefSort.current.value = selectRefSort.current[0].label;
  }, [page, limit]);

  const promiseResultFunc = async () => {
    try {
      let result = await inputRef.current.value.length;

      return result;
    } catch {
      console.log(`await...`);
    }
  };

  useEffect(() => {
    promiseResultFunc().then((res) => {
      setSearchValue(res);
    });
  }, [fetchDataSearchUser]);

  useEffect(() => {
    const result = setTimeout(() => {
      setCeilPage(Math.ceil(count / limit));
    }, 200);

    return () => clearTimeout(result);
  }, [count, limit]);

  return (
    <div>
      <div className={cl.container}>
        <div className={cl.header}>
          <h2 className={cl.numPage}>
            Page #
            <span className={cl.spanNumPage}>
              {ceilPage !== Infinity
                ? `${page} / ${ceilPage}`
                : `${page} / ${page}`}
            </span>
          </h2>

          <div ref={clickRef} className={cl.activeFocus}>
            <MyInput
              type={`text`}
              placeholder={`search by user`}
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

          <div className={cl.selectMain}>
            <Select
              selectContainer={cl.selectContainer}
              text={`sort by`}
              data={selectData[1]}
              selectRef={selectRefSort}
              classname={cl.select}
              selectChange={() =>
                sortedPosts(
                  data,
                  selectRefSort.current.value.split(` `)[0],
                  selectRefSort.current.value.split(` `)[1]
                )
              }
            />
            <Select
              selectContainer={cl.selectContainer}
              text={`count posts`}
              data={selectData[0]}
              selectRef={selectRef}
              classname={cl.select}
              selectChange={() => countPosts()}
            />
          </div>
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
