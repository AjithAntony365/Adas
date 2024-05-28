
import * as Yup from 'yup';
import { Button, Col, DateRangePicker, Dialog, DialogPanel, Flex, Grid, Text, Title } from '@tremor/react';
import { useRef, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import Image from 'next/image';
import Placeholderimage from '../../public/user_avatar.png';
import { showErrorNotification, showSuccessNotification } from '@/lib/NotificationUtil';
import { FaPlus } from 'react-icons/fa6';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Form, Formik } from 'formik';
import { FormInput, FormSelect } from './FormInput';
import axios from 'axios';
// import { utils, write } from 'xlsx';
// import { saveAs } from 'file-saver';

const Addcompany = ({ fetchData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dateRange, setDateRange] = useState(null)
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const validationSchema = true
    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {

            // Check if an image is selected
            if (!selectedImage) {
                showErrorNotification('Please select an image.');
                return;
            }

            const formData = new FormData();
            formData.append('driver_name', values.driver_name);
            formData.append('driverId', values.driverId);
            formData.append('contact_number', values.contact_number);
            formData.append('vehicle_name', values.vehicle_name);
            formData.append('vehicleType', values.vehicleType);
            formData.append('image', selectedImage);

            // const response = await axiosInstance.post('/register', formData);
            const response = await axios.post('/api/drivers', formData);
            console.log(response);
            if (response.status === 200) {
                resetForm();
                setSelectedImage(null);
                closeModal();
                showSuccessNotification(response.data.message);
                fetchData();
            } else {
                showErrorNotification('Failed to add driver');
            }
        } catch (error) {
            console.error('Error posting data with image:', error);
            showErrorNotification('An error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <>
            <Button icon={FaPlus} onClick={openModal} />
            <Dialog open={isOpen} onClose={closeModal} static={true}>
                <DialogPanel className='md:max-w-screen-md'>
                    <Flex className="justify-end">
                        <button type="button" class="text-white bg-black border border-gray-300 focus:outline-none hover:bg-blue-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Import Excel</button>
                        <button type="button" class="text-white bg-black border border-gray-300 focus:outline-none hover:bg-blue-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Export Excel</button>
                        {/* <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Modifay Excel</button> */}
                        <Excel />
                          </Flex>
                    <Flex className='mb-3'>
                        <Title className='w-full hr'>Device and Company Details</Title>
                        <IoIosCloseCircleOutline className='text-2xl cursor-pointer' onClick={closeModal} />
                    </Flex>
                    <Formik
                        initialValues={{
                        }}
                        validationSchema={validationSchema}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue, values, isSubmitting }) => (
                            <Form>
                                <Grid numItems={1} numItemsLg={2} className="gap-4 p-1">
                                    <Col numColSpan={1} numColSpanLg={2}>
                                        <Col numColSpan={1} numColSpanLg={2} />
                                        <form>
                                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                                <div>
                                                    <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Device ID</label>
                                                    <input type="text" id="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Device ID" required />
                                                </div>
                                                <div>
                                                    <label for="Sim no" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SIM NO</label>
                                                    <input type="sim no" id="sim no" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="SIM NO" required />
                                                </div>

                                                <div className='col-span-2'>
                                                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                                                    <input type="text" id="company" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Company" required />
                                                </div>
                                            </div>
                                            <Flex className="mb-3">
                                                <Title>Driver Details</Title>
                                            </Flex>
                                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                                <div>
                                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Driver Name</label>
                                                    <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Driver name" required />
                                                </div>
                                                <div>
                                                    <label for="small" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SEX</label>
                                                    <select id="small" class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                        <option value="MALE">MALE</option>
                                                        <option value="FEMAL">FEMALE</option>
                                                        <option value="OTHER">OTHER</option>

                                                    </select>
                                                </div>
                                            </div>

                                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                                <div>
                                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Driver Contact Details</label>
                                                    <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Driver Contact Details" required />
                                                </div>
                                                <div>
                                                    <label for="Sim no" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nationaliy</label>
                                                    <input type="text" id="sim no" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nationality" required />
                                                </div>
                                            </div>
                                            <div>
                                                <label for="Sim no" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assigment Date</label>
                                                <DateRangePicker
                                                    value={dateRange}
                                                    onValueChange={setDateRange}
                                                    maxDate={new Date()}
                                                />

                                            </div>                                        <Flex className='mb-3 mt-2'>
                                                <Title>Vehicle Details</Title>
                                            </Flex>
                                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                                <div>
                                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle NO</label>
                                                    <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Vehicle NO" required />
                                                </div>
                                                <div>
                                                    <label for="Sim no" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle Type</label>
                                                    <input type="sim no" id="sim no" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Vehicle Type" required />
                                                </div>
                                            </div>
                                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                                <div>
                                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle Model</label>
                                                    <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Vehicle Model" required />
                                                </div>
                                                <div>
                                                    <label for="Sim no" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle Color</label>
                                                    <input type="sim no" id="sim no" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Vehicle" required />
                                                </div>
                                            </div>
                                            <Flex className="justify-end">
                                                <button
                                                    type="submit"
                                                    className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-40 px-5 py-2.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                            </Flex>
                                        </form>


                                        <Button
                                            type='submit'
                                            variant='secondary'
                                            className='w-full mt-4'
                                            loading={isSubmitting}
                                            loadingText='Adding...'
                                        >
                                            Add
                                        </Button>
                                    </Col>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </DialogPanel>
            </Dialog>
        </>
    )
}

export default Addcompany;

// function XLSXDownload() {
//     function handleDownload() {

//         const data = [
//             ['name','Age'],
//             ['john',28],
//             ['jane',24],
//         ];
//         const wb = utils.book_new();
//         const ws = utils.aoa_to_sheet(data);

//         utils.book_append_sheet(wb,ws,'sheet1');
//         const excelBuffer = write(wb,{ bookType: 'xlsx', type: 'array'} );
// const blob=new Blob([excelBuffer],{type:'appplication/octet-stream'});
//         saveAs(blob, 'example.xlsx');
//     };

//     return(
//         <div>
//             <button onClick={handleDownload}>EXCELDownload</button>
//         </div>
//     )
// }
function Excel() {
    const [excel, setExcel] = useState(true)
    function Clickme() {
        setExcel(!excel)

    }
    return (
        <>
            <button onClick={Clickme} type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Modifay Excel</button>
            {excel &&
                <div className='absolute right-0 top-20 bg-white border'>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                    <button type="button" class="text-gray-900 bg-white border top-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Download</button>
                    <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Save</button>
                </div>
            }

        </>
    )
}
