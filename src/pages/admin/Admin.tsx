import Nav from "./components/Nav";
import Body from "./components/Body";
import "./admin.scss";
export default function admin() {
  return (
    <div>
      <div className="admin-page">
        <Nav></Nav>
        <Body></Body>
      </div>
    </div>
  );
}
