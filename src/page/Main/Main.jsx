import cl from "./Main.module.scss";
import { useEffect, useRef, useState, useCallback } from "react";
import { selectData } from "../../components/data/selectData";
import { PostService } from "../../API/PostService.js";

import NavBar from "../../components/NavBar/NavBar";
import Post from "../../components/UI/Post/Post";
import Pagination from "../../components/UI/Pagination/Pagination";
import MySelect from "../../components/UI/select/MySelect";

const Main = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [count, setCount] = useState(0);

  const selectRef = useRef(null);

  const countPosts = useCallback(() => {
    setLimit(selectRef.current.value !== "all" ? +selectRef.current.value : 0);
  }, []);

  const fetchDataLimit = async () => {
    const result = await PostService.getPosts(page, limit);
    setData(result[0]);
    setCount(+result[1]);
  };

  const fetchDataAll = async () => {
    const result = await PostService.getAll();
    setData(result[0].data);
    setLimit(0);
  };

  useEffect(() => {
    limit > 0 ? fetchDataLimit() : fetchDataAll();
  }, [page, limit]);

  return (
    <div>
      {/* <NavBar /> */}
      <div className={cl.container}>
        <div className={cl.header}>
          <h2 className={cl.numPage}>
            Page # {page} / {limit === 0 ? 1 : Math.ceil(count / limit)}
          </h2>

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
            <Pagination setPage={setPage} count={count} limit={limit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
