import { useNavigate} from 'react-router-dom'



import './css/Profile.css';
import { Studetail } from './StudentHome';
import "./css/main.css"
import "./css/button.css"
import background from "./img/p6.jpeg";

export const Profile = () => {

  const navigate = useNavigate()
  const myStyle={
    backgroundImage: `url(${background})`,
    height:'100%',
    backgroundSize: 'cover',
    resizeMode: 'repeat', 
  };

  const handleLogout = () => {
    fetch('http://localhost:5001/logout', {
      method: 'POST',   
      headers: {
        'Content-type': 'application/json',
      },
      credentials:'include',
      withCredentials:true,
    })
        .then((response) => response.json())
        .then((dat) => {     
        })
        .catch((err) => {
          console.log(err.message);
        });
    navigate('/')
  }
  

    return(
      <>
        <div style={myStyle}>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
        <button  className="button-29 m-3" onClick={handleLogout}>Logout</button>
        <Studetail/>
        </div>
     </>
    )
}
