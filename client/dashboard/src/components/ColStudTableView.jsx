/* Component For Student Data by College */
import React,{useState, useEffect} from 'react'
import { Space, Table, Tag,Descriptions, Divider, Spin  } from 'antd';
import { render } from 'react-dom';
import {useParams} from 'react-router-dom';
import axios from '../util/axios.js';
import {useNavigate} from 'react-router-dom';
const ColStudTableView = () => {
    const navigate = useNavigate();
    const {collegeId, name} = useParams();
    const [studentData, setStudentData] = useState([]);
    const [collegeName, setCollegeName] =   useState('');
    const [collegeData,setCollegeData] = useState([]);
    const [similarColleges, setSimilarColleges] = useState([]);
    useEffect(() => {

        const getStudentData = async() => {
          
          const data =await axios.post('/student/getStudentByCollegeId', {
            collegeId: collegeId
          })
          .then(res => {
            return res.data.student;
          })
          .catch(err => {
            console.log(err);
          });
          setStudentData(data);
          const collegeDetails = await axios.post('/college/getCollegeById', {
            id: collegeId
          })
          .then(res => {
            return res.data;
          })
          console.log(collegeDetails);
          setCollegeData(collegeDetails.college);
          setCollegeName(collegeDetails.college.name);
        }

        const getSimilarCollegeData = async() => {
            const data =await axios.post('/college/getSimilarColleges', {
                name: collegeName
              })
              .then(res => {
                return res.data.college;
              })
              .catch(err => {
                console.log(err);
              });
              setSimilarColleges(data);
        }

        getStudentData();
        if(collegeName) {
            getSimilarCollegeData();
        }
    
      },[collegeName]);


  const columns1 = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <h1 className='cursor-pointer hover:text-slate-500 transition ease-in-out' onClick={() => navigate(`/student/${text}`)}>{text}</h1>,
    },
    {
      title: 'Year Of Batch',
      dataIndex: 'yearOfBatch',
      key: 'yearOfBatch',
      render: text => <h1 className=''>{text}</h1>,
    },
    {
      title: 'College ID',
      dataIndex: 'collegeId',
      key: 'collegeId',
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      render: text => text.map(course => <Tag color="gold" key={course}>{course}</Tag>),
    }
  ]

  const columns2 = [
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


  return (
    <div className='flex flex-col w-screen justify-center items-center'>
      
      {collegeData.length==0 ? (
        <>
            <Spin tip={<h1>Loading your content...</h1>} size='large' className='mt-[10vh]'>
            </Spin>
        </>
      ) :
      (
        <Descriptions className='bg-[#FFFFFFFF] border mt-[5vh] border-black px-2 py-2' bordered title="College Details">
        <Descriptions.Item label="Name:">{collegeName}</Descriptions.Item>
        <Descriptions.Item label="City:">{collegeData?.city}</Descriptions.Item>
        <Descriptions.Item label="State:">{collegeData?.state}</Descriptions.Item>
        <Descriptions.Item label="Country:">{collegeData?.country}</Descriptions.Item>
        <Descriptions.Item label="Year Founded:">{collegeData?.yearFounded}</Descriptions.Item>
        <Descriptions.Item label="Number Of Students:">{collegeData?.noOfStudents}</Descriptions.Item>
        <Descriptions.Item label="Courses Offered:">{collegeData?.courses?.map(course => (
            <Tag color="blue" key={course}>{course}</Tag>
        ))}</Descriptions.Item>
      </Descriptions>
      )}
      <h1 className='font-semibold text-[2rem] my-10'>List Of Students for {collegeName}</h1>
      <Table bordered size='large' className='mt-10 justify-center items-center' columns={columns1} dataSource={studentData} /> 
      <Divider className='my-10' />
      <h1 className='text-center font-semibold text-[2rem] my-10'>List Of Similar Colleges for {collegeName}</h1>
        <div className='flex flex-col w-screen justify-center items-center'>
           {similarColleges.length==0 ? (
                <>
                    <Spin tip={<h1>Loading your content...</h1>} size='large' className='mt-[10vh]'>
                    </Spin>
                </>

           ): (
            <Table bordered size='large' className='mt-10 justify-center items-center' columns={columns2} dataSource={similarColleges} /> 
           )}
        </div>
    </div>
  );
}

export default ColStudTableView;