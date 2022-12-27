import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Admin from './pages/admin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
