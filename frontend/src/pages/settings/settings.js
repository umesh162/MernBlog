import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

const { default: SideBar } = require("../../Components/sideBar/sideBar");

require("./settings.css");

const Settings = () => {
  const [file, setFile] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);

  const { user, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedUser.profilePic = fileName;
      await axios.post("/upload", data).catch((err) => {
        console.log("error in upload");
      });
    }
    await axios
      .put("/users/" + user._id, updatedUser)
      .then(
        (resp) => dispatch({ type: "UPDATE_SUCCESS", payload: resp.data }),
        setUpdated(true)
      )
      .catch(() => dispatch({ type: "UPDATE_FAILURE" }));
  };
  const ImageLink = "http://localhost:8000/images/";
  return (
    <div className="settings">
      <div className="wrapper">
        <div className="settingsTitle">
          <span className="updateProfile">Update Profile</span>
          <span className="deleteProfile">Delete Profile</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="profilePic">
            <img
              src={
                user.profilePic
                  ? ImageLink + user.profilePic + ".jpg"
                  : ImageLink + "default.png"
              }
              alt=""
            />
            <label htmlFor="picInput">
              <i className="profileIputIcon far fa-user-circle" />
            </label>
            <input
              id="picInput"
              className="picInput"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            ></input>
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            name="name"
          ></input>
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="updateButton" type="submit">
            Update
          </button>
          {updated && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              UserProfile updated successfully
            </span>
          )}
        </form>
      </div>

      <SideBar />
    </div>
  );
};

export default Settings;