import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "./api/auth";
import { Home } from "./components/pages/Home";
import { Account } from "./components/pages/Account";
import { AccountList } from "./components/pages/AccountList";
import { AccountEdit } from "./components/pages/AccountEdit";
import { PostList } from "./components/pages/PostList";
import { MyPosts } from "./components/pages/MyPosts";
import { MyLikePosts } from "./components/pages/MyLikePosts";
import { PostShow } from "./components/pages/PostShow";
import { CreatePost } from "./components/pages/CreatePost";
import { SignIn } from "./components/pages/SignIn";
import { SignUp } from "./components/pages/SignUp";
import MainContainer from './components/layouts/MainContainer';
import Header from './components/commons/Header';
import Page404 from './components/pages/NotFound404';

// style
import { CssBaseline } from '@material-ui/core'; //ブラウザの個体差を調整してくれるリセットCSS
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import { theme } from './styles/theme';
import { ChakraProvider } from '@chakra-ui/react';

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

  const Private = ({ children }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Redirect to="/" />;
      }
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);


  return (
    <>

      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ChakraProvider>
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
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route exact path="/signup">
                      <SignUp />
                    </Route>
                    <Route exact path="/signin">
                      <SignIn />
                    </Route>
                    <Private>
                      <Switch>
                        <Route exact path="/users/:id">
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
                          <CreatePost />
                        </Route>
                        <Route exact path="/myposts">
                          <MyPosts />
                        </Route>
                        <Route>
                          <Page404 />
                        </Route>
                        <Route exact path="/notfound404">
                          <Page404 />
                        </Route>
                      </Switch>
                    </Private>
                  </Switch>
                </MainContainer>
              </BrowserRouter>
            </AuthContext.Provider>
          </ChakraProvider>
        </ThemeProvider>
      </StylesProvider>
    </>
  );
}

export default App;
