import React from "react";
import { Link, Redirect } from "react-router-dom";

import { useFirebase } from "../../contexts/firebase-context";
import { useUser } from "../../contexts/user-context";
import { baseUrl, signUpUrl } from "../../routes/constants";
import { SignInForm } from "../../components";

const SignIn = props => {
  const { firebase } = useFirebase();
  const { user, initializing } = useUser();

  if (initializing) {
    return <div>Loading...</div>;
  }
  if (user) {
    return <Redirect to={baseUrl} />;
  }
  return (
    <section className="section">
      <div className="hero-body">
        <div className="container">
          <div className="is-5-tablet is-4-desktop is-3-widescreen">
            <div className="column wr-signup-form">
              <div style={{ marginBottom: "20px" }}>
                <h3 className="title is-3">Sign in</h3>
                <p className="subtitle is-6">
                  or <Link to={signUpUrl}>create an account</Link>
                </p>
              </div>
              <SignInForm firebase={firebase} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
