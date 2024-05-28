"use client";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const RegisterForm = () => {
    const initialValues = {
        username: '',
        password: '',
        email: '',
    };

    const onSubmit = async (values, { setSubmitting }) => {
        console.log('values', values);
        try {
            const response = await axios.post('/api', values);
            console.log('response', response);
            if (response.status === 200) {
                alert('Registration successful!');
            } else {
                alert('Registration failed!');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration');
        } finally {
            setSubmitting(false);
        }
    };

    const validate = (values) => {
        const errors = {};

        // Add validation logic here if needed

        return errors;
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
            <Form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <Field type="text" id="username" name="username" required />
                    <ErrorMessage name="username" component="div" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <Field type="password" id="password" name="password" required />
                    <ErrorMessage name="password" component="div" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <Field type="email" id="email" name="email" required />
                    <ErrorMessage name="email" component="div" />
                </div>
                <button type="submit">Register</button>
            </Form>
        </Formik>
    );
};

export default RegisterForm;
