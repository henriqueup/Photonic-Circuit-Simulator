import swnPNG from "../resources/images/swn.png";
import swpPNG from "../resources/images/swp.png";
import powerSourcePNG from "../resources/images/power_source.png";
import outputReaderPNG from "../resources/images/output_reader.png";
import yJunctionPNG from "../resources/images/y_junction.png";
import ySplitPNG from "../resources/images/y_split.png";
import selectedSwnPNG from "../resources/images/selected_swn.png";
import selectedSwpPNG from "../resources/images/selected_swp.png";
import selectedPowerSourcePNG from "../resources/images/selected_power_source.png";
import selectedOutputReaderSourcePNG from "../resources/images/selected_output_reader.png";
import selectedYJunctionPNG from "../resources/images/selected_y_junction.png";
import selectedYSplitPNG from "../resources/images/selected_y_split.png";

export const GRID_SIZE = 20;

export const componentSizes = {
  swn: {
    height: 80,
    width: 80,
  },
  swp: {
    height: 80,
    width: 80,
  },
  power_source: {
    height: 40,
    width: 40,
  },
  output_reader: {
    height: 20,
    width: 80,
  },
  port: {
    height: 18,
    width: 18,
  },
  y_junction: {
    height: 80,
    width: 80,
  },
  y_split: {
    height: 80,
    width: 80,
  },
};

export const basicKinds = [
  {
    name: "Switch N",
    kind: "swn",
    image: swnPNG,
    alternateImage: selectedSwnPNG,
  },
  {
    name: "Switch P",
    kind: "swp",
    image: swpPNG,
    alternateImage: selectedSwpPNG,
  },
  {
    name: "Power Source",
    kind: "power_source",
    image: powerSourcePNG,
    alternateImage: selectedPowerSourcePNG,
  },
  {
    name: "Output Reader",
    kind: "output_reader",
    image: outputReaderPNG,
    alternateImage: selectedOutputReaderSourcePNG,
  },
  {
    name: "Y Junction",
    kind: "y_junction",
    image: yJunctionPNG,
    alternateImage: selectedYJunctionPNG,
  },
  {
    name: "Y Split",
    kind: "y_split",
    image: ySplitPNG,
    alternateImage: selectedYSplitPNG,
  },
];

export const snapToGrid = (position) => {
  let x = Math.ceil(position.x);
  let y = Math.ceil(position.y);

  let remainderX = x % GRID_SIZE;
  let remainderY = y % GRID_SIZE;

  if (remainderX > 10) {
    position.x = x + (GRID_SIZE - remainderX);
  } else {
    position.x = x - remainderX;
  }

  if (remainderY > 10) {
    position.y = y + (GRID_SIZE - remainderY);
  } else {
    position.y = y - remainderY;
  }

  return position;
};
