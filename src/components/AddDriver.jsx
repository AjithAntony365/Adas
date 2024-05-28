import * as Yup from 'yup';
import { Button, Col, Dialog, DialogPanel, Flex, Grid, Text, Title } from '@tremor/react';
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

const AddDriver = ({ fetchData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setSelectedImage(imageFile);
    };

    const validationSchema = Yup.object().shape({
        driver_name: Yup.string()
            .trim()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must be at most 50 characters')
            .required('Name is required'),
        driverId: Yup.string()
            .trim()
            // .matches(/^[a-zA-Z0-9]+$/, 'DriverId must contain only letters and numbers')
            // .min(6, 'DriverId must be at least 6 characters')
            .max(20, 'DriverId must be at most 20 characters')
            .required('DriverId is required'),
        contact_number: Yup.string()
            .trim()
            .matches(/^[0-9]+$/, 'Mobile number must contain only digits')
            .min(10, 'Mobile number must be at least 10 digits')
            .max(15, 'Mobile number must be at most 15 digits')
            .required('Mobile number is required'),
        vehicle_name: Yup.string()
            .trim()
            .min(2, 'Vehicle Number must be at least 2 characters')
            .max(20, 'Vehicle Number must be at most 20 characters')
            .required('Vehicle Number is required'),
        vehicleType: Yup.string()
            .trim()
            // .oneOf(['car', 'truck', 'van', 'motorcycle'], 'Invalid Vehicle Type')
            .required('Vehicle Type is required'),
    });
    

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
                <DialogPanel>
                    <Flex>
                        <Title>Add Driver Form</Title>
                        <IoIosCloseCircleOutline className='text-2xl cursor-pointer' onClick={closeModal} />
                    </Flex>
                    <Formik
                        initialValues={{
                            driver_name: '',
                            contact_number: '',
                            driverId: '',
                            vehicle_name: '',
                            vehicleType: '',
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
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                            ref={fileInputRef}
                                        />
                                        <div
                                            onClick={() => fileInputRef.current.click()}
                                            className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden">
                                            {selectedImage ? (
                                                <Image
                                                    src={URL.createObjectURL(selectedImage)}
                                                    alt="Selected"
                                                    width={64}
                                                    height={64}
                                                    className="w-full h-full"
                                                />
                                            ) : (
                                                <Image
                                                    src={Placeholderimage}
                                                    alt="Empty"
                                                    className="w-full h-full" />
                                            )}
                                        </div>
                                    </Col>
                                    <Col numColSpan={1} numColSpanLg={2}>
                                        <FormInput
                                            name='driver_name'
                                            type='text'
                                            label='Driver Name'
                                            placeholder='John Doe'
                                            className='' />
                                    </Col>
                                    <Col numColSpan={1} numColSpanLg={2}>
                                        <FormInput
                                            name='driverId'
                                            type='text'
                                            label='Driver ID'
                                            placeholder="Driver ID"
                                            className='' />
                                    </Col>
                                    <Col numColSpan={1} numColSpanLg={2}>
                                        <FormInput
                                            name='contact_number'
                                            type='number'
                                            label='Phone Number'
                                            placeholder="+1 234 567 8901"
                                            className='' />
                                    </Col>

                                    <Col numColSpan={1} numColSpanLg={2}>
                                    <FormInput
                                            name='vehicleType'
                                            type='text'
                                            label='Vehicle Type'
                                            placeholder="Vehicle Type..."
                                            className='' />
                                        {/* <FormSelect
                                            setFieldValue={setFieldValue}
                                            value={values.vehicleType}
                                            name='vehicleType'
                                            label='Vehicle Type'
                                            itemOption={['Car', 'Cab', 'Truck']} /> */}
                                    </Col>

                                    <Col numColSpan={1} numColSpanLg={2}>
                                        <FormInput
                                            name='vehicle_name'
                                            type='text'
                                            label='Vehicle Number'
                                            placeholder="TN00AA0000"
                                            className='' />
                                    </Col>
                                </Grid>
                                <Button
                                    type='submit'
                                    variant='secondary'
                                    className='w-full mt-4'
                                    loading={isSubmitting}
                                    loadingText='Adding...'
                                >
                                    Add
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </DialogPanel>
            </Dialog>
        </>
    )
}

export default AddDriver;