import "./Post.scss";

const Post = (props) => {
  return (
    <div className={`post-wrapper ${props.classNull || ""}`}>
      <div className="post-wrapper__number">
        <div className="post-wrapper__number-text">
          <span>{props.id}.</span>
          <h3>{props.name}</h3>
        </div>
      </div>

      <div className="post-wrapper__info-slot">
        <div className="post-wrapper__header-post">
          <strong className="post-wrapper__theme">{props.theme}</strong>
          <div className="post-wrapper__mail">
            <strong>User name:</strong> {props.email}
          </div>

          <div className="post-wrapper__body">{props.body}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
