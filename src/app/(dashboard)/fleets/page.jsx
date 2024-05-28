'use client';
import { Badge, Button, Card, Flex, Metric, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, TextInput, Title } from "@tremor/react"
import { useEffect, useState } from "react";
import { HiSignal, HiSignalSlash } from "react-icons/hi2";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import AddFleet from "@/components/AddFleet";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";

const FleetPage = () => {
    // const [data,setData]=useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false); // Define isOpen state variable

    const handleSearch = (e) => {
        setSearchTerm(e)
        setCurrentPage(1);
    }
    const filteredlist = (person) => person.name.toLowerCase().includes(searchTerm.toLowerCase());
    const filteredData = dummydata.filter((item) => filteredlist(item));
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = filteredData?.slice(startIndex, endIndex);
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
                        Fleets
                    </Metric>
                    <Flex className="basis-1/3 gap-10 rounded-lg shadow-tremor-card bg-white p-3">
                        <SearchBar setSearchTerm={setSearchTerm} />
                        <AddFleet />
                    </Flex>
                </Flex>
                <Card className="px-2 md:px-3 lg:px-4">
                    <Flex className="w-full">
                        <Text className="font-semibold w-3/12 ">Name</Text>
                        <Text className="font-semibold w-2/12 text-center">E-mail</Text>
                        <Text className="font-semibold w-2/12 text-center">Mobile Number</Text>
                        {/* <Text className="font-semibold w-2/12 text-center">Associated Drivers</Text> */}
                        <Text className="font-semibold w-2/12 text-center">Vehicle Count</Text>
                        {/* <Text className="font-semibold w-1/12 text-right">Status</Text> */}
                    </Flex>
                </Card>
                <div className='space-y-4 my-4'>
                    {true && currentPageData.map((driver, index) => (
                        <Card className='py-3 w-full px-2 md:px-3 lg:px-4' key={index}>
                            <Flex  className="gap-4">
                                {/* <Link className="w-3/12" href={`/drivers/${driver.name}`}>
                                    <Image
                                        src={driver.profile_image}
                                        alt='Placeholderimage'
                                        width={40}
                                        height={40}
                                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white" />
                                    {driver.name}
                                </Link> */}
                                <Text className="sm:w-2/12 md:w-3/12  w-1/4">{driver.name}</Text>
                                <Text className="sm:w-2/12 text-center truncate w-1/4">{driver.email}</Text>
                                <Text className="sm:w-2/12 text-center w-1/4">{driver.mobile_number}</Text>
                                {/* <Text className="w-2/12 text-center">{driver.associated_drivers}</Text> */}
                                <Text className="sm:w-2/12 text-center w-1/4">{driver.vehicles_count}</Text>
                                {/* <span className="w-2/12 md:w-1/12 text-right">
                                    <Badge
                                        color={driver.status ? 'emerald' : 'red'}
                                        icon={driver.status ? HiSignal : HiSignalSlash}
                                        className="hidden lg:flex">
                                        {driver.status ? 'active' : 'inactive'}
                                    </Badge>
                                    <Icon
                                        icon={driver.status ? HiSignal : HiSignalSlash}
                                        color={driver.status ? 'emerald' : 'red'}
                                        variant="light"
                                        // tooltip="Sum of Sales"
                                        size="sm"
                                        className="lg:hidden"
                                    />
                                </span> */}
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

export default FleetPage;

const dummydata = [
    {
        name: "Cogvision",
        email: 'admin@cogvision.ai',
        mobile_number: '1234567890',
        associated_drivers: "Federal",
        vehicles_count: '7',
        status: true,
    },
    // {
    //     name: "Simonetta Sommaruga",
    //     email: 'amherd@gmail.com',
    //     mobile_number: '1234567890',
    //     associated_drivers: "Federal",
    //     vehicles_count: "14",
    //     status: true,
    // },
    // {
    //     name: "Alain Berset",
    //     email: 'amherd@gmail.com',
    //     mobile_number: '1234567890',
    //     associated_drivers: "Federal",
    //     vehicles_count: "12",
    //     status: false,
    // },
    // {
    //     name: "Ignazio Cassis",
    //     email: 'amherd@gmail.com',
    //     mobile_number: '1234567890',
    //     associated_drivers: "Federal",
    //     vehicles_count: "20",
    //     status: true,
    // },
    // {
    //     name: "Karin Keller-Sutter",
    //     email: 'amherd@gmail.com',
    //     mobile_number: '1234567890',
    //     associated_drivers: "Federal",
    //     vehicles_count: "50",
    //     status: true,
    // },
    // {
    //     name: "Guy Parmelin",
    //     email: 'amherd@gmail.com',
    //     mobile_number: '1234567890',
    //     associated_drivers: "Federal",
    //     vehicles_count: "5",
    //     status: false,
    // },
    // {
    //     name: "Elisabeth Baume-Schneider",
    //     email: 'amherd@gmail.com',
    //     mobile_number: '1234567890',
    //     associated_drivers: "Federal",
    //     vehicles_count: "10",
    //     status: false,
    // },
];