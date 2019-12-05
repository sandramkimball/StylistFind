import React from "react";
import styled from 'styled-components';
//COMPONENTS
// import { useUserContext } from '../contexts/UserContext';
// import { useDataContext } from '../contexts/DataContext';
import axiosWithAuth from "../utilis/axiosWithAuth";



export default class SignUp extends React.Component {
  // const { user, stylist, dispatch } = useUserContext();
  // const { dispatchData } = useDataContext();
  // const {user, setUser} = useState();
  // const {stylist, setStylist} = useState();

  constructor(props){
    super(props);
    this.state = { 
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      street_address: '',
      city: '',
      zipcode: '',
      state: '',
      country: '',
      salon: '',
      email: '',
      usertype: 'user' || 'stylist',
      id: Date.now(),
      errors: {},
      isLoading: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };


  handleChange = e =>{
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
      e.preventDefault();
      if(this.state.usertype ==='user'){
        axiosWithAuth()
        .post('/api/register', this.state)
        .then(
          (res)=> this.context.router.push(`api/user-dashboard/:id`),
          (err)=> this.setState({errors: err.data.errors, isLoading: false})
        )
        .catch(err=>{console.log(err.response)})
      }

      if(this.state.usertype === 'stylist'){
        axiosWithAuth()
        .post('/api/register', this.state)
        .then(
          (res)=> this.context.router.push(`api/search`),
          (err)=> this.setState({errors: err.data.errors, isLoading: false})
        )
        .catch(err=>{console.log(err.response)})
      }
  };

    //USER
    // useEffect(()=> {
    //   const userId = (props.match.params.id);
    //   const userData = props.data.users.find(el => el.id === userId);
    //   dispatchData({type: 'SET_USER', payload: userData})

    // //STYLIST
    //   const stylistId = (props.match.params.id);
    //   const stylistData = props.data.stylists.find(el => el.id === stylistId);
    //   dispatchData({type: 'SET_STYLIST', payload: stylistData})

    //   const users = [...users];
    //   const stylists = [ ...stylists];
    //   const storage = props.match.headers.authorization;

    //   if (users.map(obj => obj.username).includes(registrationInfo.username)) {
    //     dispatch({ type: 'REGISTRATION_FAILURE' });
    //   } else {
    //     storage.setItem('token', 'register' + registrationInfo.username);
    //     storage.setItem('usertype' + registrationInfo.usertype);
    //         dispatch({
    //           type: 'REGISTRATION_SUCCESS',
    //           username: registrationInfo.username,
    //           city: registrationInfo.city,
    //         });
    //   };    
    // };

  // if ('token') {
  //   if (user.usertype === 'stylist') {
  //     return <Redirect to={`/stylist-dash/:${stylist.id}`} />;
  //   } else {
  //     return <Redirect to={`/user-dash/:${user.id}`} />;
  //   }
  // };

  render(){
  return (
    <SignupPage>
      <SignupForm onSubmit = {this.handleSubmit}>
        <h3>Sign Up</h3>

        <input
          type='text'
          name='first_name'
          value={this.first_name} 
          placeholder="first name" 
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='last_name'
          value={this.last_name} 
          placeholder="last name" 
          onChange={this.handleChange}
        />

        <input
          type='text'
          name='username'
          value={this.username} 
          placeholder="username" 
          onChange={this.handleChange}
        />

        <input
          type='text'
          name='password'
          value={this.password} 
          placeholder="password" 
          onChange={this.handleChange}
        />

        <input
          type='text'
          name='email'
          value={this.email} 
          placeholder="email" 
          onChange={this.handleChange}
        />

        <input 
          type='radio'
          label='user'
          name='usertype'
          value={this.usertype === 'stylist'}
          onChange={this.handleChange}
        />

        <input 
          type='radio'
          label='stylist'
          name='usertype'
          value={this.usertype === 'user'}
          onChange={this.handleChange}
        />
  
  {this.usertype === 'stylist' && (
      <div>
          <input
            type='text'
            name='street_address'
            value={this.street_address} 
            placeholder="street address" 
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='city'
            value={this.city} 
            placeholder="city" 
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='country'
            value={this.country} 
            placeholder="country" 
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='zipcode'
            value={this.zipcode} 
            placeholder="zipcode" 
            onChange={this.handleChange}
          />

          <input
            type='text'
            name='salon'
            value={this.salon} 
            placeholder="salon_name" 
            onChange={this.handleChange}
          />
        </div>
    )}
    <button>Register</button>


       </SignupForm> 
    </SignupPage>
  );
}}

const SignupPage = styled.div`
    width: 60vw
    margin: 0 auto;
    
`;

const SignupForm = styled.form`
    display:flex;
    justify-content: center;
    align-content: spece-evenly;
    align-items: center;
    margin: 0 auto;
    padding: 20px;
    flex-direction: column;
    box-shadow: 1px 2px 4px #000;
    background: white;
    width: 350px;
    h3{margin: 0}
    input{
        width: 300px;
        height: 25px;
        margin: 20px;
    }
    div{
        justify-content: space-evenly;
        flex-direction: row
    }
    button{
      color: #000;
        font-size: 1.25rem;
        border: 1px solid black;
        padding: 10px 20px;
        background: none;
        text-decoration: none;
        color: black;
        :hover{transform: scale(1.025); color: #80808095; cursor: pointer}
    }
`;