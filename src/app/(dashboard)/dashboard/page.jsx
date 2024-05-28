"use client";
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { showErrorNotification } from "@/lib/NotificationUtil";
import { Card, Grid, Col, Flex, Button, Title, Icon } from "@tremor/react";
import SafetyChart from "@/components/SafetyChart";
import AlertCountChart from "@/components/AlertCountChart";
import AlertTypeChart from "@/components/AlertTypeChart";
import RankList from "@/components/RankList";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { GiCctvCamera } from "react-icons/gi";
import axios from "axios";

const DashBoardPage = () => {
    
    const [data, setData] = useState([]);
    // const [data, setData] = useState({});

    

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // const response = await axiosInstance.get('/get_all_driver_details');
            const response = await axios.get('/api/dashboard');
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            showErrorNotification('Server ERROR');
            console.error('Error fetching driver details:', error);

        }
    };

    // const sortedData = useMemo(() => {
    //     return [...data].sort((a, b) => b.total_safety_score - a.total_safety_score);
    // }, [data]);

    return (
        <main className="w-full p-2 md:px-4 lg:px-6 ">
            <Grid numItems={1} numItemsLg={12} className="gap-4">
                <Col numColSpan={1} numColSpanLg={3}>
                    <SafetyChart data={data} />
                    {/* <SafetyChart violationCount={data.violationCount} TotalScore={data.totalScore} /> */}

                </Col>
                <Col numColSpan={1} numColSpanLg={6}>
                    <AlertCountChart data={data} />
                </Col>
                <Col numColSpan={1} numColSpanLg={3}>
                    {/* <Card className="h-full bg-gradient-to-r from-violet-400 to-purple-400 ">
                        <span>
                            <Title className="text-white">Connected Devices</Title>
                            <Flex justifyContent="around" alignItems="center" className="md:mt-4">
                                <p
                                    className="text-9xl leading-none font-semibold text-white border-b-4 border-white"
                                >
                                    {data?.length}
                                    {/* {data?.deviceCount} 
                                </p>
                                <div className="p-4 w-32 h-32 border border-white bg-purple-400">
                                    < GiCctvCamera
                                        className='text-white w-24 h-24'
                                    />
                                </div>
                            </Flex>
                        </span>
                    </Card> */}
                    <Card className="h-full text-center">
                        <span>
                            <Title >Connected Devices</Title>
                            <p className="text-9x1 mt-4 font-semibold text-green">
                                {data?.length}
                            </p>
                        </span>
                    </Card>
                </Col>
                <Col numColSpan={1} numColSpanLg={7}>
                    <AlertTypeChart data={data} />
                </Col>
                <Col numColSpan={1} numColSpanLg={5}>
                    <RankList data={data} />
                </Col>
            </Grid>
        </main>
    );
}

export default DashBoardPage;





// const DashBoardPage = () => {
//   const [data, setData] = useState<DataType>([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get<{ data: DataType }>('/api/dashboard');
//       setData(response.data);
//     } catch (error) {
//       showErrorNotification('Server ERROR');
//       console.error('Error fetching driver details:', error);
//     }
//   };

//   const sortedData = useMemo(() => {
//     return [...data].sort((a, b) => b.total_safety_score - a.total_safety_score);
//   }, [data]);

//   return (
//     <main className="w-full p-2 md:px-4 lg:px-6 ">
//       <Grid numItems={1} numItemsLg={12} className="gap-4">
//         <Col numColSpan={1} numColSpanLg={3}>
//           <SafetyChart data={data} />
//         </Col>
//         <Col numColSpan={1} numColSpanLg={6}>
//           <AlertCountChart data={data} />
//         </Col>
//         <Col numColSpan={1} numColSpanLg={3}>
//           <Card className="h-full text-center">
//             <span>
//               <Title >Connected Devices</Title>
//               <p className="text-9xl mt-4 font-semibold text-emerald-400" >
//                 {data?.length}
//               </p>
//             </span>
//           </Card>
//         </Col>
//         <Col numColSpan={1} numColSpanLg={6}>
//           <AlertTypeChart data={data} />
//         </Col>
//         <Col numColSpan={1} numColSpanLg={6}>
//           <RankList data={sortedData} />
//         </Col>
//       </Grid>
//     </main>
//   );
// };

// export default DashBoardPage;