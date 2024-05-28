"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import axiosInstance from "@/lib/axiosInstance";
import dynamic from 'next/dynamic';
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import PlaceholderImage from '../../../../../public/user_avatar.png';
import AlertsList from "@/components/AlertsList";
import SafetyScore from "@/components/SafetyScore";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import AlertDetails from "@/components/AlertDetails";
import { ComponentToPrint } from "@/components/ComponentToPrint";
import { Grid, Col, Flex, Card, Bold, Text, Metric, Button, Title, Subtitle, List, ListItem } from "@tremor/react";
import { showErrorNotification } from "@/lib/NotificationUtil";
import axios from "axios";
import useSWR from "swr";
import { MdCarCrash, MdMinorCrash } from "react-icons/md";
import { PiTrafficSignalFill } from "react-icons/pi";
import { RiCameraOffFill } from "react-icons/ri";
import { BiSleepy } from "react-icons/bi";
import { GiCigarette } from "react-icons/gi";
import { FaExclamationCircle, FaUser } from 'react-icons/fa';
import { FaPersonWalking, FaPhoneVolume, FaRoad } from "react-icons/fa6";
import { BsEmojiSunglasses } from "react-icons/bs";
import { VideoAlert } from "@/components/VideoAlert";
import { ImageAlert } from "@/components/ImageAlert";

// import MapComponent from "@/components/Maps";

const MapComponent = dynamic(() => import("../../../../components/Maps"), {
    loading: () => <div className="flex justify-center items-center w-full h-full">Loading Map...</div>,
    ssr: false,
});
const fetcher = url => axios.get(url).then(res => res.data)

