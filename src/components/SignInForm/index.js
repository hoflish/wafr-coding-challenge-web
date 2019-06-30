import React from "react";

import { history } from "../../history";
import { baseUrl } from "../../routes/constants";
import { FormField } from "..";

const INITIAL_STATE = {
  fields: {
    email: "",
    password: ""
  },
  fieldErrors: {}
};

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    const { fields, fieldErrors } = this.state;
    fields[event.target.name] = event.target.value;
    fieldErrors[event.target.name] = "";
    this.setState({ fields, fieldErrors });
  };

  onSubmit = event => {
    const { fields } = this.state;
    const { firebase } = this.props;
    const errors = {};

    event.preventDefault();

    if (!fields.email) errors.email = "Please enter your email";
    if (!fields.password) errors.password = "Please enter your password";
    this.setState({ fieldErrors: errors });

    if (Object.keys(errors).length) return;

    firebase
      .doSignInWithEmailAndPassword(fields.email, fields.password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(baseUrl);
      })
      .catch(error => {
        const { code, message } = error;
        if (code === "auth/invalid-email") {
          errors.email = message;
        } else if (code === "auth/user-not-found") {
          errors.email = message;
        } else if (code === "auth/wrong-password") {
          errors.password = message;
        } else {
          if (code === "auth/user-disabled") {
            errors.email = message;
          } else {
            // TODO: render this error and send it to remote error tracker
            errors.serverError = "Oops, something went wrong!";
          }
        }
        this.setState({ fieldErrors: errors });
      });
  };

  render() {
    const {
      fields: { email, password },
      fieldErrors
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <FormField
          name="email"
          value={email}
          placeholder="Email"
          error={fieldErrors.email}
          onChange={this.onChange}
        />
        <FormField
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          error={fieldErrors.password}
          onChange={this.onChange}
        />
        <button className="button is-primary is-fullwidth" type="submit">
          Sign in
        </button>
      </form>
    );
  }
}

export default SignInForm;
