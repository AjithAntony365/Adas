import { Card, CategoryBar, Col, Flex, Grid, Icon, Text } from "@tremor/react"
import { useEffect, useState } from "react"
// import { MdCarCrash, MdMinorCrash } from "react-icons/md";
// import { PiTrafficSignalFill } from "react-icons/pi";
// import { RiCameraOffFill } from "react-icons/ri";
// import { BiSleepy } from "react-icons/bi";
// import { GiCigarette } from "react-icons/gi";
// import { FaExclamationCircle, FaUser } from 'react-icons/fa';
// import { FaPersonWalking, FaPhoneVolume, FaRoad } from "react-icons/fa6";
// import { BsEmojiSunglasses } from "react-icons/bs";

const SafetyScore = ({ totalScore, safetyData,listData }) => {
    const [safetyScore, setSafetyScore] = useState(totalScore);
    // const [listData, setListData] = useState([]);
    if (!listData) return; 
    // useEffect(() => {
    //     if (!safetyData) return; // Guard against null or undefined safetyData
    //     const listData = iconList?.map(item => {
    //         const matchingAlert = safetyData?.find(alert => item.name == alert.violation);
    //         const score = matchingAlert ? matchingAlert.violation_score : null;
    //         return { violation: item.name, icon: item.icon, score };
    //     });
    //     setListData(listData);
    // }, [safetyData]);

    const getScoreColor = (score) => {
        if (score >= 1 && score <= 20) {
            return 'text-rose-500';
        } else if (score > 20 && score <= 50) {
            return 'text-orange-500';
        } else if (score > 50 && score <= 80) {
            return 'text-yellow-500';
        } else if (score > 80 && score <= 100) {
            return 'text-emerald-500';
        } else {
            return 'text-gray-800'; // Default color for scores out of specified ranges
        }
    };

    const xy = safetyScore || (safetyScore === null ? "Nil" : totalScore);
    return (
        <Card className="p-3">
            <Flex>
                <Text className="font-bold cursor-pointer"><span onClick={() => setSafetyScore(totalScore)}>Safety Score</span></Text>
                <Text className={`${getScoreColor(xy)} font-bold text-xl`}>{xy || ''}</Text>
            </Flex>
            <CategoryBar
                values={[20, 30, 30, 20]}
                colors={["rose", "orange", "yellow", "emerald"]}
                markerValue={xy}
                className="mt-3"
            />
            <Grid numItems={4} className="gap-2 mt-4">
                {listData?.map((item) => (
                    <Col key={item.name} className="text-center">
                        <Icon
                            onClick={() => setSafetyScore(item.score)}
                            className="text-white bg-slate-600 shadow-tremor-input rounded-tremor-default hover:bg-slate-500 p-2 mx-auto cursor-pointer"
                            tooltip={item.name}
                            icon={item.icon}
                        />
                    </Col>
                ))}
            </Grid>
        </Card>
    );
};

export default SafetyScore;

// const iconList = [
//     {
//         name: 'Covering Camera',
//         icon: RiCameraOffFill
//     },
//     {
//         name: 'Phone calls',
//         icon: FaPhoneVolume
//     },
//     {
//         name: 'Distraction',
//         icon: FaExclamationCircle
//     },
//     {
//         name: 'Fatigue',
//         icon: BiSleepy
//     },
//     {
//         name: 'Driver Smoking',
//         icon: GiCigarette
//     },
//     {
//         name: 'Collision detection',
//         icon: MdCarCrash
//     },
//     {
//         name: 'Pedestrian detection',
//         icon: FaPersonWalking
//     },
//     {
//         name: 'Too close distance',
//         icon: MdMinorCrash
//     },
//     {
//         name: 'Sunglass',
//         icon: BsEmojiSunglasses
//     },
//     {
//         name: 'Lane departure',
//         icon: FaRoad
//     },
//     {
//         name: 'Driver Anomaly',
//         icon: FaUser
//     },
//     {
//         name: 'Traffic Signals detection',
//         icon: PiTrafficSignalFill
//     },
// ]