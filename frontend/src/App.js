import React, { useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from 'react-query'
import { useStateValue } from "./store";
import { actionTypes } from "./store/reducer";

const queryClient = new QueryClient()
function App() {
  const [{token},dispatch] =useStateValue();
  useEffect(()=>{
    if(token == null){
      let jwt = localStorage.getItem("token")
      let user = localStorage.getItem('user');
      if(jwt){
        dispatch({
          type: actionTypes.SET_USER,
          token:jwt,
          user:JSON.parse(user)
        })
      }
    }
  },[dispatch,token])
  return (
    <QueryClientProvider client={queryClient}>
    <div style={{width:'100vw'}}>
      <Header/>
      <div style={{paddingTop:'70px'}}>
      <Home/>
      </div>
      
    </div>
    </QueryClientProvider>
  );
}

export default App;
