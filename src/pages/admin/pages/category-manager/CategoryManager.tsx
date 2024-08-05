import { Table } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { Switch } from "antd";
import "./category-manager.scss";

export default function CategoryManager() {
  const [listUser, setlistUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setlistUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  interface userList {
    id: number;
    Username: string;
    email: number;
    password: string;
    role: string;
  }

  const updateUserRole = async (userId: number, newRole: any) => {
    try {
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        role: newRole,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (checked: boolean, userId: number) => {
    const updatedUsers = listUser.map((user: userList) => {
      if (user.id === userId) {
        user.role = checked ? "admin" : "member";
        updateUserRole(userId, user.role); // Update role in db.json
      }
      return user;
    });
    setlistUser(updatedUsers); // Update the type of the state
  };

  const handleDelete = async (userId: any) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      // After deleting, update the listUser state to remove the deleted user
      setlistUser(listUser.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h3>Quản lý user</h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Tool </th>
          </tr>
        </thead>
        <tbody>
          {listUser.map((userList: userList) => (
            <tr key={Date.now() * Math.random()}>
              <td>{userList.id}</td>
              <td>{userList.Username}</td>
              <td>{userList.email} </td>
              <td>{userList.password}</td>
              <td className="roleSwitch">
                {userList.role}
                <Switch
                  defaultChecked={userList.role === "admin"}
                  onChange={(checked) => onChange(checked, userList.id)}
                />
              </td>
              <td>
                <button onClick={() => handleDelete(userList.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
