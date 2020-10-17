import swnPNG from "../resources/images/swn.png";
import swpPNG from "../resources/images/swp.png";
import powerSourcePNG from "../resources/images/power_source.png";
import outputReaderPNG from "../resources/images/output_reader.png";
import selectedSwnPNG from "../resources/images/selected_swn.png";
import selectedSwpPNG from "../resources/images/selected_swp.png";
import selectedPowerSourcePNG from "../resources/images/selected_power_source.png";
import selectedOutputReaderSourcePNG from "../resources/images/selected_output_reader.png";

const GRID_SIZE = 20;

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
];

export const snapToGrid = (position) => {
  let x = Math.ceil(position.x);
  let y = Math.ceil(position.y);

  let remainderX = x % GRID_SIZE;
  let remainderY = y % GRID_SIZE;

  position.x = x - remainderX;
  position.y = y - remainderY;

  return position;
};
