import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../core/local';


export default function Signup(){
    const [state, setState] =  useState({email:'',password:'', passwordConfirm:''});
    const [error, setError] = useState();
    const navigate = useNavigate();

    const inputChange = (e) => {
        e.preventDefault();
        const {name,value} =  e.target;
        setState({...state, [name]: value})
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (state.password !== state.passwordConfirm){
            alert('Please check passords fields');
            return
        }
        if (!verifyPassword(state.password)){
            alert('This password word is to weak.');
            return;
        }
        const confirm = window.confirm('Signup will also delete all prev database.\n'+
        'Are you sure you want to continue?');
        if (!confirm) {
          return;
        }
        const sucess = signup(state.email,state.password);
        if (sucess){
            navigate('/');
            return;
        }
        setError('It is not possible to signup...');
    }

    const verifyPassword = (password) =>{
       if (password.length < 5) {
        return false;
       } 
       return true;
    }

    return (
        <div className="container mt-5">
          <form method="post" onSubmit={onSubmit} className="needs-validation">
            {error && <p className="text-danger">{error}</p>}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                value={state.email}
                onChange={inputChange}
                type="email"
                className="form-control"
                id="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                value={state.password}
                onChange={inputChange}
                type="password"
                className="form-control"
                id="password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                name="passwordConfirm"
                value={state.passwordConfirm}
                onChange={inputChange}
                type="password"
                className="form-control"
                id="passwordConfirm"
                required
              />
            </div>
            {state.passwordConfirm !== state.password && (
              <p className="text-danger">Passwords are different in the above fields</p>
            )}
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      );      
}