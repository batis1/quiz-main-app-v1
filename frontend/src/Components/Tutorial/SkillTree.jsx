import axios from "axios";
import React, { useEffect, useState } from "react";
import apiList from "../../lib/apiList";
import { LessonsContainer } from "./LessonsContainer";

export const SkillTree = () => {
  const lessonsContainerV2 = [
    [{ title: "Basics 1", iconStyle: "bscs1" }],
    [
      { title: "Greetings", iconStyle: "grtngs" },
      { title: "Basics 2", iconStyle: "bscs2" },
    ],
  ];

  const [lessonsContainer, setLessonsContainer] = useState([]);

  useEffect(() => {
    (async () => {
      const {
        data: { docs },
      } = await axios.get(apiList.lessons);

      const newLessons = [];
      const limit = [1, 2, 3];

      for (let index = 0; index < docs.length; index++) {
        const element = docs[index];
        newLessons.push([element]);
      }
      console.log(newLessons);
      setLessonsContainer(newLessons);
      // console.log(docs);
    })();
  }, []);

  return (
    <div className="skill-tree">
      {lessonsContainer.map((item) => (
        <LessonsContainer lessons={item} />
      ))}
    </div>
  );
};
