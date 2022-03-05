import React, { useState, useEffect, useReducer, useRef } from "react";
import "antd/dist/antd.css";
import "./App.css";
import "./Components/Quiz/Quiz.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Scoreboard from "./Components/Scoreboard/Scoreboard";
import About from "./Components/About/About";
import NotFound from "./Components/NotFound/NotFound";
import Home from "./Components/Home/Home";
import Quiz from "./Components/Quiz/Quiz";
import EndScreen from "./Components/EndScreen/EndScreen";
import Howtoplay from "./Components/Howtoplay/Howtoplay";
import Example from "./Components/Test";
import Upload from "./Components/TestV1";
import AppUpload from "./Components/upload/AppUpload";
import Tutor from "./Components/Tutor/Tutor";
import TestCenter from "./Components/TestCenter/TestCenter";
import useLocalStorage from "use-local-storage";
import { Tutorial } from "./Components/Tutorial/Tutorial";
import QuoteApp from "./Components/DraggableList/MainDraggable";
import Test from "./Components/Test";
import BIRDS from "vanta/dist/vanta.dots.min.js";
import { WordsTable } from "./Components/WordsTable";
import Profile from "./Components/ProfileInformation/Profile";
// import { Profile } from "./Components/Profile";
// import Profile from "./Components/ProfileInformation/Profile";
export const GlobalContext = React.createContext();

export const actions = {
  SET_LESSON_PARAMS: "SET_LESSON_PARAMS",
  SET_USER: "SET_USER",
  UPDATE_USER: "UPDATE_USER",
};

const initialState = {
  isGame: true,
  level: "",
  lessonId: "",
  searchInput: "",
  user: null,
};

const reducer = (
  state,
  { type, payload: { searchInput, level, isGame, lessonId, user, savedWords } }
) => {
  console.log({ type });
  switch (type) {
    case actions.SET_LESSON_PARAMS:
      console.log("in Toggle is game");
      console.log({ level, isGame, lessonId });

      const updateObject = {};

      if (isGame !== undefined) {
        updateObject.isGame = isGame;
      }

      if (level !== undefined) {
        updateObject.level = level;
      }

      if (lessonId !== undefined) {
        updateObject.lessonId = lessonId;
      }

      if (searchInput !== undefined) {
        updateObject.searchInput = searchInput;
      }

      // searchInput;
      return { ...state, ...updateObject };
    // return { ...state, isGame: true };

    case actions.SET_USER:
      return { ...state, user };
    case actions.UPDATE_USER:
      const newUser = state.user;

      newUser.savedWords = savedWords ? savedWords : newUser.savedWords;

      return { ...state, user: newUser };

    default:
      return state;
  }
};

function App() {
  const [user, setUser] = useState();
  const [quizKey, setQuizKey] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  // const [isThemeChange, setIsThemeChange] = useState(false);

  useEffect(() => {
    // get user from session storage
    // if user check timestamp

    try {
      const currentUser =
        JSON.parse(window.sessionStorage.getItem("currentUser")) ?? null;
      if (currentUser) {
        const valid = Date.now() - currentUser.timeStamp < 12000000;
        console.log({ valid });
        console.log("CURRENT USER AUTHD", currentUser);
        if (valid) {
          console.log("setting current user");
          setUser(currentUser);
          dispatch({ type: actions.SET_USER, payload: { user: currentUser } });
        } else {
          setUser(null);
          console.log("deleting user from storage");
          // window.sessionStorage.deleteItem("currentUser");
        }
      }
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(user ? user.id : null);
    }, 5000);
  });

  // useEffect(() => {
  //   console.log({ vantaEffect, theme });
  //   if (theme === "light") {
  //     if (isThemeChange) {
  //       console.log("light herec");
  //       setVantaEffect(
  //         BIRDS({
  //           el: myRef.current,
  //           color1: "#363537",
  //           color2: "#363537",
  //           backgroundColor: 0xe6e6e6,
  //           //and so on...
  //         })
  //       );
  //       setIsThemeChange(false);
  //     }
  //   } else if (theme === "dark") {
  //     if (isThemeChange) {
  //       console.log("light dark");

  //       setVantaEffect(
  //         BIRDS({
  //           el: myRef.current,
  //           color1: "#e67329",
  //           color2: 0xded7d2,
  //           backgroundColor: "#363537",
  //           //and so on...
  //         })
  //       );
  //       setIsThemeChange(false);
  //     }
  //   }

  //   return () => {
  //     if (vantaEffect) vantaEffect.destroy();
  //   };
  // }, [isThemeChange]);

  const { pathname } = useLocation();
  // console.log({ pathname });
  // const [vantaEffect, setVantaEffect] = useState(0);
  // const myRef = useRef(null);
  // useEffect(() => {
  //   console.log({ vantaEffect, theme });
  //   if (theme === "light") {
  //     if (isThemeChange && !vantaEffect) {
  //       console.log("light herec");
  //       setVantaEffect(
  //         BIRDS({
  //           el: myRef.current,
  //           color1: "#363537",
  //           color2: "#363537",
  //           backgroundColor: 0xe6e6e6,
  //           //and so on...
  //         })
  //       );
  //     }
  //   } else if (theme === "dark") {
  //     if (!vantaEffect) {
  //       console.log("light dark");

  //       setVantaEffect(
  //         BIRDS({
  //           el: myRef.current,
  //           color1: "#e67329",
  //           color2: 0xded7d2,
  //           backgroundColor: "#363537",
  //           //and so on...
  //         })
  //       );
  //     }
  //   }

  //   return () => {
  //     if (vantaEffect) vantaEffect.destroy();
  //   };
  // }, [vantaEffect]);

  return (
    // <Router>
    <GlobalContext.Provider value={{ state, dispatch }}>
      <div className={`app`} data-theme={theme}>
        {/* ref={myRef} */}
        <Navbar user={user} setUser={setUser} />
        <div
          className={`content ${
            pathname === "/quiz" ||
            pathname === "/tutor" ||
            pathname === "/Profile"
              ? "height-auto"
              : ""
          }`}
        >
          <Switch>
            <Route exact path="/">
              <Home
                user={user}
                theme={theme}
                setTheme={setTheme}
                // setIsThemeChange={setIsThemeChange}
              />
            </Route>
            <Route path="/signup">
              <Signup user={user} setUser={setUser} />
            </Route>
            <Route path="/login">
              <Login user={user} setUser={setUser} />
            </Route>
            <Route path="/about">
              <About user={user} />
            </Route>
            <Route path="/howtoplay">
              <Howtoplay />
            </Route>
            <Route path="/tutor">
              <Tutor />
            </Route>
            <Route path="/testCenter">
              <TestCenter />
            </Route>
            <Route path="/endscreen">
              <EndScreen user={user} />
            </Route>
            <Route path="/leaderboard">
              <Scoreboard user={user} />
            </Route>
            {/* <Route path="/Profile">
              <Profile user={user} />
            </Route> */}
            <Route path="/Profile">
              {/* <ConstructSentence user={user} /> */}
              <Profile user={user} />
              {/* <QuoteApp /> */}
            </Route>
            <Route path="/tutorial">
              <Tutorial user={user} />
            </Route>
            <Route path="/lesson">
              <WordsTable user={user} />
            </Route>
            <Route path="/quiz">
              <Quiz
                key={quizKey}
                reset={() => setQuizKey((prevState) => prevState + 1)}
                user={user}
              />
            </Route>
            {/* Tutorial */}
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </GlobalContext.Provider>
    // </Router>
  );
}

export default App;
