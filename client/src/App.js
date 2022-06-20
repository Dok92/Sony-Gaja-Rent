import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Main from './pages/Main';
import Error from './pages/Error';

const Page = () => {
  return (
    <ProtectedRoute>
      <Main />
    </ProtectedRoute> 
  )
}

function App() {
  return (
    <BrowserRouter> 
       <Routes>
        <Route index element={< Page />} />   
        <Route path='/rent' element={ <Page />} />
        <Route path='/ps5' element={< Page />} /> 
        <Route path='/ps4' element={< Page />} />
        <Route path='/profile' element={< Page />} />
        <Route path='/trophies' element={< Page />} />
        <Route path='*' element={<Error />} /> 
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
