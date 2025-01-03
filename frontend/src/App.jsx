import './App.css'
import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ProtectedRoute from './components/ProtectedRoute';

const LoginPage = lazy(() => import('./components/LoginPage'));
const RegisterPage = lazy(() => import('./components/RegisterPage'));
const HomePage = lazy(() => import('./components/HomePage'));
const TodoPage = lazy(() => import('./components/TodoPage'));

const App = () => (
  <Provider store={store}>
    <Router>
      <Suspense fallback={<h3>Loading...</h3>}>
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
      </Suspense>
    </Router>
  </Provider>
);

export default App;
