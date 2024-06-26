import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditSelf = () => {
    const navigate=useNavigate()
    const {id}=useParams()
    const[employee,setEmployee]=useState({
        name: "",
        email: "",
        address: "",
        contact:"",
        emergencycontact:"",
        salary: "",
        jobrole:"",
        department_id: "",
        training:"",
      });

      const[department,setDepartment]=useState([])
      useEffect(()=>{
         axios.get('http://localhost:3000/auth/department')
         .then(result=>{
          if(result.data.Status){
            setDepartment(result.data.Result)
          }
          else{
            alert(result.data.Error)
          }
         })
         .catch(err=>console.log(err))

         axios.get('http://localhost:3000/auth/employee/'+id)
     .then(result=>{
    setEmployee({
        ...employee,
        name:result.data.Result[0].name,
        email:result.data.Result[0].email,
        address:result.data.Result[0].address,
        contact:result.data.Result[0].contact,
        emergencycontact:result.data.Result[0].emergencycontact,
        salary:result.data.Result[0].salary,
        jobrole:result.data.Result[0].jobrole,
        department_id:result.data.Result[0].department_id,
        training:result.data.Result[0].training,
    })
     })
     .catch(err=>console.log(err))
      },[])

      const handleSubmit = (e) => {
        e.preventDefault()
    
        axios.put('http://localhost:3000/auth/edit_employee/'+id,employee)
        .then(result=>{
            if(result.data.Status){
                navigate('/dashboardemployee/'+ida)
              }
              else{
               console.log(result.data.Error)
              }
        })
        .catch(err=>console.log(err))
      }

  return (
    <div className='d-flex justify-content-center align-items-center'>
    <div className=" border border-3 border-dark col-8 rounded p-3 m-5 loginForm">
        <h2>Edit Employee</h2>
    <form onSubmit={handleSubmit}>
  <div className="mb-3 col">
    <label htmlFor="email" className="form-label"><strong>Email Address</strong></label>
    <input type="email" className="form-control" id="email" name='email'  value={employee.email} aria-describedby="emailHelp" placeholder='john@gmail.com' onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })}/>
  </div>
  <div className="mb-3 col">
    <label htmlFor="address" className="form-label"><strong>Address</strong></label>
    <input type="text" className="form-control" id="address" name='address'  value={employee.address} aria-describedby="emailHelp" placeholder='Haryana, India' onChange={(e) =>setEmployee({ ...employee, address: e.target.value })}/>
  </div>
  <div className="mb-3 col">
    <label htmlFor="contact" className="form-label"><strong>Contact no.</strong></label>
    <input type="text" className="form-control" id="contact" name='contact'  value={employee.contact} aria-describedby="emailHelp" placeholder='+91xxxxxxxxxx' onChange={(e) =>setEmployee({ ...employee, contact: e.target.value })}/>
  </div>
  <div className="mb-3 col">
    <label htmlFor="emergencycontact" className="form-label"><strong>Emergency Contact</strong></label>
    <input type="text" className="form-control" id="emergencycontact" name='emergencycontact'  value={employee.emergencycontact} aria-describedby="emailHelp" placeholder='+91xxxxxxxxxx' onChange={(e) =>setEmployee({ ...employee, emergencycontact: e.target.value })}/>
  </div>
  <button type="submit" className="btn btn-primary">Edit</button>
</form>
</div>
</div>
  )
}

export default EditSelf
