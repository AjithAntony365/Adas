'use client';
import { useState, useMemo } from 'react';
import { addMonths, eachDayOfInterval, endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import { BarChart, Button, Card, Flex, LineChart, Title } from '@tremor/react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

const AlertCountChart = ({ data }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const countData = useMemo(() => {
        if (!data) return [];// Handle null or undefined data

        const labels = eachDayOfInterval({
            start: startOfMonth(currentDate),
            end: endOfMonth(currentDate)
        });

        const transformedData = data.reduce((result, driver) => {
            driver?.timestamps?.forEach(timestamp => {
                // const date = format(timestamp, 'yyyy-MM-dd')
                // result[date] = (result[date] || 0) + 1;
                try {
                    const date = format(timestamp, 'yyyy-MM-dd');
                    result[date] = (result[date] || 0) + 1;
                } catch (error) {
                    console.error('Error formatting timestamp:', error);
                }
            });
            return result;
        }, {});

        return labels.map(date => {
            const formattedDate = format(date, 'yyyy-MM-dd');
            const count = transformedData[formattedDate] || 0;
            return { date: formattedDate.slice(-2), count };
        });
    }, [currentDate, data]);
    return (
        <Card>
            <Flex className="">
                <Button
                    variant='light'
                    icon={FaArrowLeftLong}
                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                />
                <Title>{format(currentDate, 'MMMM yyyy')}</Title>
                <Button
                    variant='light'
                    icon={FaArrowRightLong}
                    disabled={startOfMonth(currentDate) >= startOfMonth(new Date)}
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                />
            </Flex>
            <div className="overflow-auto scroll-container">
                {/* <BarChart
                    className="w-[50rem] h-[10rem]"
                    data={countData}
                    index="date"
                    categories={['count']}
                    colors={["violet"]}
                    yAxisWidth={30}
                /> */}
                <LineChart
                    className="w-[50rem] h-[10rem]"
                    data={countData}
                    index="date"
                    categories={['count']}
                    colors={['violet']}
                    // valueFormatter={dataFormatter}
                    yAxisWidth={60}
                // onValueChange={(v) => console.log(v)}
                />

            </div>
        </Card>
    );
};

export default AlertCountChart;