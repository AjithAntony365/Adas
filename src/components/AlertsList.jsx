import { Card, DateRangePicker, List, ListItem, Title } from "@tremor/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const AlertsList = ({ alertData, setShowAlert, filteredData, setFilteredData, setCurrentIndex }) => {
    // const [filteredData, setFilteredData] = useState(alertData);
    const [dateRange, setDateRange] = useState({});
    // console.log("props",alertData, filteredData);
    useEffect(() => {
        if (alertData) {
            const filterAndSortData = () => {
                let filterData = alertData;
                if (dateRange.from) {
                    const { from, to } = dateRange;
                    // console.log(from, to );
                    filterData = alertData.filter(item => {
                        const timestamp = new Date(item?.timestamp);
                        if (from && to) {
                            // console.log('from&to');
                            return timestamp >= from && timestamp < new Date(to.getTime() + 24 * 60 * 60 * 1000); // Add one day to 'to'
                        } else if (from) {
                            // console.log('from');
                            return timestamp >= from && timestamp < new Date(from.getTime() + 24 * 60 * 60 * 1000);;
                        }
                    });
                }
                // return filterData?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                return filterData;
            };
            const sortedAndFilteredData = filterAndSortData();
            setFilteredData(sortedAndFilteredData);
        }
    }, [dateRange, alertData]);

    useEffect(() => {
        setShowAlert(filteredData?.[0])
        // console.log('filteredDatauseEffect');
        setCurrentIndex(0)
    }, [filteredData])
    return (
        <Card className="p-2 ">
            <div className="bg-slate-600 p-2 rounded-xl">
                <Title className="text-center text-white">Alerts</Title>
                <DateRangePicker
                    value={dateRange}
                    onValueChange={setDateRange}
                    maxDate={new Date()}
                    enableYearNavigation={true}
                    enableSelect={false}
                    className="w-64 z-20"
                />
            </div>
            <List className="h-40 overflow-auto scroll-container">
                {filteredData?.map((item, idx) => (
                    <ListItem
                        key={item._id}
                        onClick={() => { setShowAlert(item), setCurrentIndex(idx) }}
                        className="cursor-pointer"
                    >
                            {(() => {
                                try {
                                    return (
                                        <>
                                            <span>{item.timestamp ? format(item.timestamp, 'HH:mm') : 'No Data'}</span>
                                            <span>{item.timestamp ? format(item.timestamp, 'dd-MMM-yyyy') : 'No Data'}</span>
                                        </>

                                    );
                                } catch (error) {
                                    // console.error('Error formatting time:', error);
                                    return 'Invalid time format';
                                }
                            })()}
   
                        {/*  <span>
                        {(() => {
                                try {
                                    return item.timestamp ? format(item.timestamp, 'dd-MMM-yyyy') : '';
                                } catch (error) {
                                    console.error('Error formatting time:', error);
                                    return 'Invalid time format';
                                }
                            })()}
                            {/* {item.timestamp
                                ? format(item.timestamp, '')
                                : 'Invalid date format'} 
                        </span> */}

                        <div className="whitespace-normal break-words text-right w-1/3">{item.violation}</div>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};

export default AlertsList;