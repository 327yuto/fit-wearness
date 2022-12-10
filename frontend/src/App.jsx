import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "./api/auth";
import { Home } from "./components/pages/Home";
import { Account } from "./components/pages/Account";
import { AccountList } from "./components/pages/AccountList";
import { AccountEdit } from "./components/pages/AccountEdit";
import { PostList } from "./components/pages/PostList";
import { MyLikePosts } from "./components/pages/MyLikePosts";
import { PostShow } from "./components/pages/PostShow";
import { CreatPost } from "./components/pages/CreatPost";
import { SignIn } from "./components/pages/SignIn";
import { SignUp } from "./components/pages/SignUp";
import MainContainer from './components/layouts/MainContainer'; //export defaultしている
import Header from './components/commons/Header';

// style
import { CssBaseline } from '@material-ui/core'; //ブラウザの個体差を調整してくれるリセットCSS
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import { theme } from './styles/theme';

// Contextの作成
export const AuthContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
        console.log("sign in user");
      } else {
        console.log("no current user");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  const Private = ({ children }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Redirect to="/signin" />;
      }
    } else {
      return <></>;
    }
  };
  return (
    <>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <AuthContext.Provider
            value={{
              loading,
              setLoading,
              isSignedIn,
              setIsSignedIn,
              currentUser,
              setCurrentUser,
            }}
          >
            <CssBaseline />

            <BrowserRouter>
              <Header />
              <MainContainer>
                <Switch>
                  <Route exact path="/signup">
                    <SignUp />
                  </Route>
                  <Route exact path="/signin">
                    <SignIn />
                  </Route>
                  <Private>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route exact path="/users/:id">
                      {/*このpathが呼ばれた時、下のpageを呼ぶ*/}
                      <Account />
                    </Route>
                    <Route exact path="/users">
                      <AccountList />
                    </Route>
                    <Route exact path="/edit/:id">
                      <AccountEdit />
                    </Route>
                    <Route exact path="/posts">
                      <PostList />
                    </Route>
                    <Route exact path="/mylikeposts">
                      <MyLikePosts />
                    </Route>
                    <Route exact path="/posts/:id">
                      <PostShow />
                    </Route>
                    <Route exact path="/create/post">
                      <CreatPost />
                    </Route>
                  </Private>
                </Switch>
              </MainContainer>
            </BrowserRouter>
          </AuthContext.Provider>
        </ThemeProvider>
      </StylesProvider>
    </>
  );
}

export default App;
