import NavBar from "./Components/navBar/NavBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Settings from "./pages/settings/settings";
import Single from "./pages/single/single";
import WritePost from "./pages/writePost/writePost";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

const App = () => {
  const {user} = useContext(Context);
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={user ? Home : Register} />
        <Route path="/login" component={user ? Home : Login} />
        <Route path="/write" component={user ? WritePost : Login} />
        <Route path="/settings" component={user ? Settings : Login} />
        <Route path="/post/:postId" component={Single} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;