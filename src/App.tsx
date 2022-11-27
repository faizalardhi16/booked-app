import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './Components/ProtectedRoute';
import UnloggedRoute from './Components/UnloggedRoute';
import Home from './Pages/Home';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Profile from './Pages/Profile';
import Reservation from './Pages/Reservation';
import Transaction from './Pages/Transaction';
import { useValue } from './Store/store';

function AppObserver() {
  const storage = useValue();

  useEffect(() => {
    const user = localStorage.getItem("user")
    if(user){
      storage.setDataUser(JSON.parse(user))
    }
  },[]);

  return(
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/login" element={
        <UnloggedRoute>
          <Login />
        </UnloggedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      } />
      <Route path="/transaction" element={
        <ProtectedRoute>
          <Transaction/>
        </ProtectedRoute>
      } />
      <Route path="/reservation" element={
        <ProtectedRoute>
          <Reservation/>
        </ProtectedRoute>
      } />
      <Route path="/*" element={<NotFound/>} />
    </Routes>
  )
}

const App = observer(AppObserver);

export default App;
