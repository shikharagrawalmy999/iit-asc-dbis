import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useEffect, useState  } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/main.css"
import "./css/button.css"
//import background from "./img/pf4.jpeg";

export const Reg = () => {


  const [items,setitem_info] = useState([]);
  const [rows,setrows] = useState([]);

  const [value, setValue] = useState([]);
  const [svalue, setsValue] = useState([]);

  const showToastMessage = (dat) => {
    if(dat){
      toast.success('Registered  !', {
        position: toast.POSITION.TOP_RIGHT
      });
    }else{
      toast.error('Cannot Register !', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    
};

// const myStyle={
//   backgroundImage: `url(${background})`,
//   height:'100vh',
//   backgroundSize: 'cover',
//   resizeMode: 'repeat', 
// };

  useEffect(() => {
    //Runs only on the first render

    fetch('http://localhost:5001/allcurrentcourses', {
      method: 'POST',   
      headers: {
        'Content-type': 'application/json',
      },
      credentials:'include',
      withCredentials:true, 
    })
        .then((response) => response.json())
        .then((dat) => {
          var temp = [];

          dat.map((val,key)=>(
            temp[key] = {id:val.course_id,name :val.course_id+" "+val.title }
          ))

          setitem_info(temp);
          console.log(temp);
        })
        .catch((err) => {
          console.log(err.message);
        });
  }, [setitem_info]);

  const handledelete = idx => e => {
    const trows = [...rows];
    trows.splice(idx, 1);
    const csec = [...svalue]
    csec.splice(idx,1)
    const cval = [...value]
    cval.splice(idx,1)
    setValue(cval)
    setsValue(csec)
    setrows(trows)
}

const handleregister = (idx) =>{
  const trows = [...rows];
  trows.splice(idx, 1);
  const csec = [...svalue]
  csec.splice(idx,1)
  const cval = [...value]
  cval.splice(idx,1)
  setrows(trows)
  setValue(cval)
  setsValue(csec)

}

  const handleChange = idx => e => {

    const body = {course_id:rows[idx].id,sec_id:svalue[idx]};
    console.log(body)
    fetch('http://localhost:5001/register', {
      method: 'POST',   
      headers: {
        'Content-type': 'application/json',
      },
      body:JSON.stringify(body),
      credentials:'include',
        withCredentials:true,
    })
        .then((response) => response.json())
        .then((dat) => {
          handleregister(idx)
          showToastMessage(dat)
        })
        .catch((err) => {
          console.log(err.message);
        });
    

  };
  const handleChangesection = idx => e => {
      const csec = [...svalue]
      csec.splice(idx,1,e.target.value)
      console.log(csec)
     setsValue(csec)
      console.log(csec)
  };

  const handleAddRow = (item) => {
    console.log(item);
    console.log(rows);
    const body = {course_id:item.id};
    fetch('http://localhost:5001/sections', {
      method: 'POST',   
      headers: {
        'Content-type': 'application/json',
      },
      body : JSON.stringify(body),
      credentials:'include',
      withCredentials:true, 
    })
        .then((response) => response.json())
        .then((dat) => {
          console.log(dat);
          setValue([...value,dat])
          console.log(dat[0].sec_id)
          setsValue([...svalue,dat[0].sec_id])
          console.log(value)
          console.log(svalue)
          console.log(setsValue);
          setrows([...rows,item]);
          console.log(rows);
        })
        .catch((err) => {
          console.log(err.message);
        });
  };



  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
    console.log("onsearch");
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
    if(rows.some(item1 => item.name === item1.name)){
      return;
    }
    else{
      handleAddRow(item);
    }
   
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
      {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        {/* <span style={{ display: 'block', textAlign: 'left' }}>course_id: {item.course_id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>Course : {item.name}</span>
      </>
    )
  }

  return (
    <div >
      <ToastContainer />
        <div class ="search123" align ='center' style={{ width: 400 }}>
        <div >Search Course here to Register</div>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
           </div>
           <div align="center">
           <div class="caption">Course to Register</div>
              <table class="content-table">
            <thead>
              <tr>
                <th>
                  Course
                </th>
                <th>
                  Section
                </th>
                <th>
                  Register
                </th>
                <th>
                  X
                </th>
              </tr>
              </thead>
              <tbody>
                {rows.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        {item.name}
                      </td>
                      <td>
                      <select value={svalue[idx]} onChange={handleChangesection(idx)}>

                          {value[idx].map((option) => (

                            <option value={option.sec_id}>S{option.sec_id}</option>

                          ))}

                        </select>
                      </td>
                      <td>
                        <button class = "button-29"
                          onClick={handleChange(idx)}
                        >Register</button>
                        </td><td>
                        <button class = "button-29"
                          onClick={handledelete(idx)}
                        >Remove</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
          </table>
          </div>
    </div>
  )
}
