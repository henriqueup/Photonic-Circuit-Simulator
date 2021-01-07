import MainMenuButton from "../models/MainMenuButton";
import MainMenuButtonItem from "../models/MainMenuButtonItem";
import { store } from "../store";
import api from "../api";
import {
  attemptSave,
  create as createCircuit,
  load as loadCircuit,
} from "../store/ducks/circuit";

const FileButton = MainMenuButton("File", [
  MainMenuButtonItem(
    "New Circuit",
    () => store.dispatch(createCircuit())
  ),

  MainMenuButtonItem(
    "Save Circuit",
    () => {
      if (!store.getState().circuit.current.isSaved) {
        store.dispatch(attemptSave());
      }
    },
  ),
  
  MainMenuButtonItem(
    "Save As Custom Component",
    () => console.log("Create custom component"),
  ),

  MainMenuButtonItem(
    "Load Circuit",
    () => null,
    true,
    async () => {
      const response = await api.listCircuits();
      if (response.ok) {
        const circuits = response.body;
        return circuits.map((circuit) => (circuit = { name: circuit.label, id: circuit.id, onClick: (id) => store.dispatch(loadCircuit(id)) }));
      } else {
        return [];
      }
    },
  ),
]);

const EditButton = MainMenuButton("Edit", [
  MainMenuButtonItem(
    "Remove Component",
    () => console.log("Delete selected component")
  )
]);

export {FileButton, EditButton};