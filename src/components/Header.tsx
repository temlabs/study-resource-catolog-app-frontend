import { UserData } from "../App";
import { baseUrl } from "../utils/baseURL";
import axios from "axios";
import { useEffect, useState } from "react";

interface HeaderProps {
  setUser: (arg: UserData) => void;
  user: UserData;
}

export default function Header(props: HeaderProps): JSX.Element {
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const handleSignOut = () => {
    props.setUser({ user_id: 0, user_name: "", is_faculty: false });
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const usersData = await axios.get(`${baseUrl}/users`);
      setAllUsers(usersData.data);
    };
    getAllUsers();
  }, [props.user]);

  return (
    <>
      <h2>Study Buddy</h2>

      {props.user.user_id === 0 ? (
        <p>Please select User</p>
      ) : (
        <p>Current User is {props.user.user_name}</p>
      )}
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          User Dropdown List
        </button>
        <ul
          className="dropdown-menu btn btn-info"
          aria-labelledby="dropdownMenuButton1"
        >
          {allUsers.map((user) => {
            return (
              <li
                className="dropdown-item"
                onClick={() => props.setUser(user)}
                key={user.user_id}
              >
                {user.user_name}
              </li>
            );
          })}
        </ul>
      </div>
      <button type="button" className="btn btn-warning" onClick={handleSignOut}>
        Sign Out
      </button>
    </>
  );
}
