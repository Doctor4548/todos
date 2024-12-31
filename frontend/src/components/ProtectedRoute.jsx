import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { checkUserAuth } from '../redux/slices/authSlice'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkUserAuth())
  }, [dispatch])

  if(loading){
    return <div>Loading...</div>
  }


  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
