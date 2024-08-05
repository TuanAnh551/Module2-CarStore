import { Outlet } from "react-router-dom";

export default function Content() {
  return (
    <div className="content">
      <Outlet></Outlet>
    </div>
  );
}
