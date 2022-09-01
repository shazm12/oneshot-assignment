/* Component For College Data */
import React from 'react'
import { Space, Table, Tag, Spin } from 'antd';
import { render } from 'react-dom';
import {useParams} from 'react-router-dom';

const ColTable = ({collegeData}) => {
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
      if(!collegeData || collegeData.length === 0) {
        return <Spin tip="Loading Your Content..." size='large' className='mt-[10vh]' />
        }
      return (
        <div className='flex flex-col w-screen justify-center items-center'>
          <Table size='large' bordered className='mt-10 justify-center items-center' columns={columns} dataSource={collegeData} /> 
        </div>
      );
}

export default ColTable