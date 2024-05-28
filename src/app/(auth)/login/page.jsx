'use client';
import { FormInput } from "@/components/FormInput";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from 'yup';
import axiosInstance from '@/lib/axiosInstance';
import { Button, Card, Flex, Text, Title } from "@tremor/react";
import Link from "next/link";
import { showErrorNotification, showSuccessNotification } from "@/lib/NotificationUtil";
import { signIn } from 'next-auth/react';
const LoginPage = () => {
    const router = useRouter();

    // Define the validation schema using Yup
    const validationSchema = Yup.object().shape({
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
    });

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        console.log('values',values);
        try {
            const result = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false, // Don't redirect, so you can handle it in the code
            });
            console.log('result', result);
            if (result.error) {
                showErrorNotification('Login failed');
                console.error('LoginError', result.error);
                // Handle login error
            } else {
                // Successful login, you can redirect as needed
                resetForm();
                showSuccessNotification('Login successful');
                router.push('/dashboard/');
            }
        } catch (error) {
            showErrorNotification(error);
            console.error('LoginError', error);
        }
        finally {
            setSubmitting(false);
        }
    };
    return (
        <>
            <Title
                 className="text-2xl font-bold text-center"
            >
                Sign into your account
            </Title>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form
                         className="space-y-6"
                    >
                        <FormInput
                            label='Email'
                            placeholder="Enter your Email"
                            name="email"
                            type="text"
                        />
                        <FormInput
                            label='Password'
                            placeholder="Enter your Password"
                            name="password"
                            type="password"
                        />
                        <Button
                            type="submit"
                            className="w-full mt-6"
                            loading={isSubmitting}
                            loadingText='Signing in...'
                        >
                            Sign in
                        </Button>
                    </Form>
                )}
            </Formik>
            <Text className="mt-3 text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link
                    href="/register"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:underline">
                    Register
                </Link>.
            </Text>
        </>
    )
}

export default LoginPage;