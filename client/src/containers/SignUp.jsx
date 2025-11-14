import { useState } from 'react';
import './Login.css';
import { SIGN_UP_API } from '../utilities/apis';
import { Link, useNavigate } from 'react-router';

function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!email || !password || !name) {
                setError('Please fill in all fields');
                setLoading(false);
                return;
            }

            const response = await fetch(SIGN_UP_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Registration failed');
                setLoading(false);
                return;
            }

            // Store token and redirect
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'An error occurred');
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">URL Shortener</h1>
                <p className="login-subtitle">Sign up to access services</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>

                <div className="login-footer">
                    <a href="#" className="forgot-password">Forgot your password?</a>
                    <p>
                        Don't have an account? <Link to={"/"} className="signup-link">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;