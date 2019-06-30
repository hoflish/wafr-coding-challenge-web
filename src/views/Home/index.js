import React from "react";
import { Redirect } from "react-router-dom";

import { useUser } from "../../contexts/user-context";
import { signInUrl } from "../../routes/constants";

const Home = props => {
  const { user, initializing } = useUser();

  if (initializing) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Redirect to={signInUrl} />;
  }
  return <div>Home</div>;
};

export default Home;
