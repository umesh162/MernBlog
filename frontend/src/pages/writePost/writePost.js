import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

require("./writePost.css");

const WritePost = () => {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handlePost = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title: title,
      description: description,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.photo = fileName;
      await axios.post("/upload", data).catch((err) => {
        console.log("error in upload");
      });
    }
    await axios
      .post("/posts", newPost)
      .then((resp) => window.location.replace("/post/" + resp.data.post._id))
      .catch((err) => {
        console.log("error in posting article");
      });
  };
  return (
    <div className="write">
      {file && (
        <img className="uploadedImage" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writePost" onSubmit={handlePost}>
        <div className="group">
          <label htmlFor="fileInput">
            <i className="icon fas fa-plus" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="formInput"
            autoFocus={true}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="group">
          <textarea
            placeholder="Tell your Story!"
            type="text"
            className="formInput description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button className="formPost">Post</button>
      </form>
    </div>
  );
};

export default WritePost;