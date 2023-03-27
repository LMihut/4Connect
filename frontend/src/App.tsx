import React, { useEffect, useContext } from "react";
import { AuthProvider, authContext } from "./context/AuthenticationContext";
import "./App.css";
import { HelpPage } from "./pages/HelpPage/HelpPage";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { NewgamePage } from "./pages/NewgamePage/NewgamePage";
import { SettingsPage } from "./pages/SettingsPage/SettingsPage";
import { OfflineGamePage } from "./pages/OfflineGamePage/OfflineGamePage";
import { ThemeProvider } from "styled-components";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
//import { GlobalStyle } from "./components/GlobalStyle";
import { LoginPage } from "./pages/Login/LoginPage";
import { RegisterPage } from "./pages/Register/RegisterPage";
import { GamePage } from "./pages/GamePage/GamePage";
import { SocketProvider } from "./context/socket.context";
import usePersistedState from "./utils/usePersistedState";
import light from "./styles/themes/light";
import dark from "./styles/themes/dark";
import GlobalStyle from "./styles/global";
import { DefaultTheme } from "styled-components";

export const BasePage = () => {
  const { token } = useContext(authContext);
  if (token) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Redirect to="/login" />;
  }
};

const UnauthenticatedRoute: React.FC<RouteProps> = ({
  children,
  ...routeProps
}) => {
  const { token } = useContext(authContext);
  if (token === null) {
    return <Route {...routeProps} />;
  }
  return <Redirect to="/" />;
};

const AuthenticatedRoute: React.FC<RouteProps> = ({
  children,
  ...routeProps
}) => {
  const {
    token,
    actions: { getTokenData, logout },
  } = useContext(authContext);
  if (token !== null) {
    const tokenData = getTokenData();
    if (tokenData !== null) {
      const { exp } = tokenData;
      if (parseInt(exp) * 1000 > Date.now()) {
        return <Route {...routeProps} />;
      }
      logout();
    }
  }
  return <Redirect to="/" />;
};

export const App = () => {
  useEffect(() => {
    (async function () {
      const helloRequest = await fetch("/api");
      const helloJson = await helloRequest.json();
      console.log(helloJson);
    })();
  });

  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", light);

  const toggleThemeInParent = (t: string) => {
    setTheme(t === "light" ? dark : light);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <SocketProvider>
            <GlobalStyle />
            <Switch>
              <UnauthenticatedRoute exact path="/login" component={LoginPage} />
              <UnauthenticatedRoute
                exact
                path="/register"
                component={RegisterPage}
              />
              <AuthenticatedRoute
                exact
                path="/dashboard"
                component={DashboardPage}
              />
              <AuthenticatedRoute
                exact
                path="/newgame"
                component={NewgamePage}
              />
              <AuthenticatedRoute exact path="/game" component={GamePage} />
              <AuthenticatedRoute
                  exact
                  path="/offline_game"
                  component={OfflineGamePage}
              />
              <AuthenticatedRoute exact path="/help" component={HelpPage} />
              <AuthenticatedRoute
                exact
                path="/settings"
                component={() => {
                  return (
                    <SettingsPage
                      providerSetTheme={toggleThemeInParent}
                    ></SettingsPage>
                  );
                }}
              />
              <Route path="/" component={BasePage}></Route>
            </Switch>
          </SocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
