import SinglePost from "../../Components/singlePost/singlePost";

const { default: SideBar } = require("../../Components/sideBar/sideBar");

require("./single.css");
const Single = () => {
  return (
    <div className="single">
      <SinglePost />
      <SideBar  />
    </div>
  );
};

export default Single;