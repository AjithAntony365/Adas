import { Dialog, DialogPanel, Divider, Flex, Text, Title } from '@tremor/react';
import Image from 'next/image';
import { useState } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { format } from 'date-fns';

const AlertDetails = ({ alertData }) => {
    const [isOpen, setIsOpen] = useState(false);
    if (!alertData) {
        return null; // Return null if alertData  data is not available
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <>
            <Image
                src={alertData?.imageReferences}
                alt='dynamic image'
                priority={true}
                width={200}
                height={100}
                className="w-auto h-40"
                onClick={openModal}
            />
            <Dialog open={isOpen} onClose={setIsOpen} static={true}>
                <DialogPanel className='lg:max-w-4xl'>
                    <Flex>
                        <Title>
                            {alertData?.violation}
                        </Title>
                        <IoIosCloseCircleOutline aria-label="Close" className='text-2xl cursor-pointer' onClick={closeModal} />
                    </Flex>
                    <Divider className='my-2' />
                    <Flex className='gap-4'>
                        <div className='basis-2/5 space-y-2'>
                            {alertData.timestamp && (
                                <Flex justifyContent='start' className='gap-3'>
                                    <Title>Time</Title>
                                    <Text> {format(alertData.timestamp, 'HH:mm')}</Text>
                                </Flex>
                            )}
                            {alertData.timestamp && ( // Conditionally render date only if alertData .timestamp exists
                                <Flex justifyContent='start' className='gap-3'>
                                    <Title>Date</Title>
                                    <Text>{format(alertData.timestamp, 'dd-MMM-yyyy')}</Text>
                                </Flex>
                            )}
                            <Title>Vehicle</Title>
                            <Text>ID: {alertData?.vehicle_name}</Text>
                            <Text>Fleet: Cogvision</Text>
                            <Flex justifyContent='start' className='gap-3'>
                                <Title>Speed</Title>
                                <Text>{alertData?.speed}</Text>
                            </Flex>
                            <Text>Limit: {alertData?.speed_limit}</Text>
                        </div>
                        <Image
                            src={alertData?.imageReferences}
                            alt='dynamic image'
                            priority={true}
                            width={200}
                            height={100}
                            className="w-[30rem] h-full"
                        />
                    </Flex>
                </DialogPanel>
            </Dialog>
        </>
    );
}

export default AlertDetails;