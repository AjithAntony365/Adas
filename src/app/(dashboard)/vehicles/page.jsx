'use client';
import { Button, Card, Flex, Metric, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, TextInput, Title } from "@tremor/react"
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import AddVehicle from "@/components/AddVehicle";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";

const VehiclePage = () => {
    // const [data,setData]=useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const filteredlist = (person) => person.license_plate.toLowerCase().includes(searchTerm.toLowerCase());
    const filteredData = dummydata.filter((item) => filteredlist(item));
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = filteredData?.slice(startIndex, endIndex);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm])
    // useEffect(() => {
    //         axios
    //             .get(`http://localhost:5000/`)
    //             .then((response) => {
    //                 setData(response.data);
    //             })
    //             .catch(err => console.error('Error fetching alerts details:', err));
    //     }, []);
    return (
        <>
            <main className="p-2 w-full ">
                <Flex className="w-full mb-4">
                    <Metric className="rounded-lg shadow-tremor-card bg-white p-3">
                        Vehicles
                    </Metric>
                    <Flex className="basis-1/3 gap-10 rounded-lg shadow-tremor-card bg-white p-3">
                        <SearchBar setSearchTerm={setSearchTerm} />
                        <AddVehicle />
                    </Flex>
                </Flex>
                <Card className="px-2 md:px-3 lg:px-4">
                    <Flex className="">
                        <Text className="font-semibold w-1/4 ">License Plate</Text>
                        <Text className="font-semibold w-1/4 text-center">Vehicle Type</Text>
                        <Text className="font-semibold w-1/4 text-center">Associated fleet ID </Text>
                        <Text className="font-semibold w-1/4 text-center">company ID</Text>
                    </Flex>
                </Card>
                <div className='space-y-4 my-4'>
                    {currentPageData.map((driver, index) => (
                        <Card className='py-3 w-full px-2 md:px-3 lg:px-4' key={index}>
                            <Flex>
                                {/* <Link className="w-3/12" href={`/drivers/${driver.name}`}>
                                    <Image
                                        src={driver.profile_image}
                                        alt='Placeholderimage'
                                        width={40}
                                        height={40}
                                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white" />
                                    {driver.name}
                                </Link> */}
                                <Text className="w-1/4 ">{driver.license_plate}</Text>
                                <Text className="w-1/4 text-center">{driver.vehicle_type}</Text>
                                <Text className="w-1/4 text-center">{driver.fleet_id}</Text>
                                <Text className="w-1/4 text-center">{driver.company_id}</Text>
                            </Flex>
                        </Card>
                    ))}
                </div>
                <Pagination
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            </main >

        </>
    )
}

export default VehiclePage;

const dummydata = [
    {
        license_plate: 'TN 75 A 1234',
        vehicle_type: 'SUV',
        fleet_id: '9876',
        company_id: '1234'
    },
    {
        license_plate: 'TN 75 A 1232',
        vehicle_type: 'SUV',
        fleet_id: '9876',
        company_id: '1234'
    },
    {
        license_plate: 'TN 75 A 1231',
        vehicle_type: 'SUV',
        fleet_id: '9876',
        company_id: '1234'
    },
    {
        license_plate: 'TN 75 A 1233',
        vehicle_type: 'SUV',
        fleet_id: '9876',
        company_id: '1234'
    },
    {
        license_plate: 'TN 75 A 1235',
        vehicle_type: 'SUV',
        fleet_id: '9876',
        company_id: '1234'
    },
    {
        license_plate: 'TN 75 A 1236',
        vehicle_type: 'SUV',
        fleet_id: '9876',
        company_id: '1234'
    },
    {
        license_plate: 'TN 75 A 1237',
        vehicle_type: 'SUV',
        fleet_id: '9876',
        company_id: '1234'
    },
];