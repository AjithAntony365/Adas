'use client';
import { FormInput } from "@/components/FormInput";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from 'yup';
import { Button, Card, Flex, Text, Title } from "@tremor/react";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance";
import { showErrorNotification, showSuccessNotification } from "@/lib/NotificationUtil";
import axios from "axios";

const RegisterPage = () => {
    const router = useRouter();

    // Define the validation schema using Yup
    const validationSchema = Yup.object().shape({
        ownerName: Yup.string()
            .matches(/^[A-Za-z ]+$/, 'Owner name can only contain letters and spaces')
            .required('Owner name is required'),

        companyName: Yup.string()
            .matches(/^[A-Za-z ]+$/, 'Company name can only contain letters and spaces')
            .required('Company name is required'),

        phoneNumber: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
            .required('Phone number is required'),

        username: Yup.string()
            .min(4, 'Username must be at least 4 characters')
            .max(20, 'Username must be at most 20 characters')
            .required('Username is required'),

        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),

        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            ),
        confirmPassword: Yup.string()
            .required('Please confirm your password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),

    });

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        console.log('values', values);
        try {
            // const response = await axiosInstance.post('/user_register', values);
            const response = await axios.post('/api/register', values);

            if (response.status === 200) {
                showSuccessNotification(response.data.message);
                resetForm();
                router.push('/login');
            } else {
                showErrorNotification('Registration failed');
            }
        } catch (error) {
            showErrorNotification('Registration failed');
            console.error('Registration error:', error);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <>
            <Title className="text-2xl font-bold text-center">Create your account</Title>
            <Formik
                initialValues={{
                    ownerName: '',
                    companyName: '',
                    phoneNumber: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-2">
                        <FormInput label='Company Owner' placeholder="Owner Name" name="ownerName" type="text" />
                        <FormInput label='Company Name' placeholder="Name of the Company" name="companyName" type="text" />
                        <FormInput label='Phone Number' placeholder="Enter your Contact number" name="phoneNumber" type="tel" />
                        <FormInput label='Email' placeholder="Enter your Email" name="email" type="email" />
                        <FormInput label='Username' placeholder="Enter your username" name="username" type="text" />

                        <FormInput label='Password' placeholder="Enter your Password" name="password" type="password" />
                        <FormInput label='Confirm Password' placeholder="Confirm your Password" name="confirmPassword" type="password" />

                        <Button
                            type="submit"
                            className="w-full mt-6"
                            loading={isSubmitting}
                            loadingText='Creating...'>
                            Create
                        </Button>
                    </Form>
                )}
            </Formik>
            <Text className="mt-3 text-center text-sm text-gray-500">
                Already have an account? {' '}
                <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:underline">
                    Log in
                </Link>.
            </Text>
        </>
    )
}

export default RegisterPage;