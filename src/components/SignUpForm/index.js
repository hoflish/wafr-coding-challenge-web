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

class SignUpForm extends React.Component {
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

    if (!fields.email) errors.email = "Email is required";
    if (!fields.password) errors.password = "Password is required";
    this.setState({ fieldErrors: errors });

    if (Object.keys(errors).length) return;

    firebase
      .doCreateUserWithEmailAndPassword(fields.email, fields.password)
      .then(userCredential => {
        this.setState({ ...INITIAL_STATE });
        history.push(baseUrl);
      })
      .catch(error => {
        console.log(error)
        const { code, message } = error;
        if (code === "auth/invalid-email") {
          errors.email = message;
        } else if (code === "auth/email-already-in-use") {
          errors.email = message;
        } else if (code === "auth/weak-password") {
          errors.password = message;
        } else {
          // TODO: render server error
          console.log("Operation not allowed");
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
          Sign Up
        </button>
      </form>
    );
  }
}

export default SignUpForm;
