import RoutesConfig from "@routes/RoutesConfig";
import { useSelector } from "react-redux";
import { StoreType } from "./stores";

export default function App() {
  const userStore = useSelector((store: StoreType) => store.userStore);
  console.log("userStore", userStore);
  return (
    <>
      <RoutesConfig />
    </>
  );
}
