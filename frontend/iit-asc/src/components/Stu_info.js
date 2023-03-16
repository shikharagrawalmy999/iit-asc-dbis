//import { useNavigate } from 'react-router-dom'
import { useEffect, useState  } from 'react'
//import { useAuth } from './auth'
import {useParams} from 'react-router-dom'
//import Table from 'react-bootstrap/Table';
import './Boottableinst'
import { Boottable } from './Boottableinst';
import "./css/main.css"
// import background from "./img/p5.jpeg";


export const Stuinfo = () => {
  //const navigate = useNavigate()
  const params = useParams();
  const stuid = params.stu_id;  

  const [user_info,setuser_info] = useState([]);
//   const myStyle={
//     backgroundImage: `url(${background})`,
//     height:'100vh',
//     backgroundSize: 'cover',
//     resizeMode: 'repeat', 
// };


    useEffect(() => {
        //Runs only on the first render
        const body = {userid:stuid};
          fetch('http://localhost:5001/home', {
          method: 'POST',   
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
          credentials:'include',
        withCredentials:true,
        })
            .then((response) => response.json())
            .then((dat) => {
              setuser_info(dat);
            })
            .catch((err) => {
              console.log(err.message);
            });
    
        
      }, [stuid,setuser_info]); 
      
      

    return(
      <div >
      <div align="center">
      <div class="caption">Student Information</div>
      <table class='content-table'>
        <thead>
        <tr className='table-dark'>
          <th scope='col'>ID</th>
          <th scope='col'>Name</th>
          <th scope='col'>Dept</th>
          <th scope='col'>Tot_cred</th>
        </tr>
        </thead>
        <tbody>
            <tr >
              <td>{user_info.id}</td>
              <td>{user_info.name}</td>
              <td>{user_info.dept_name}</td>
              <td>{user_info.tot_cred}</td>
            </tr>
            </tbody>   
      </table>
      </div>
      <div align="center">
      <Boottable stuid={stuid}/>
      </div>
    </div>
    )
}   