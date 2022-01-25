
  
const { Link } = require("react-router-dom");

require("./post.css");
const Post = ({ data }) => {
  const ImageLink = "http://localhost:8000/images/"
  return (
    <div className="Posts">
      {data.photo && (
        <img className="postImage" src={ImageLink + data.photo +".jpg"} alt="postImage" />
      )}
      <div className="postInfo">
        <div className="categories">
          {data.categories.map((cate,key)=>(
            <span className="category" key={key}>{cate.name}</span>
          ))}
        </div>
          <Link className="link" to={`/post/${data._id}`}>
          <span className="title"> {data.title}  </span>
          </Link>
       
        <hr />
        <span className="postDate">
          {new Date(data.createdAt).toDateString()}
        </span>
      </div>
      <p className="description">{data.description}</p>
    </div>
  );
};

export default Post;