'use client';
import { Badge, Button, Card, Flex, Icon, Metric, Text, TextInput } from "@tremor/react"
import { useEffect, useState } from "react";
import { HiSignal, HiSignalSlash } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import AddDriver from "@/components/AddDriver";
import axiosInstance from "@/lib/axiosInstance";
import Pagination from "@/components/Pagination";
import { showErrorNotification } from "@/lib/NotificationUtil";
import { useAuth } from "@/lib/useAuth";
import axios from "axios";

const DriverPage = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false); // Define isOpen state variable

    const handleSearch = (e) => {
        setSearchTerm(e);
        setCurrentPage(1);
    };

    useEffect(() => {
        fetchData();
        // useAuth()
    }, []);

    const fetchData = async () => {
        try {
            // const response = await axiosInstance.get('/register_driver_data');
            const response = await axios.get('/api/drivers');
            console.log('response', response);
            setData(response.data.register_driver_data);
        } catch (error) {
            console.error('Error fetching driver data:', error);
            showErrorNotification('Error fetching driver data')
        }
    };

    const filteredData = data?.filter((item) => item.driver_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = filteredData?.slice(startIndex, endIndex);

    const openModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <main className="p-2 w-full">
            <Flex className="w-full mb-4">
                <Metric className="rounded-lg shadow-tremor-card bg-white p-3">
                    Drivers
                </Metric>
                <Flex className="basis-1/3 gap-10 rounded-lg shadow-tremor-card bg-white p-3">
                    <div className="relative md:hidden">
                        <Button icon={FaSearch} onClick={openModal} />
                        {isOpen && (
                            <Card className="absolute w-30 z-10 p-2">
                                <TextInput
                                    className=""
                                    icon={FaSearch}
                                    placeholder="Search..."
                                    onValueChange={handleSearch}
                                />
                            </Card>
                        )}
                    </div>
                    <TextInput
                        className="hidden md:flex"
                        icon={FaSearch}
                        placeholder="Search..."
                        onValueChange={handleSearch}
                    />
                    <AddDriver fetchData={fetchData} />
                </Flex>
            </Flex>
            <Card className="px-1 md:px-3 py-3">
                <Flex className="">
                    <Text className="font-semibold w-2/12 md:w-3/12 ">Name</Text>
                    <Text className="font-semibold w-2/12 text-center">Mobile Number</Text>
                    <Text className="font-semibold w-2/12 text-center hidden md:block">Driver ID</Text>
                    <Text className="font-semibold w-2/12 text-center hidden md:block">Vehicle Type</Text>
                    <Text className="font-semibold w-2/12 text-center">Vehicles Assigned</Text>
                    <Text className="font-semibold w-2/12 md:w-1/12 text-right">Status</Text>
                </Flex>
            </Card>
            <div className="space-y-4 my-4 overflow-auto">
                {currentPageData?.map((driver, index) => (
                    <Card className="py-2 w-full px-1 md:px-4 " key={index}>
                        <Flex>
                            <Link className="w-2/12 md:w-3/12 flex items-center text-xs md:text-sm lg:text-base" href={`/drivers/${driver?.driver_name}`}>
                                <Image
                                    src={driver?.image_path}
                                    alt="Placeholderimage"
                                    width={40}
                                    height={40}
                                    className="inline-block w-6 h-6 sm:h-10 sm:w-10 rounded-full ring-2 ring-white mr-2"
                                />
                                <div>{driver?.driver_name}</div>
                            </Link>
                            <Text className="w-2/12 text-center text-xs md:text-sm lg:text-base">{driver?.contact_number}</Text>
                            <Text className="w-2/12 text-center text-sm lg:text-base hidden md:block">{driver?.driverId}</Text>
                            <Text className="w-2/12 text-center text-sm lg:text-base hidden md:block">{driver?.vehicleType}</Text>
                            <Text className="w-2/12 text-center text-xs md:text-sm lg:text-base">{driver?.vehicle_name}</Text>
                            <span className="w-2/12 md:w-1/12 text-right">
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
                            </span>
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
        </main>
    );
};

export default DriverPage;

