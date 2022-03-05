import React, { useContext } from "react";
import { SkillModalSC } from "./TutorialSC";
import { useHistory } from "react-router-dom";
import { actions, GlobalContext } from "../../App";

export const SkillModal = ({ isOpen, title, lessonId }) => {
  const history = useHistory();

  const { state, dispatch } = useContext(GlobalContext);

  console.log({ state });

  return (
    <SkillModalSC isOpen={isOpen} className="skill-modal-container skm-pointer">
      <div>
        <div className="skm-start-btn-container">
          <button
            className="skm-start-btn"
            onClick={() => {
              dispatch({
                type: actions.SET_LESSON_PARAMS,
                payload: { level: title, isGame: false, lessonId },
              });

              history.push("/lesson");
            }}
          >
            Lesson
          </button>
        </div>
        <div className="skm-start-btn-container">
          <button
            // onClick={() => history.push("/test")}
            // onClick={() => history.push("/quiz/false")}
            onClick={() => {
              dispatch({
                type: actions.SET_LESSON_PARAMS,
                payload: { level: title, isGame: false, lessonId: "124425" },
              });

              history.push("/quiz");
            }}
            className="skm-start-btn"
          >
            Exercise
          </button>
        </div>
      </div>
    </SkillModalSC>
  );
};
