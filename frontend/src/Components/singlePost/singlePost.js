import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";

require("./singlePost.css");
const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setupdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    window.scrollTo(0,0)

    getPost();
  }, [path]);

  const deletePost = async () => {
    await axios
      .delete(`/posts/${path}`, {
        data: { username: user.username },
      })
      .then(() => window.location.replace("/"))
      .catch(() => console.log("error in deletePost"));
  };

  const updatePost = async () => {
    await axios
      .put(`/posts/${path}`, {
        username: user.username,
        title,
        description,
      })
      .then(() => setupdateMode(false))
      .catch(() => console.log("error in updatePost"));
  };
  
  const ImageLink = "http://localhost:8000/images/";
  return (
    <div className="singlePost">
      <div className="wrapper">
        {post.photo && (
          <img
            className="postImage"
            src={ImageLink + post.photo + ".jpg"}
            alt=""
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="postTitleEdit"
            autoFocus
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h1 className="postTitle">
            {title}
            {user?.username === post.username && (
              <div className="EditButtons">
                <i
                  className="editIcon far fa-edit"
                  onClick={() => setupdateMode(true)}
                />
                <i className="editIcon far fa-trash-alt" onClick={deletePost} />
              </div>
            )}
          </h1>
        )}

        <div className="PostInfo">
          <span>
            Author :
            <Link to={`/?user=${post.username}`} className="link">
              <b className="author">{post.username}</b>
            </Link>
          </span>
          <span className="Date">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <input
            value={description}
            className="postDescriptionEdit"
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <div className="postDescription">{description}</div>
        )}
        {updateMode && (
          <div className="updateButtonDiv">
            <button
              className="discardPostButton"
              onClick={() => {
                setupdateMode(false);
              }}
            >
              Discard
            </button>
            <button className="updatePostButton" onClick={updatePost}>
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;