const DriverProfile = ({ params }) => {
    const { data, error } = useSWR(`/api/drivers/${params?.driverName}`, fetcher, { refreshInterval: 1000 })
    if (error) {
        return null
    }
    // const [alertData, setAlertData] = useState([]);
    // const [safetyData, setSafetyData] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    // const [profileImg, setProfileImg] = useState('');
    const [showAlert, setShowAlert] = useState(null);
    const [routePoints, setRoutePoints] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        // fetchData();
        // setFilteredData(data?.alert_details);
        setFilteredData(data?.filteredimage);
    }, []);
    // Merge the two datasets based on violation name
    const listData = iconList?.map(item => {
        const violationData = data?.safety_details?.violations?.find(alert => alert.violation == item.name);
        if (violationData) {
            return {
                ...item,
                count: violationData.count,
                score: violationData.violation_score
            };
        } else {
            return {
                ...item,
                count: null,
                score: null
            };
        }
    });

    // const fetchData = async () => {
    //     try {
    //         // const response = await axiosInstance.get(`/driver/${params?.driverName}`);
    //         const response =
    //             // await axios.get(`/api/drivers/${params?.driverName}`);
    //             await fetch(`http://localhost:3000/api/drivers/${params?.driverName}`)
    //         const data = await response.json()
    //         // setAlertData(response.data.driver_alert_details);
    //         // setFilteredData(response.data.driver_alert_details);
    //         // setSafetyData(response.data.driver_safety_score[0]);
    //         // setAlertData(data.alert_details);
    //         setFilteredData(data.alert_details);
    //         // setSafetyData(data.safety_details[0]);
    //         // setProfileImg(data.driver_img);
    //     } catch (error) {
    //         showErrorNotification('Error fetching data. Please try again later.');
    //         console.error('Error fetching alerts details:', error);
    //     }
    // };
    // const [violationCounts, setViolationCounts] = useState({});

    // useEffect(() => {
    //     // Function to count violations
    //     const countViolations = () => {
    //         const counts = {};
    //         data?.alert_details?.forEach((item) => {
    //             counts[item.violation] = (counts[item.violation] || 0) + 1;
    //         });
    //         setViolationCounts(counts);
    //     };

    //     countViolations();
    // }, [data]);
    // 
    const [violationCounts, setViolationCounts] = useState({ ADAS: 0, DMS: 0 });
    // let violationCounts = useMemo(() => {
    //     const counts = { ADAS: 0, DMS: 0 };
    //     data?.alert_details?.forEach((item) => {
    //         if (isADASViolation(item.violation)) {
    //             counts.ADAS += 1;
    //         } else if (isDMSViolation(item.violation)) {
    //             counts.DMS += 1;
    //         }
    //     });
    //     return counts
    // }, [data])
    useEffect(() => {
        // Function to count violations
        const countViolations = () => {
            const counts = { ADAS: 0, DMS: 0 };
            // data?.alert_details?.forEach((item) => {
            data?.filteredimage?.forEach((item) => {
                if (isADASViolation(item.violation)) {
                    counts.ADAS += 1;
                } else if (isDMSViolation(item.violation)) {
                    counts.DMS += 1;
                }
            });
            setViolationCounts(counts);
        };

        countViolations();
    }, [data]);

    // Function to check if violation is ADAS
    const isADASViolation = (violation) => {
        const adasViolations = ["Forward_collision", "Lane_departure", "Head_way_warning", "Traffic_Signals", "pedestrian_collision"];
        return adasViolations.includes(violation);
    };

    // Function to check if violation is DMS
    const isDMSViolation = (violation) => {
        const dmsViolations = ["Camera_Blocking", "Phone_call", "Distracted_Driver", "Fatigue_Driver", "Smoking", "dont_wear_sunglasses", "Driver_Abnormal"];
        return dmsViolations.includes(violation);
    };

    useEffect(() => {
        if (filteredData) {
            setShowAlert(filteredData[currentIndex]);
        }
    }, [currentIndex, data]);
    console.log('filteredData', filteredData, currentIndex);
    return (
        <main className="p-2 w-full" id='your-map-container-id'>
            <Grid numItems={1} numItemsLg={9} className="gap-4">
                <Col numColSpan={1} numColSpanLg={2} className="">
                    <Flex flexDirection="col" justifyContent="start" className="h-full gap-4">
                        <Card className="relative mt-[72px] pt-14 z-0">
                            <div className="absolute -top-1/3 h-28 w-4/5">
                                <Flex justifyContent="center" alignItems="center">
                                    <div className="absolute h-full w-28 rounded-full -z-10 p-4 bg-slate-300 animate-pulse" />
                                    <Image
                                        src={data?.driver_img || PlaceholderImage}
                                        alt="Placeholderimage"
                                        priority={true}
                                        width={100}
                                        height={100}
                                        className="inline-block h-20 w-20 ring-8 ring-white rounded-full m-auto"
                                    />
                                </Flex>
                            </div>
                            <div className="text-center">
                                {/* <Bold>{params?.driverName}</Bold> */}
                                <Bold>{decodeURIComponent(params?.driverName)}</Bold>
                                <Flex>
                                    <div>
                                        <Text className="text-left">Total Distance:</Text>
                                        <Flex justifyContent="start" className="gap-1">
                                            <Metric>
                                                {data?.safety_details?.total_distance}
                                            </Metric>km
                                        </Flex>
                                    </div>
                                    <div>
                                        {/* <Text className="text-left">Total Alert:{data?.safety_details?.total_alerts}</Text> 
                                     <Subtitle>DMS : {listData && (listData?.filter(i => i.type == 'DMS')?.map(i => i.count)?.reduce((t, n) => t + n))}</Subtitle>
                                        <Subtitle>ADAS : {listData && (listData?.filter(i => i.type == 'ADAS')?.map(i => i.count)?.reduce((t, n) => t + n))}</Subtitle> */}
                                        <Text className="text-left">
                                            Total Alert:{violationCounts.DMS + violationCounts.ADAS}
                                        </Text>
                                        <Subtitle>DMS : {violationCounts.DMS}</Subtitle>
                                        <Subtitle>ADAS : {violationCounts.ADAS}</Subtitle>
                                    </div>
                                </Flex>
                            </div>
                        </Card>
                        <Card className="px-2 py-0 h-full">
                            {showAlert && (
                                <Flex
                                    flexDirection="col"
                                    justifyContent="between"
                                    alignItems="center"
                                    className="h-full"
                                >
                                    {/* <AlertDetails alertData={showAlert} /> */}

                                    {/* <Flex className="my-2">
                                        <Button
                                            icon={FaAngleLeft}
                                            disabled={currentIndex === 0}
                                            onClick={() => setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1))}
                                        />
                                        <Title className="text-center truncate">{showAlert?.violation}</Title>
                                        <Button
                                            icon={FaAngleRight}
                                            disabled={currentIndex === filteredData?.length - 1}
                                            onClick={() => setCurrentIndex(prevIndex => Math.min(filteredData.length - 1, prevIndex + 1))}
                                        />
                                    </Flex> */}
                                    {/* <video key={showAlert?._id} controls className="mx-auto h-44">
                                        <source src={showAlert?.videoReferences} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video> */}
                                    <ImageAlert
                                        // data={data?.filteredimage}
                                        data={filteredData}
                                        currentIndex={currentIndex}
                                        setCurrentIndex={setCurrentIndex}
                                    // filteredData
                                    />
                                    <VideoAlert
                                        data={data?.filteredvideo}
                                    />
                                </Flex>
                            )}
                        </Card>
                    </Flex>

                </Col>
                <Col numColSpan={1} numColSpanLg={7}>
                    <Flex className="gap-4 mb-4 md:h-64 flex-col md:flex-row" alignItems='stretch'>
                        <SafetyScore
                            totalScore={data?.safety_details?.total_safety_score}
                            // safetyData={data?.safety_details?.violations}
                            listData={listData}
                        />
                        <AlertsList
                            // alertData={data?.alert_details}
                            alertData={data?.filteredimage}
                            setShowAlert={setShowAlert}
                            filteredData={filteredData}
                            setFilteredData={setFilteredData}
                            setCurrentIndex={setCurrentIndex}
                        />
                        <div className="w-full ">
                            <Card className="pb-1 p-3 mb-2 text-center">
                                <ComponentToPrint
                                    data={filteredData}
                                    ref={componentRef}
                                />
                                <Button
                                    className="animate-bounce bg-slate-600 hover:bg-slate-500"
                                    onClick={handlePrint}
                                >
                                    Download as PDF
                                </Button>
                            </Card>
                            <Card className="overflow-auto p-2 ">
                                <Subtitle className="text-center">Routes</Subtitle>
                                <List className="h-36 overflow-auto scroll-container">
                                    {routeData.map(item => (
                                        <ListItem
                                            key={item._id}
                                            onClick={() => setRoutePoints(item.points)}
                                            className="cursor-pointer">
                                            <span>{item.date && format(item.date, 'dd-MMM-yyyy')}</span>
                                            <span>
                                                {/* {item.time && format(item.time, 'HH:mm')}  */}
                                                {item.time}
                                            </span>
                                            <div className="whitespace-normal break-words text-right w-1/3">{item.distance}</div>
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>
                        </div>
                    </Flex>
                    <Card className="h-[29rem] p-2 " >
                        <MapComponent
                            routePoints={routePoints}
                        />
                    </Card>
                </Col>
            </Grid>
        </main >
    )
}

export default DriverProfile;

const iconList = [
    {
        name: 'Camera_Blocking',
        icon: RiCameraOffFill,
        type: 'DMS'
    },
    {
        name: 'Phone_call',
        icon: FaPhoneVolume,
        type: 'DMS'
    },
    {
        name: 'Distracted_Driver',
        icon: FaExclamationCircle,
        type: 'DMS'
    },
    {
        name: 'Fatigue_Driver',
        icon: BiSleepy,
        type: 'DMS'
    },
    {
        name: 'Smoking',
        icon: GiCigarette,
        type: 'DMS'
    },
    {
        name: 'Forward_collision',
        icon: MdCarCrash,
        type: 'ADAS'
    },
    {
        name: 'pedestrian_collision',
        icon: FaPersonWalking,
        type: 'ADAS'
    },
    {
        name: 'Head_way_warning',
        icon: MdMinorCrash,
        type: 'ADAS'
    },
    {
        name: 'dont_wear_sunglasses',
        icon: BsEmojiSunglasses,
        type: 'DMS'
    },
    {
        name: 'Lane_departure',
        icon: FaRoad,
        type: 'ADAS'
    },
    {
        name: 'Driver_Abnormal',
        icon: FaUser,
        type: 'DMS'
    },
    {
        name: 'Traffic_Signals',
        icon: PiTrafficSignalFill,
        type: 'ADAS'
    },
];



const routeData = [{
    _id: '01',
    time: '12:45',
    date: '01-01-2024',
    distance: '15km',
    points: [{
        startPoint: [12.9752, 77.6047],
        endPoint: [13.1986, 77.7066],
    }],
},
{
    _id: '02',
    time: '12:45',
    date: '02-01-2024',
    distance: '24km',
    points: [{
        startPoint: [12.9369, 77.6227],
        endPoint: [12.9717, 77.5946],
    }],
},
{
    _id: '03',
    time: '12:45',
    date: '06-01-2024',
    distance: '15km',
    points: [{
        startPoint: [12.9752, 77.6047],
        endPoint: [13.1986, 77.7066],
    }],
},
{
    _id: '04',
    time: '12:45',
    date: '04-01-2024',
    distance: '24km',
    points: [{
        startPoint: [12.9369, 77.6227],
        endPoint: [12.9717, 77.5946],
    }],
},
{
    _id: '05',
    time: '22:45',
    date: '04-01-2024',
    distance: '15km',
    points: [{
        startPoint: [12.9752, 77.6047],
        endPoint: [13.1986, 77.7066],
    }
    ]
},
{
    _id: '06',
    time: '12:45',
    date: '03-01-2024',
    distance: '24km',
    points: [{
        startPoint: [12.9369, 77.6227],
        endPoint: [12.9717, 77.5946],
    }],
}, {
    _id: '07',
    time: '12:45',
    date: '07-01-2024',
    distance: '15km',
    points: [{
        startPoint: [12.9752, 77.6047],
        endPoint: [13.1986, 77.7066],
    }],
},
{
    _id: '08',
    time: '12:45',
    date: '04-01-2024',
    distance: '24km',
    points: [{
        startPoint: [12.9369, 77.6227],
        endPoint: [12.9717, 77.5946],
    }],
}, {
    _id: '09',
    time: '12:45',
    date: '02-01-2024',
    distance: '15km',
    points: [{
        startPoint: [12.9752, 77.6047],
        endPoint: [13.1986, 77.7066],
    }],
},
{
    _id: '10',
    time: '12:25',
    date: '03-01-2024',
    distance: '24km',
    points: [{
        startPoint: [12.9369, 77.6227],
        endPoint: [12.9717, 77.5946],
    }],
},]