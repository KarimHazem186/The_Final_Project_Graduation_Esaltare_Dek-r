import React, { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';

const LineChart1 = () => {
  const vendor = [4000, 3000, 2000, 2780, 1890, 2390, 3490,5490, 3490, 2490, 1490,9000];
    const inhouse = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 3234, 2234, 2456, 1230, 5290];
    const xLabels = [
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May.',
      'Jun.',
      'Jul.',
      'Aug.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dec.',
    ];

    const [vendorData, setVendorData] = useState([]);
    const [inhouseData, setInhouseData] = useState([]);  
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const vendorResponse = await axios.get('/api/vendor-data');
          const inhouseResponse = await axios.get('/api/inhouse-data');
          setVendorData(vendorResponse.data);
          setInhouseData(inhouseResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    
    return (
    <>
    <LineChart
        width={550}
        height={400}
        series={[
            { data: inhouse, label: 'inhouse',color:'#3c71a3' },
            { data: vendor, label: 'vendor' },

            // When request is successful API
            // { data: inhouseData, label: 'inhouse', color: '#3c71a3' },
            // { data: vendorData, label: 'vendor' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
    /> 
    </>
  )
}

export default LineChart1