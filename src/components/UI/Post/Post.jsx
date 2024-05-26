import "./Post.scss";

const Post = (props) => {
  return (
    <div className="post-wrapper">
      <div className="post-wrapper__number">{props.id}</div>

      <div className="post-wrapper__info-slot">
        <div className="post-wrapper__header-post">
          <strong className="post-wrapper__theme">{props.theme}</strong>
          <div className="post-wrapper__mail">
            <strong>Mail:</strong> {props.email}
          </div>

          <div className="post-wrapper__body">{props.body}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
