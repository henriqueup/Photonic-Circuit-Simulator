import swnPNG from "../resources/images/swn.png";
import swpPNG from "../resources/images/swp.png";
import powerSourcePNG from "../resources/images/power_source.png";
import selectedSwnPNG from "../resources/images/selected_swn.png";
import selectedSwpPNG from "../resources/images/selected_swp.png";
import selectedPowerSourcePNG from "../resources/images/selected_power_source.png";

const GRID_SIZE = 18;

export const componentSizes = {
  swn: 80,
  swp: 80,
  power_source: 40,
};

export const basicKinds = [
  {
    name: "Switch N",
    kind: "swn",
    image: swnPNG,
    alternateImage: selectedSwnPNG
  },
  {
    name: "Switch P",
    kind: "swp",
    image: swpPNG,
    alternateImage: selectedSwpPNG
  },
  {
    name: "Power Source",
    kind: "power_source",
    image: powerSourcePNG,
    alternateImage: selectedPowerSourcePNG
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
