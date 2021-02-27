import React, { useRef, useState } from "react";
import {
  onDragStart as labelOnDragStart,
  onDragMove as labelOnDragMove,
  onDragEnd as labelOnDragEnd,
  SpriteLabel,
} from "../../models/SpriteLabel";
import "./styles.css";

const ComponentLabel = ({ circuitComponent, componentRef }) => {
  const labelRef = useRef();
  const [relativePosition, setRelativePosition] = useState(null);

  const handleOnDragEnd = () => {
    const globalPosition = labelOnDragEnd(labelRef.current);

    const relativeX =
      globalPosition.x - componentRef.current.transform.worldTransform.tx;
    const relativeY =
      globalPosition.y - componentRef.current.transform.worldTransform.ty;

    setRelativePosition({ x: relativeX, y: relativeY });
  };

  return (
    <SpriteLabel
      ref={labelRef}
      componentRef={componentRef}
      kind={circuitComponent.kind.kind}
      text={circuitComponent.label}
      interactive={true}
      buttonMode={true}
      relativePosition={relativePosition}
      style={{
        fontSize: 14,
        align: "top-right",
      }}
      pointerdown={labelOnDragStart}
      pointerup={handleOnDragEnd}
      pointerupoutside={handleOnDragEnd}
      pointermove={labelOnDragMove}
    />
  );
};

export default ComponentLabel;
