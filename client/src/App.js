import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './containers/ProtectedRoute';
import Main from './containers/Main';
import Error from './containers/Error';

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
        <Route path='/edit-profile' element={< Page />} />
        <Route path='*' element={<Error />} /> 
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
