import Loader from "../Loader/Loader";
import Post from "../Post/Post";

const PostLoading = ({ loader, data, classname, refPosts }) => {
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className={classname} ref={refPosts}>
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
      )}
    </>
  );
};

export default PostLoading;
