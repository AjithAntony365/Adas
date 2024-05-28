"use client";
import { Button, Card, Flex, Text, Title } from "@tremor/react";
import { addMonths, addWeeks, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths, subWeeks } from "date-fns";
import { useMemo, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    // Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    // Title,
    Tooltip,
    Legend
);

const AlertTypeChart = ({ data }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentData, setCurrentData] = useState('Weekly');

    const transformedData = useMemo(() => {
        return data?.reduce((result, driver) => {
            let { timestamps, violations } = driver;
            const resultArray = timestamps.map((timestamp, index) => {
                try {
                    return {
                        violation: violations[index],
                        date: format(timestamp, 'yyyy-MM-dd'),
                    }
                } catch (error) {
                    console.error('Error formatting timestamp:', error);
                    return {}
                }
            });
            result = result || [];
            result = result.concat(resultArray);
            return result;
        }, []);
    }, [data]);
    const filterByMonth = () => {
        const currentMonth = format(currentDate, 'yyyy-MM');
        return transformedData?.filter(entry => entry?.date?.startsWith(currentMonth));
    };

    const filterByWeek = () => {
        const weekStart = startOfWeek(currentDate);
        const weekEnd = endOfWeek(currentDate);
        return transformedData?.filter(entry => {
            const entryDate = new Date(entry?.date);
            return entryDate >= weekStart && entryDate <= weekEnd;
        });
    };

    const mergedData = mergeAndCountViolations(filterByWeek(), filterByMonth());

    // function getScreenSize() {
    //     const width = window.innerWidth;
    //     if (width < 768) {
    //         return 'Mobile';
    //     } else if (width >= 768 && width < 1024) {
    //         return 'Tablet';
    //     } else {
    //         return 'Laptop/Desktop';
    //     }
    // }

    // // Example usage:
    // const screenSize = getScreenSize();
    // console.log('Screen size:', screenSize);


    const options = {
        responsive: true,
        // barThickness: 40,
        scales: {
            y: {
                ticks: {
                    beginAtZero: true
                }
            },
            x: {
                ticks: {
                    display: true, // Display x-axis label automatically
                    color: 'black',
                    font: {
                        size: 8,
                    },
                    callback: function (val, index) {
                        // Hide every 2nd tick label
                        let label = this.getLabelForValue(val); // Get the original label
                        switch (label) {
                            case 'Phone Calls':
                                label = 'Calls'
                                break;
                            // case 'Fatigue':
                            //     label = 'Sleep'
                            //     break;

                            default:
                                // label = label
                                break;
                        }
                        let words = label.split('_'); // Split the label into words
                        let lines = [];
                        let currentLine = '';

                        // Iterate over the words and create lines with maximum character limit (e.g., 10 characters)
                        words?.forEach(word => {
                            if ((currentLine + word).length <= 10) {
                                // Add the word to the current line if it fits
                                currentLine += (currentLine.length > 0 ? ' ' : '') + word;
                            } else {
                                // If adding the word exceeds the character limit, start a new line
                                lines.push(currentLine);
                                currentLine = word;
                            }
                        });

                        // Add the remaining words as the last line
                        if (currentLine.length > 0) {
                            lines.push(currentLine);
                        }

                        // return lines; // Return the array of lines as the label
                        return words;
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: false,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const combinedData = dataList.map(item => {
        const matchedWeeklyData = mergedData.find(weeklyItem => weeklyItem.violation === item.violation);
        return {
            ...item,
            ...matchedWeeklyData
        };
    });
    return (
        <Card className="max-h-96 h-full p-2 md:p-4 overflow-auto scroll-container">
            <Flex className="pb-4">
                <Title className="basis-2/5">Violation Type</Title>
                <div className="basis-3/5">
                    <Flex className="mb-2">
                        <Button
                            variant="light"
                            tooltip="This Week"
                            onClick={() => setCurrentData('Weekly')}
                        >
                            <Flex className="gap-1">
                                Weekly
                            </Flex>
                        </Button>
                        <Button
                            variant="light"
                            tooltip="This Month"
                            onClick={() => setCurrentData('Monthly')}
                        >
                            <Flex className="gap-1">
                                Monthly
                            </Flex>
                        </Button>
                    </Flex>
                    {currentData === 'Monthly' &&
                        <Flex className="">
                            <Button
                                variant='light'
                                icon={FaArrowLeftLong}
                                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                            />
                            <Text >{format(currentDate, 'MMM yyyy')}</Text>
                            <Button
                                variant='light'
                                icon={FaArrowRightLong}
                                disabled={startOfMonth(currentDate) >= startOfMonth(new Date)}
                                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                            />
                        </Flex>
                    }
                    {currentData === 'Weekly' &&
                        <Flex className="">
                            <Button
                                variant='light'
                                icon={FaArrowLeftLong}
                                onClick={() => { setCurrentDate(subWeeks(currentDate, 1)) }}
                            />
                            <Text>
                                {format(startOfWeek(currentDate), 'MMM dd')}
                                -
                                {format(endOfWeek(currentDate), 'MMM dd, yyyy')}
                            </Text>
                            <Button
                                variant='light'
                                icon={FaArrowRightLong}
                                disabled={startOfWeek(currentDate) >= startOfWeek(new Date)}
                                onClick={() => { setCurrentDate(addWeeks(currentDate, 1)) }}
                            />
                        </Flex>
                    }
                </div>
            </Flex>
            <Bar
                className=" w-10/12 h-10"
                data={{
                    labels: combinedData.map(item => item.violation),
                    datasets: [
                        {
                            label: currentData === 'Weekly' ? 'Weekly' : 'Monthly',
                            data: combinedData.map(item => item[currentData]),
                            backgroundColor: [
                                "#8b5cf6",
                                // "#5789aa",
                                // "#ffc063",
                                // "#df4313",
                                // "#87adc2",
                                // "#f87429",
                                // "#ffe984",
                                // "#ffd392",
                                // "#bcbcc9",
                                // "#2a283d",
                            ],
                        }
                    ]
                }}
                options={options}
            />
        </Card>
    )
}

export default AlertTypeChart;

const dataList = [
    {
        violation: 'Camera_Blocking',
        Weekly: 0,
        Monthly: 0
    },
    {
        violation: 'Phone_call',
        Weekly: 0,
        Monthly: 0
    },
    {
        violation: 'Distracted_Driver',
        Weekly: 0,
        Monthly: 0
    },
    {
        violation: "Fatigue_Driver",
        Weekly: 0,
        Monthly: 0
    },
    {
        violation: "Smoking",
        Weekly: 0,
        Monthly: 0
    },
    {
        violation: 'Forward_collision',
        Weekly: 0,
        Monthly: 0
    },
    {
        violation: 'pedestrian_collision',
        Weekly: 0,
        Monthly: 0
    },
    {
        violation: 'Head_way_warning',
        Weekly: 0,
        Monthly: 0
    },
    {
        violation: 'dont_wear_sunglasses',
        Weekly: 0,
        Monthly: 0
    },
    {
        violation: 'Lane_departure',
        Weekly: 0,
        Monthly: 0
    },
    {
        violation: 'Driver_Abnormal',
        Weekly: 0,
        Monthly: 0
    },
    {
        violation: 'Traffic_Signals',
        Weekly: 0,
        Monthly: 0
    },
];

const mergeAndCountViolations = (dataA, dataB) => {
    const WeeklyCounts = {};
    const MonthlyCounts = {};

    const updateViolationCounts = (data, counts) => {
        data?.forEach(entry => {
            const { violation } = entry;
            counts[violation] = (counts[violation] || 0) + 1;
        });
    };

    updateViolationCounts(dataA, WeeklyCounts);
    updateViolationCounts(dataB, MonthlyCounts);

    const combinedViolationCounts = { ...WeeklyCounts, ...MonthlyCounts };

    const result = Object.keys(combinedViolationCounts).map(violation => ({
        violation,
        Weekly: WeeklyCounts[violation] || 0,
        Monthly: MonthlyCounts[violation] || 0
    }));

    return result;
};