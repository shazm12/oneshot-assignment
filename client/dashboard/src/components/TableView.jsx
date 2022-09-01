/* Component For Table For College Data For A Specified State */
import React,{useState} from 'react'
import { Space, Table, Tag,Spin } from 'antd';
import { render } from 'react-dom';
import {useParams} from 'react-router-dom';
const TableView = ({collegeData}) => {
  
  const {state} = useParams();
  const[loading,setLoading] = useState(true);
  const stateData = collegeData.filter(data => data.state === state);
  const columns = [
    {
      title: 'College Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <h1 className=''>{text}</h1>,
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      render: text => <h1 className=''>{text}</h1>,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title:'Number Of Students',
      dataIndex:'noOfStudents',
      key: 'noOfStudents',
      render: text => <h1 className='text-center'>{text}</h1>,

    },
    {
      title: "Courses Offered",
      dataIndex: "courses",
      key: "courses",
      render: text => text.map(course => <Tag color="blue" key={course}>{course}</Tag>),
    }
  ]
  if(!collegeData || collegeData.length === 0){
    return (
      <Spin tip={<h1>Loading your content...</h1>} size='large' className='mt-[10vh]'>
      </Spin>
    )
  }
  return (
    <div className='flex flex-col w-screen justify-center items-center'>
      <h1 className='font-semibold text-[2rem] my-10'>List Of Colleges by {state}</h1>
      <Table size='large' bordered className='mt-10 justify-center items-center' columns={columns} dataSource={stateData} /> 
    </div>
  );
}

export default TableView;