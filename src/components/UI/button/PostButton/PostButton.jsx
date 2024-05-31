import cl from "./PostButton.module.scss";
const PostButton = ({ setModal }) => {
  return (
    <button className={cl.button} onClick={() => setModal((open) => !open)}>
      add post
    </button>
  );
};

export default PostButton;
