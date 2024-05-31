import cl from "./Main.module.scss";
import { useEffect, useRef, useState, useCallback, useContext } from "react";
import { selectData } from "../../components/data/selectData";
import { PostService } from "../../API/PostService.js";
import Pagination from "../../components/UI/Pagination/Pagination";
import Select from "./../../components/UI/select/MySelect.jsx";
import { useFocus } from "../../hook/useFocus.js";
import { useSortedPosts } from "./../../hook/useSorted";
import PostLoading from "../../components/UI/PostLoading/PostLoading.jsx";
import SearchInput from "../../components/UI/SearchInput/SearchInput.jsx";
import PostButton from "../../components/UI/button/PostButton/PostButton.jsx";
import PostModal from "../../components/UI/Modals/PostModal/PostModal.jsx";
// import ProviderData from "../../context/ProviderData/ProviderData.js";
// import DataContext from "../../context/DataContext.js";

const Main = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState(0);
  const [loader, setLoader] = useState(false);
  const { sortedPosts } = useSortedPosts(setData);
  const [modal, setModal] = useState(false);

  // const valueContext = useContext(DataContext);
  const selectRef = useRef(null);
  const selectRefSort = useRef(null);
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
    setLoader(true);

    setTimeout(() => {
      limit > 0 ? fetchDataLimit() : fetchDataAll();
      selectRefSort.current.value = selectRefSort.current[0].label;
      setLoader(false);
    }, 1000);
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
    modal
      ? document.body.classList.add(`no-scrol`)
      : document.body.classList.remove(`no-scrol`);
  }, [modal]);

  return (
    <div className={cl.wrapper}>
      {modal && (
        <PostModal onclick={() => setModal((prev) => !prev)} data={data} />
      )}
      <div className={cl.container}>
        <div className={cl.header}>
          <div className={cl.l_headerContainer}>
            <SearchInput
              searchValue={searchValue}
              fetchDataSearchUser={fetchDataSearchUser}
              inputRef={inputRef}
              refreshData={refreshData}
              clickRef={clickRef}
            />

            <PostButton setModal={setModal} data={data} />
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

        <PostLoading
          loader={loader}
          data={data}
          classname={cl.containerPosts}
        />
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
  );
};

export default Main;
