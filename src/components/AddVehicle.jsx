import { Dialog, Transition } from '@headlessui/react'

import { Bold, Button, Col, Grid, Select, SelectItem, Text, TextInput } from '@tremor/react'
import Image from 'next/image'
import { Fragment, useRef, useState } from 'react'
import Placeholderimage from '../../public/user_avatar.png';
import { FaPlus } from 'react-icons/fa6';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Form, Formik } from 'formik';
import { FormInput, FormSelect } from './FormInput';
import * as Yup from 'yup';
export default function AddVehicle() {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const initialValues = {
        license_plate: '',
        vehicle_type: '',
        fleet_id: '',
        company_id: '',

    };

    const validationSchema = Yup.object().shape({
        license_plate: Yup.string().required('License Plate is required'),
        vehicle_type: Yup.string().required('Vehicle Type is required'),
        fleet_id: Yup.string().required('Fleet Id is required'),
        company_id: Yup.string().required('Company Id is required'),

    });

    const handleSubmit = (values, { resetForm }) => {
        console.log('values', values);
        resetForm();
        closeModal()
    };

    return (
        <>
            <Button icon={FaPlus} onClick={openModal} />

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold leading-6 text-gray-900 flex justify-between"
                                    >
                                        Add Vehicle Form
                                        <IoIosCloseCircleOutline className='text-2xl cursor-pointer' onClick={closeModal} />
                                    </Dialog.Title>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        validateOnBlur={false}
                                        validateOnChange={false}
                                        onSubmit={handleSubmit}>
                                        {({ setFieldValue, values }) => (
                                            <Form>
                                                <div className="mt-2 overflow-auto">
                                                    <Grid numItems={1} numItemsLg={2} className="gap-4 p-1">
                                                        <Col numColSpan={1} numColSpanLg={2}>
                                                            <FormInput
                                                                name='license_plate'
                                                                type='text'
                                                                label='License Plate'
                                                                placeholder='Enter License Plate'
                                                                className='' />
                                                        </Col>
                                                        <Col numColSpan={1} numColSpanLg={2}>
                                                            <FormInput
                                                                name='vehicle_type'
                                                                type='text'
                                                                label='Vehicle Type'
                                                                placeholder='Enter Vehicle Type'
                                                                className='' />
                                                        </Col>
                                                        <Col numColSpan={1} numColSpanLg={2}>
                                                            <FormInput
                                                                name='fleet_id'
                                                                type='text'
                                                                label='Fleet Id'
                                                                placeholder='Enter fleet Id'
                                                                className='' />
                                                        </Col>
                                                        <Col numColSpan={1} numColSpanLg={2}>
                                                            <FormInput
                                                                name='company_id'
                                                                type='text'
                                                                label='company Id'
                                                                placeholder='Enter company Id'
                                                                className='' />
                                                        </Col>
                                                    </Grid>
                                                </div>
                                                <div className="mt-4">
                                                    <Button
                                                        type='submit'
                                                        variant='secondary'
                                                        className='w-full'
                                                    >
                                                        Add
                                                    </Button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
};