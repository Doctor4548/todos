import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import TodoPage from './components/TodoPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <TodoPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </Provider>
);

export default App;
