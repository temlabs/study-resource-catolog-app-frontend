import { useState } from "react";

import Header from "./Header";
import MainComponent from "./MainComponent";
import Footer from "./Footer";

export interface UserData {
  user_id: number;
  user_name: string;
  is_faculty: boolean;
}

export default function App(): JSX.Element {
  const [user, setUser] = useState<UserData>({
    user_id: 0,
    user_name: "",
    is_faculty: false,
  });

  return (
    <>
      <Header user={user} setUser={setUser} />
      <MainComponent user_id={user.user_id} user_name={user.user_name} />
      <Footer />
    </>
  );
}
