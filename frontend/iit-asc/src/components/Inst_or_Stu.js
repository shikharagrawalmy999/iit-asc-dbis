import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from './Navbar'
import { Navbarinst } from './Navbarinst'
import { useNavigate,useLocation} from "react-router-dom";
import './css/Loading.css'

export const Inststulogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [isInst,setIsinst] = useState();
    const myStyle={
      // height:'100%',
      // backgroundSize: 'cover',
      // resizeMode: 'repeat', 
  };

    useEffect(() => {
        const timer =  setTimeout(() => {
            fetch('http://localhost:5001/exist', {
            method: 'POST',   
            headers: {
              'Content-type': 'application/json',
            },
            credentials:'include',
            withCredentials:true,
          })
        .then((response) => response.json())
        .then((dat) => {
          if(dat.value){
            if(dat.inst){
              setIsinst(true)
            }else{
              setIsinst(false)
            } 
            setIsLoading(false)
          }else{
            navigate('/login', {state:{ path: location.pathname }})
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
            
        },1000);
        return()=>clearTimeout(timer)
      }, [location,navigate]);

      useEffect(()=>{

      },[isLoading,setIsinst])

    return (
        <>
            {!isLoading
                ? isInst?<><Navbarinst/><Outlet/></>:<><Navbar/><Outlet/></>
                :  <div style={myStyle} class="page">
                  <div class="center">
                    <h1 data-text="Loading…">Loading…</h1></div>
                    <div class="svg">
                    <svg width="40" height="90" viewBox="0 0 50 130">
                  <rect id="scroll" x="0" y="5" rx="25" ry="25" width="50" height="120" stroke="#F06" fill="#FFF" stroke-width="4"></rect>
                  <circle id="circle--shape" cx="25" cy="32" r="8" fill="#F06"></circle>
                </svg>
                    </div>
              </div>
            }
        </>
    )
}
