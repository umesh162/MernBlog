require('./Header.css')
const Header = () => {
  const ImageLink = "http://localhost:8000/images/"
  return (
    <div className="header">
      <div className="headerTitle">
        <span className="headerTitleSmall">React and Node</span>
        <span className="headerTitleLarge">Blog</span>
      </div>
      <img
        className="headerImage"
        src={ImageLink+"blog.jpg"}
        alt="headerImage"
      />
    </div>
  );
};

export default Header;