import React from "react";
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {signInWithGoogle} from '../../firebase/firebase.utils'
import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }
  handlechange =event => {
      const {value,name} =event.target;

      this.setState({[name]:value})
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ email: '', password: '' });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput 
          name="email" 
          type="email" 
          label='email'
          value={this.state.email} 
          handleChange={this.handlechange}
          required
          />
          <FormInput 
          name="password" 
          type="password" 
          label='password'
          value={this.state.password} 
          handleChange={this.handlechange}
          required
          />
          <div className='buttons'>
          <CustomButton type="submit"> Sign In </CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn> Sign In With Google </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
