import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import Post from "../../components/UI/Post/Post";
import { URL_POSTS } from "../../config/api";
import cl from "./Main.module.scss";
import Pagination from "../../components/UI/Pagination/Pagination";

const getData = async (page, limit) => {
  try {
    const response = await axios.get(URL_POSTS(page, limit));
    const count = await response.headers["x-total-count"];

    return [response.data, count];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Main = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 50;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(page, limit);
      setData(result[0]);
      setCount(+result[1]);
    };

    fetchData();
  }, [page]);

  return (
    <div>
      <NavBar />
      <div className={cl.container}>
        <div className={cl.header}>
          <h2 className={cl.numPage}>
            Page # {page} / {count / limit}
          </h2>

          <select name="count">
            <option value="">Count posts</option>
            <option value="50">50</option>
            <option value="30">30</option>
            <option value="10">10</option>
          </select>
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
        <Pagination setPage={setPage} count={count} limit={limit} />
      </div>
    </div>
  );
};

export default Main;
