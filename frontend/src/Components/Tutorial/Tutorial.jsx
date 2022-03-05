import React from "react";
// import { GlobalStyle } from "../../GlobalStyle";
import { SkillTree } from "./SkillTree";
import { MainWrapper } from "./TutorialSC";

export const Tutorial = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MainWrapper>
        <>
          {/* <GlobalStyle /> */}
          <SkillTree />
        </>
      </MainWrapper>
    </div>
  );
};
