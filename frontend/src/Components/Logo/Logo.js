import { ReactComponent as LightLogo } from "./light.svg";
import { ReactComponent as DarkLogo } from "./dark.svg";
import { ReactComponent as HorizontalLogo } from "./horizontal.svg";
import light3 from "./7.png";
import { Link } from "react-router-dom";
import "./LogoStyle.css";

// import LogoTemp from "logoTemp.css";
const Logo = ({ size, type }) => {
  const logos = {
    // light: <LightLogo />,
    // dark: <DarkLogo />,
    // horizontal: <HorizontalLogo />,
  };
  // return <img src={light3} alt="light3" />;
  // return <div>{logos[type]}</div>;
  return (
    <div className="logoStyle">
      {/* <Link to="/"> */}
      <span>LOGO</span>
      {/* </Link> */}
    </div>
  );
};

export default Logo;
