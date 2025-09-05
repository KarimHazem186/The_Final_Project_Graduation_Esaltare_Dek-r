import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const PieChart1 = () => {
    const data2 = [
        { label: 'Customer', value: 20 },
        { label: 'Vendor', value: 15 },
        { label: 'Delivery Man', value: 5 },
      ];
    
    
      const size = {
        width: 400,
        height: 250,
      };


    // when requesting API 
    // const [data, setData] = useState([]);
    
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await axios.get('/api/pie-chart-data');
    //       setData(response.data);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
  
    //   fetchData();
    // }, []);
  
  
      
      const StyledText = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 20,
      }));
      
      function PieCenterLabel({ children }) {
        const { width, height, left, top } = useDrawingArea();
        return (
          <StyledText x={(left + width / 2)+100} y={(top + height / 2)}>
            {children}
          </StyledText>
        );
      }
    
    return (
    <>
        <PieChart 
            series={[
              {
                data: data2,
                cx: 250,
                // cy: 200,
                innerRadius: 60,
                outerRadius: 120,
              },
            ]}
            height={200}
            slotProps={{
              legend: { hidden: true },
            }} {...size}
          >
              <PieCenterLabel> 
                40 user
              </PieCenterLabel>

          </PieChart>

    </>
  )
}

export default PieChart1