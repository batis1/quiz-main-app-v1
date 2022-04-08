import { useState, useEffect, useContext } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import "./Navbar.css";
import { DropdownOptions } from "../DropdownOptions/DropdownOptions";
import { Input } from "antd";
import { actions, GlobalContext } from "../../App";
import Logo from "../Logo/Logo";

const { Search } = Input;

const Navbar = ({ user, setUser }) => {
  const useBigLogo = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => {
        setMatches(media.matches);
      };
      media.addListener(listener);
      return () => media.removeListener(listener);
    }, [matches, query]);

    return matches;
  };

  let isPageWide = useBigLogo("(min-width: 1000px)");

  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const handleToggle = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);
  const options = [
    { value: "GAME", to: "/quiz" },
    { value: "TUTORIAL", to: "/tutorial" },
    { value: "SAVED WORDS", to: "" },
  ];

  const {
    // state: { user },
    _,
    dispatch,
  } = useContext(GlobalContext);

  const history = useHistory();
  const handleOnSearch = (value) => {
    dispatch({
      type: actions.SET_LESSON_PARAMS,
      payload: { lessonId: "", searchInput: value },
    });

    history.push("/lesson");
    console.log(value);
    setSearchInput("");
  };

  const { pathname } = useLocation();

  return (
    <header>
      {/* {isPageWide ? (
        <Logo type="dark" className="logo" />
      ) : (
        <Logo type="horizontal" className="logo" />
      )} */}
      <Logo />
      {user && pathname === "/" && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            style={{
              width: "430px",
              marginLeft: "0.2rem",
              marginRight: "0.3rem",
            }}
            className="form-input"
            placeholder="search for words by hanzi..."
            value={searchInput}
            onSearch={handleOnSearch}
            onChange={(e) => setSearchInput(e.target.value)}
            enterButton="Search"
            // onClick={handleOnSearch}
          />
        </div>
      )}

      <nav className="navbar">
        <button onClick={handleToggle}>
          {menuOpen ? (
            <CloseOutlined className="navbar-icon" />
          ) : (
            <MenuOutlined className="navbar-icon" />
          )}
        </button>
        <div className={`menuNav ${menuOpen ? "showMenu" : ""}`}>
          <NavLink
            exact
            to="/"
            className="navbar-item"
            activeClassName="navbar-selected"
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <DropdownOptions options={options} className="navbar-item" />
          {/* <NavLink
            to="/quiz/true"
            className="navbar-item"
            activeClassName="navbar-selected"
            onClick={closeMenu}
          >
            Quiz
          </NavLink> */}
          <NavLink
            to="/leaderboard"
            className="navbar-item"
            activeClassName="navbar-selected"
            onClick={closeMenu}
          >
            Score board
          </NavLink>

          {/* <NavLink
            to="/howtoplay"
            className="navbar-item"
            activeClassName="navbar-selected"
            onClick={closeMenu}
          >
            Test
          </NavLink>
          <NavLink
            to="/howtoplay"
            className="navbar-item"
            activeClassName="navbar-selected"
            onClick={closeMenu}
          >
            result analysis
          </NavLink> */}
          {/* <NavLink
            to="/testCenter"
            className="navbar-item"
            activeClassName="navbar-selected"
            onClick={closeMenu}
          >
            Test center
          </NavLink> */}
          {/* <NavLink
            to="/howtoplay"
            className="navbar-item"
            activeClassName="navbar-selected"
            onClick={closeMenu}
          >
            hsk dictionary
          </NavLink> */}
          <NavLink
            to="/tutor"
            className="navbar-item"
            activeClassName="navbar-selected"
            onClick={closeMenu}
          >
            Tutor
          </NavLink>
          <NavLink
            to="/hskOcR"
            className="navbar-item"
            activeClassName="navbar-selected"
            onClick={closeMenu}
          >
            HSK OCR
          </NavLink>
          <NavLink
            to="/about"
            className="navbar-item"
            activeClassName="navbar-selected"
            onClick={closeMenu}
          >
            About
          </NavLink>

          <NavLink
            to="/howtoplay"
            className="navbar-item"
            activeClassName="navbar-selected"
            onClick={closeMenu}
          >
            {/* How to play */}
            HELP
          </NavLink>
          {user && (
            <NavLink
              to="/Profile"
              className="navbar-item"
              activeClassName="navbar-selected"
              onClick={closeMenu}
            >
              {/* How to play */}
              PROFILE
            </NavLink>
          )}

          {!user ? (
            <NavLink
              to="/login"
              className="navbar-item"
              activeClassName="navbar-selected"
              onClick={closeMenu}
            >
              Log In
            </NavLink>
          ) : (
            <NavLink
              to="/"
              className="navbar-item"
              activeClassName="navbar-selected"
              onClick={() => {
                closeMenu();
                setUser(null);
                sessionStorage.clear();
                dispatch({
                  type: actions.SET_USER,
                  payload: { user: null },
                });
              }}
            >
              Log Out
            </NavLink>
          )}
        </div>
        {/* <div>
        <span style={{ color: "yellow" }}>☀︎</span>
        <div className="switch-checkbox">
          <label className="switch">
            <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
            <span className="slider round"> </span>
          </label>
        </div>
        <span style={{ color: "blue" }}>☽</span>
      </div> */}
      </nav>
    </header>
  );
};

export default Navbar;
