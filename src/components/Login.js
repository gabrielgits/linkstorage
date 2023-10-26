import { useState } from "react";
import { login } from "../core/local";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [state, setState] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const sucess = login(state.email, state.password);
        if (sucess) {
            navigate('/');
            return;
        }
        alert('Email or password wrong');
    }

    const inputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <div className="container mt-5">
          <form method="post" onSubmit={onSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={state.email}
                name="email"
                onChange={inputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={state.password}
                name="password"
                onChange={inputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <div className="mt-3">
              <p>Or go to:</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/signup')}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      );
      
}