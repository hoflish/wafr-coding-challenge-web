import React from "react";
import { Redirect } from "react-router-dom";

import { useUser } from "../../contexts/user-context";
import { signInUrl } from "../../routes/constants";
import { Spinner } from "../../components";
import Repos from "../../components/Repos";

const Home = props => {
  const { user, initializing } = useUser();

  if (initializing) {
    return <Spinner />;
  }
  if (!user) {
    return <Redirect to={signInUrl} />;
  }
  return <Repos />;
};

export default Home;
