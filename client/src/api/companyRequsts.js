import axios from "axios";
import { BASE_URL } from '../api/baseURL';

//get all
export const getAllCompany = async(companyName)=>{
    let Company;
    let URL;
    if (!companyName) {
        URL = BASE_URL+'/company';
    }
    else{
        URL = BASE_URL+`/company/?name=${companyName}`
    }
    await axios.get(URL)
    .then(res =>{
        console.log(res) 
        Company = res.data;
    })

    return Company
}

// get by id
export const getCompanyByID = async(id)=>{
    let Company;
    await axios.get(`${BASE_URL}/company/${id}`)
    .then(res =>{ 
        Company = res.data;
    })

    return Company
}
//delete
export const deleteCompanyByID = async(id)=>{
    let message;
    await axios.delete(`${BASE_URL}/company/${id}`).then(res=>{
        message = res.data
    })
    return message
}
//post
export const postCompany = (payload)=>{
    axios.post(`${BASE_URL}/company`,payload)
}
//edit
export const editCompanyByID = (id,payload)=>{
    axios.put(`${BASE_URL}/company/${id}`,payload)
}