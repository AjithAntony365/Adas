import { Dialog, Transition } from '@headlessui/react'
import { MultiSelect, MultiSelectItem } from "@tremor/react";
import { Bold, Button, Col, Grid, Select, SelectItem, Text, TextInput } from '@tremor/react'
import Image from 'next/image'
import { Fragment, useRef, useState } from 'react'
import Placeholderimage from '../../public/user_avatar.png';
import { FaPlus } from 'react-icons/fa6';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ErrorMessage, Form, Formik } from 'formik';
import { FormInput, FormMultiSelect, FormSelect } from './FormInput';
import * as Yup from 'yup';
export default function AddFleet() {
    let [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState("");
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const initialValues = {
        name: '',
        email: '',
        mobile_number: '',
        associated_drivers: [],
        vehicle_count: '',
        status: true,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        mobile_number: Yup.number('Enter only number').required('Mobile number is required'),
        associated_drivers: Yup.array()
            .of(Yup.string()
            // .oneOf(['Driver1'], 'Invalid role')
            )
            .min(1, 'At least one Driver is required')
            .required('Driver is required'),
        vehicle_count: Yup.string().required('Vehicles count is required'),
        // status: Yup.boolean().required('Status is required'),
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
                                        Add Fleet Form
                                        <IoIosCloseCircleOutline className='text-2xl cursor-pointer' onClick={closeModal} />
                                    </Dialog.Title>
                                    <Formik initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        validateOnChange={false}
                                        validateOnBlur={false}
                                        onSubmit={handleSubmit}>
                                        {({ setFieldValue, values }) => (
                                            <Form>
                                                <div className="mt-2 overflow-auto">
                                                    <Grid numItems={1} numItemsLg={2} className="gap-4 p-1">
                                                        <Col numColSpan={1} numColSpanLg={2}>
                                                            <FormInput name='name' type='text' label='Fleet Name' placeholder='Enter Fleet Name' className='' />
                                                        </Col>
                                                        <Col numColSpan={1} numColSpanLg={2}>
                                                            <FormInput name='email' type='email' label='E-mail' placeholder="f001@gmail.com" className='' />
                                                        </Col>
                                                        <Col numColSpan={1} numColSpanLg={2}>
                                                            <FormInput name='mobile_number' type='tel' label='Phone Number' placeholder="+1 234 567 8901" className='' />
                                                        </Col>
                                                        <Col numColSpan={1} numColSpanLg={2}>
                                                            <FormMultiSelect
                                                                name='associated_drivers'
                                                                label='Associated Drivers'
                                                                itemOption={['Driver1', 'Driver2', 'Driver3']}
                                                                setFieldValue={setFieldValue}
                                                                value={values.associated_drivers}
                                                            />
                                                        </Col>
                                                        <Col numColSpan={1} numColSpanLg={2}>
                                                            <FormInput
                                                                name='vehicle_count'
                                                                type='tel'
                                                                label='Vehicle Count'
                                                                placeholder="Enter the number of vehicle"
                                                                className='' />
                                                        </Col>                                     
                                                    </Grid>
                                                </div>

                                                <div className="mt-4">
                                                    <Button variant='secondary'
                                                        type='submit'
                                                        className='w-full'
                                                    >
                                                        Add
                                                    </Button>
                                                </div>
                                            </Form>)}
                                    </Formik>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}