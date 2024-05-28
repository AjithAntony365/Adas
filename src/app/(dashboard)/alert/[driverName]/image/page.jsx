"use client";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { showErrorNotification } from "@/lib/NotificationUtil";
import { Card, Col, DateRangePicker, Dialog, DialogPanel, Grid, Subtitle, Text, Title } from "@tremor/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = url => axios.get(url).then(res => res.data)
const ImageAlertPage = ({ params }) => {
    const { driverName } = params;
    const { data, error } = useSWR(`/api/drivers/${driverName}`, fetcher, { refreshInterval: 1000 });
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    // Compute filtered data based on searchTerm
    // const filteredData = data?.filteredimage?.filter(item => item?.violation.toLowerCase().includes(searchTerm.toLowerCase()));

    // const [itemsPerPage, setItemsPerPage] = useState(10);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [dateRange, setDateRange] = useState({});
    // if (error) {
    //     return null
    // }
    // const filteredData = data?.filter((item) => item.driver_name.toLowerCase().includes(searchTerm.toLowerCase()));
    // const totalPages = Math.ceil(data?.length / itemsPerPage);
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const currentPageData = filteredData?.slice(startIndex, endIndex);
    useEffect(() => {
        //     // Redirect to the Not Found page if productName is not valid
        const validProductNames = ['John', 'kumar', 'Rehman', 'Jes', 'Ria', 'Qadir', 'Don', 'Dan', 'Suman'];
        console.log('validProductNames', validProductNames.includes(driverName));
        if (driverName && !validProductNames.includes(driverName)) {
            console.log('driverName', driverName);
            router.push('/404');
            // return (<Card className="max-w-md mx-auto text-center overflow-auto space-y-4">
            //     <Title>Something went wrong!</Title>
            //     <Subtitle color='red'>No Driver Found</Subtitle>
            // </Card>)
        }
    }, [driverName]);

    if (error) {
        console.log('error', error);
        showErrorNotification(error?.message)
        // return <Card className="max-w-md mx-auto text-center overflow-auto space-y-4">
        //     <Title>Something went wrong!</Title>
        //     <Subtitle color='red'>{error?.message}</Subtitle>
        // </Card>
    }
    // console.log('data', data?.filteredimage);
    // useEffect(() => {
    //     if (alertData) {
    //         const filterAndSortData = () => {
    //             let filterData = alertData;
    //             if (dateRange.from) {
    //                 const { from, to } = dateRange;
    //                 // console.log(from, to );
    //                 filterData = alertData.filter(item => {
    //                     const timestamp = new Date(item?.timestamp);
    //                     if (from && to) {
    //                         // console.log('from&to');
    //                         return timestamp >= from && timestamp < new Date(to.getTime() + 24 * 60 * 60 * 1000); // Add one day to 'to'
    //                     } else if (from) {
    //                         // console.log('from');
    //                         return timestamp >= from && timestamp < new Date(from.getTime() + 24 * 60 * 60 * 1000);;
    //                     }
    //                 });
    //             }
    //             // return filterData?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    //             return filterData;
    //         };
    //         const sortedAndFilteredData = filterAndSortData();
    //         setFilteredData(sortedAndFilteredData);
    //     }
    // }, [dateRange, alertData]);

    return (
        <main className="p-2">
            {/* <SearchBar setSearchTerm={setSearchTerm} /> */}
            {/* <DateRangePicker
                value={dateRange}
                onValueChange={setDateRange}
                maxDate={new Date()}
                enableYearNavigation={true}
                enableSelect={false}
                className="w-64 z-20"
            /> */}
            <Grid numItems={1} numItemsLg={4} className="gap-3 p-2">
                {
                    data?.filteredimage?.map(item => <AlertBox key={item._id} item={item} />)
                }
            </Grid>
            {/* <Pagination
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                currentPage={currentPage}
            /> */}

        </main>
    )
}

export default ImageAlertPage;

const AlertBox = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Col numColSpan={1}>
            <Card className="p-2 text-center">
                <Image
                    src={item?.imageReferences}
                    alt=""
                    width={150}
                    height={100}
                    className="w-full max-h-min"
                    onClick={() => setIsOpen(prevState => !prevState)}
                />
                <Subtitle className="my-2">{item?.violation}</Subtitle>
                <Text>
                    {item?.timestamp}
                </Text>
            </Card>
            <Dialog open={isOpen} onClose={setIsOpen} static={true}>
                <DialogPanel className='lg:max-w-4xl'>
                <Image
                    src={item?.imageReferences}
                    alt=""
                    width={500}
                    height={500}
                    className="w-full "
                    // onClick={() => setIsOpen(prevState => !prevState)}
                />
                </DialogPanel>
            </Dialog>
        </Col>
    )
}