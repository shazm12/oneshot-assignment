/* Component For Student Details Data */
import React,{useState, useEffect} from 'react'
import { Space, Table, Tag,Descriptions, Divider,Spin  } from 'antd';
import { render } from 'react-dom';
import {useParams} from 'react-router-dom';
import axios from '../util/axios.js';

const StudentDetails = () => {
    const {name} = useParams();
    const [student, setStudent] = useState([]);
    useEffect(() => {
        const getStudentSpecificData = async() => {
            const data =await axios.post('/student/getStudentByName', {
                name: name
              })
              .then(res => {
                return res.data.student;
              })
              .catch(err => {
                console.log(err);
            });
            setStudent(data);
        }
        getStudentSpecificData();
    },[])
    if(!student || student.length === 0){
        return (
          <Spin tip={<h1>Loading your content...</h1>} size='large' className='mt-[10vh]'>
          </Spin>
        )
      }
  return (
    <div>     
         <Descriptions className='bg-[#FFFFFFFF] border mt-[5vh] border-black px-2 py-2' bordered title="Student Details">
        <Descriptions.Item label="Name:">{student?.name}</Descriptions.Item>
        <Descriptions.Item label="Year Of Batch:">{student?.yearOfBatch}</Descriptions.Item>
        <Descriptions.Item label="College ID:">{student?.collegeId}</Descriptions.Item>
        <Descriptions.Item label="Skills:">{student?.skills?.map(course => (
        <Tag color="blue" key={course}>{course}</Tag>
        ))}
        </Descriptions.Item>
        </Descriptions>
    </div>
  )
}

export default StudentDetails