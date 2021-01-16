import React, { useEffect, useState } from "react";
import { GRID_SIZE } from "../../utils/componentBehaviour";
import GenericLine from "../genericLine";

const createGridLine = (points) => {
  return {
    id: points.join(""),
    points: points,
  };
};

const Grid = ({ stageWidth, stageHeight }) => {
  const [verticalLines, setVerticalLines] = useState([]);
  const [horizontalLines, setHorizontalLines] = useState([]);

  useEffect(() => {
    let verticalLines = [];
    let horizontalLines = [];

    for (let i = 0; i < stageWidth / GRID_SIZE; i++) {
      const points = [i * GRID_SIZE, 0, i * GRID_SIZE, stageHeight];
      verticalLines.push(createGridLine(points));
    }

    for (let i = 0; i < stageHeight / GRID_SIZE; i++) {
      const points = [0, i * GRID_SIZE, stageWidth, i * GRID_SIZE];
      horizontalLines.push(createGridLine(points));
    }

    setVerticalLines(verticalLines);
    setHorizontalLines(horizontalLines);
  }, [stageHeight, stageWidth]);

  return (
    <>
      {verticalLines.map((verticalLine) => (
        <GenericLine key={verticalLine.id} points={verticalLine.points} lineWidth={0.5} lineColor="#737373" lineAlpha={0.5} />
      ))}
      {horizontalLines.map((horizontalLine) => (
        <GenericLine key={horizontalLine.id} points={horizontalLine.points} lineWidth={0.5} lineColor="#737373" lineAlpha={0.5} />
      ))}
    </>
  );
};

export default Grid;
