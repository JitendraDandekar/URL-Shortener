import { useState, useEffect } from 'react'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated ? <Dashboard /> : <Login />}
    </>
  )
}

export default App
