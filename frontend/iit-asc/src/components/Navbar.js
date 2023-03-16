import { NavLink } from 'react-router-dom'
// import { useAuth } from './auth'
import "./css/Navbar.css"

export const Navbar = () => {


  return (
    <div align="center" class="navigation">
        <nav align="center" class="nav-type1">
          <ul align="center" class="nav-type">

            <li target="_blank"  class="active1">
                <NavLink to='/home' class="nav-link"><i class="fas fa-tachometer-alt"></i>Home</NavLink>
            </li>

            <li target="_blank" class="active2">
                  <NavLink to='/course/running' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Running Courses</NavLink>
            </li>

              <li target="_blank" class="active2">
                <NavLink to='/instructor' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Instructors</NavLink>
              </li>

              <li target="_blank" class="active2">
                <NavLink to='/department' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Departments</NavLink>
              </li>

              <li target="_blank" class="active3">
                  <NavLink to='/home/registration' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Registration</NavLink>
            </li>  
       

          </ul>
        </nav>
      </div>
   
  )
}
