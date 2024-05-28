import Image from "next/image";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Dialog, DialogPanel, Divider, Flex, Text, Title, Button } from '@tremor/react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { format } from 'date-fns';
import Link from "next/link";
export function ImageAlert({ data, currentIndex, setCurrentIndex }) {
    // const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    if (!data) {
        return null; // Return null if alertData  data is not available
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    console.log('ImageAlert', data);
    return (
        <div>
            <Link href={`/alert/${data?.[0]?.driver_name}/image`} className="text-xs border">all </Link>
            <Image
                src={data[currentIndex]?.imageReferences}
                alt='dynamic image'
                priority={true}
                width={200}
                height={100}
                className="w-auto h-40"
                onClick={openModal}
            />
            <Flex className="my-2">
                <Button
                    icon={FaAngleLeft}
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1))}
                />
                <p>{data[currentIndex]?.violation}</p>
                <Button
                    icon={FaAngleRight}
                    disabled={currentIndex === data?.length - 1}
                    onClick={() => setCurrentIndex(prevIndex => Math.min(data.length - 1, prevIndex + 1))}
                />
            </Flex>
            <Dialog open={isOpen} onClose={setIsOpen} static={true}>
                <DialogPanel className='lg:max-w-4xl'>
                    <Flex>
                        <Title>
                            {data[currentIndex]?.violation}
                        </Title>
                        <IoIosCloseCircleOutline aria-label="Close" className='text-2xl cursor-pointer' onClick={closeModal} />
                    </Flex>
                    <Divider className='my-2' />
                    <Flex className='gap-4'>
                        <div className='basis-2/5 space-y-2'>
                            {data[currentIndex].time_stamp && (
                                <Flex justifyContent='start' className='gap-3'>
                                    <Title>Time</Title>
                                    <Text> {format(data[currentIndex].time_stamp, 'HH:mm')}</Text>
                                </Flex>
                            )}
                            {data[currentIndex].time_stamp && ( // Conditionally render date only if alertData .timestamp exists
                                <Flex justifyContent='start' className='gap-3'>
                                    <Title>Date</Title>
                                    <Text>{format(data[currentIndex].time_stamp, 'dd-MMM-yyyy')}</Text>
                                </Flex>
                            )}
                            <Title>Vehicle</Title>
                            <Text>ID: {data[currentIndex]?.vehicle_name}</Text>
                            <Text>Fleet: Cogvision</Text>
                            <Flex justifyContent='start' className='gap-3'>
                                <Title>Speed</Title>
                                <Text>{data[currentIndex]?.speed}</Text>
                            </Flex>
                            <Text>Limit: {data[currentIndex]?.speed_limit}</Text>
                        </div>
                        <Image
                            src={data[currentIndex]?.imageReferences}
                            alt='dynamic image'
                            priority={true}
                            width={200}
                            height={100}
                            className="w-[30rem] h-full"
                        />
                    </Flex>
                </DialogPanel>
            </Dialog>
        </div>
    );
}
