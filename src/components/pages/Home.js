import React, { Component } from 'react';
import './../../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordRepeat: '',
      emailError: '',
      passwordError: '',
      passwordRepeatError: '',
      userId: '',
      userAccessToken: '',
      userRefreshToken: '',
      showSignUpForm: true,
      message: '',
      bootstrapClass: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordRepeatChange = this.handlePasswordRepeatChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.toggleAuthForms = this.toggleAuthForms.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  getUserIdCookie = () => {
    let content;
    try{
      content = document.cookie.split(';').filter((item) => item.includes('userId'))[0].split('=')[1];
    }catch(msg){
      content = ""; 
    }
    finally{
      return content;
    }
  }

  getUserInfo(){
    //let userIdCookie = this.getUserIdCookie();
    let userIdCookie = cookies.get('userId');
    console.log(userIdCookie)
    fetch(`http://localhost:3600/users/${userIdCookie}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          },
          mode: 'cors',
          cache: 'default',
          credentials: 'include'
        })
          .then(res => {
            return res.json();
          })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
              console.log(err);
            })
  }

  toggleAuthForms(){
    //remember to take the previous state for things like this
    this.setState(previousState => ({
      showSignUpForm: !previousState.showSignUpForm,
      password: '',
      passwordError: '',
      email: '',
      emailError: '',
      passwordRepeat: '',
      passwordRepeatError: '',
      message: '',
      bootstrapClass: ''
    }));
  }

  handleEmailChange(event){
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordChange(event){
    this.setState({
      password: event.target.value
    });
  }

  handlePasswordRepeatChange(event){
    this.setState({
      passwordRepeat: event.target.value
    });
  }

  credentialFormValidation(){
    let success = true;
    if(this.state.email.length === 0){
      this.setState({
        emailError: 'Please enter an email'
      });
      success = false;
    }
    else{
      this.setState({
        emailError: ''
      });
    }
    if(this.state.password.length < 6){
      this.setState({
        passwordError: 'Please enter a password at least 6 characters in length'
      });
      success = false;
    }
    else{
      this.setState({
        passwordError: ''
      });
    }
    if(this.state.password !== this.state.passwordRepeat && this.state.showSignUpForm === true){
      this.setState({
        passwordRepeatError: 'Passwords do not match'
      });
      success = false;
    }
    else{
      this.setState({
        passwordRepeatError: ''
      });
    }
    return success;
  }

  handleSignOut(){
    cookies.remove('userId');
    cookies.remove('access_token');
    cookies.remove('refresh_token');
    this.setState({
      userAccessToken: '',
      userRefreshToken: '',
      message: ''
    });
  }

  handleAutoSignIn(){
    fetch('http://localhost:3600/auth/refresh', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      mode: 'cors',
      cache: 'default',
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
        .then(data => {
          this.setState({
            userAccessToken: data.accessToken,
            userRefreshToken: data.refreshToken,
            email: '',
            password: ''
          });
          console.log(data);
        })
        .catch(err => {
          this.setState({
            message: `You've been automatically signed out`
          })
        });
  }

  handleSignIn(event){
    event.preventDefault();
    if(this.credentialFormValidation()){
        let data = {
          "email": this.state.email,
          "password": this.state.password
        }
        fetch('http://localhost:3600/auth/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          mode: 'cors',
          cache: 'default',
          credentials: 'include',
          body: JSON.stringify(data)
        })
          .then(res => {
            console.log(res)
            return res.json();
          })
          .then(data => {
            console.log(data);
            if(data.error === undefined){
              this.setState({
                userAccessToken: data.accessToken,
                userRefreshToken: data.refreshToken,
                email: '',
                password: '',
                message: 'You are now signed in!',
                bootstrapClass: 'text-success'
              });
            }
            else{
              this.setState({
                message: data.error,
                bootstrapClass: 'text-danger'
              })
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      
  }

  handleSignUp(event){
    event.preventDefault();
    if(this.credentialFormValidation()){
        let data = {
          "email": this.state.email,
          "password": this.state.password
        }
    
        fetch('http://localhost:3600/users/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          mode: 'cors',
          cache: 'default',
          credentials: 'include',
          body: JSON.stringify(data)
        })
          .then(res => {
            console.log(res.status);
            return res.json();
          })
          .then(data => {
            this.setState({
              userId: data.id,
              email: '',
              password: '',
              showSignUpForm: false,
              message: 'Success! You can now sign in!'
            });
          });
      }
  }


  //lifecycle methods
  componentWillMount(){
    let userIdCookie = this.getUserIdCookie();
    if(userIdCookie.length > 0){
      this.handleAutoSignIn();
    }
  }

  render() {
    return (
        <div className="container-fluid">
          
          { this.state.userAccessToken.length === 0 ?
          <div>
          <div className="bg-secondary row">
            <h2 className="ml-2 mr-2">Sign up</h2>
          </div>
          <div className="bg-secondary row">
            <p className="ml-2 mr-2">I made an API! Even though it's secure please use a fake email to sign up in order to navigate the full site!</p>
          </div>
          <div className="bg-secondary row">
            <div className="col border-top border-dark">
            
            { this.state.showSignUpForm ? 
              <form onSubmit={this.handleSignUp}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" onChange={this.handleEmailChange} value={this.state.email} className="form-control" id="emailInput" aria-describedby="email" placeholder="Enter email address" />
                  <p className="text-danger">{this.state.emailError}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" value={this.state.password} className="form-control" id="passwordInput" placeholder="Password" onChange={this.handlePasswordChange} />
                  <p className="text-danger">{this.state.passwordError}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="passwordRepeat">Enter Password Again</label>
                  <input type="password" value={this.state.passwordRepeat} className="form-control" id="passwordRepeatInput" placeholder="Repeat Password" onChange={this.handlePasswordRepeatChange} />
                  <p className="text-danger">{this.state.passwordRepeatError}</p>
                </div>
                <div className="form-group">
                  <input type="submit" className="btn btn-dark mr-2" value="Submit"/>
                  <input type="button" className="btn btn-dark ml-2" value="Sign in instead" onClick={this.toggleAuthForms}/>
                </div>
                
              </form>
            : 
            <div>
              <p>{this.state.message}</p>
              
              <form onSubmit={this.handleSignIn}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" onChange={this.handleEmailChange} value={this.state.email} className="form-control" id="emailInput" aria-describedby="email" placeholder="Enter email address" />
                <p className="text-danger">{this.state.emailError}</p>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" value={this.state.password} className="form-control" id="passwordInput" placeholder="Password" onChange={this.handlePasswordChange} />
                <p className="text-danger">{this.state.passwordError}</p>
              </div>
              <div className="form-group">
                <input type="submit" className="btn btn-dark mr-2" value="Submit"/>
                <input type="button" className="btn btn-dark ml-2" value="Sign up instead" onClick={this.toggleAuthForms}/>
              </div>
              
              </form>
            </div>
            }
            </div>
          </div>
          </div>
          :
          <div>
          <div className="bg-secondary row">
            <p className="text-success mx-auto">{this.state.message}</p>
          </div>
          <div className="bg-secondary row">
            <button type="button" className="btn btn-dark mx-auto" onClick={this.handleSignOut}>Logout</button>
          </div>
          <div className="bg-secondary row">
            <button type="button" className="btn btn-dark mx-auto" onClick={this.getUserInfo}>Get User Info</button>
          </div>
          
          </div>
          
        }
        </div>
    );
  }
}

export default Home;
