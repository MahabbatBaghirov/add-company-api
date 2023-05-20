import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { deleteCompanyByID, getAllCompany } from '../api/companyRequsts.js';


const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const Home = () => {

  const[company,setCompany] = useState([]);
    useEffect(()=>{
      getAllCompany()
        .then(data => {
          setCompany(data);
        })
    },[])


  const columns = [
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: 'companyName',
      dataIndex: 'companyName'
    },
    {
      title: 'contactName',
      dataIndex: 'contactName'
    },
    {
      title: 'contactTitle',
      dataIndex: 'contactTitle'
    },
    {
      title: 'Delete',
      render: (value)=> <Button onClick={()=>{
        console.log(value.id);
        deleteCompanyByID(value.id)
      }}>Delete</Button>
    },
    {
      title: 'Update',
      render: (value)=> <Button>Update</Button>
    }
  ];
  
  return (
    <>
    <Table key={company.id} columns={columns} dataSource={company} onChange={onChange} />
    </>
  )
}

export default Home