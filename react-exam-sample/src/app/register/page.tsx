"use client"

import { AccountContext } from "@/context/AccountContext";
import { AccountService } from "@/services/AccountService";
import { useRouter } from "next/navigation";
import {useContext, useState } from "react";
import {Controller, SubmitHandler, useForm } from "react-hook-form";
import {RegisterRequestDto} from "@/types/Request/RegisterRequestDto";
import { Alert, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";

export default function Register() {
    const router = useRouter();
    const accountService = new AccountService();
    const { setAccountInfo } = useContext(AccountContext)
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitted }
    } = useForm<RegisterInputs>({
        defaultValues: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: '',
            address: '',
            phoneNumber: '',
            gender: 'female',
            dateOfBirth: ''
        }
    });

    type RegisterInputs = {
        firstName: string;
        lastName: string;
        emailAddress: string;
        password: string;
        confirmPassword: string;
        address: string;
        phoneNumber: string;
        gender: 'female' | 'male';
        dateOfBirth: string;
    }

    const onSubmit : SubmitHandler<RegisterInputs> = async (data: RegisterInputs) => {
        setErrorMessage("");

        if (data.password !== data.confirmPassword) {
            setErrorMessage("Password do not match")
            return
        }

        const req: RegisterRequestDto = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.emailAddress,
            password: data.password,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
        }

        setErrorMessage("Loading...");

        var result = await accountService.registerAsync(req);

        if (result.errors) {
            setErrorMessage(result.statusCode + " - " + result.errors[0]);
            return;
        }

        setAccountInfo!({
            jwt: result.data?.jwt,
            refreshToken: result.data?.refreshToken,
            role: result.data?.role
        });
        router.push("/");
    };

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="container py-5" style={{ maxWidth: 400 }}>
                {errorMessage && (
                    <Alert severity="error" className="mb-3">
                        {errorMessage}
                    </Alert>
                )}

                <h1 className="h3 mb-4 fw-normal text-center">Create an Account</h1>
                {/* First and Last name */}
                <div className="row g-2 mb-3">
                    <div className="col-md-6">
                        <FormLabel id="demo-radio-buttons-group-label">First name</FormLabel>
                        <TextField
                            fullWidth
                            type="firstName"
                            margin="none"
                            error={isSubmitted && !!errors.firstName}
                            helperText={isSubmitted ? errors.firstName?.message : ''}
                            {...register('firstName', { required: 'First name is required' })}
                        />
                    </div>

                    <div className="col-md-6">
                        <FormLabel id="demo-radio-buttons-group-label">Last name</FormLabel>
                        <TextField
                            fullWidth
                            type="lastName"
                            margin="none"
                            error={isSubmitted && !!errors.lastName}
                            helperText={isSubmitted ? errors.lastName?.message : ''}
                            {...register('lastName', { required: 'Last name is required' })}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="row g-2 mb-3">
                    <FormLabel id="demo-radio-buttons-group-label">Email address</FormLabel>
                    <TextField
                        fullWidth
                        type="emailAddress"
                        margin="none"
                        error={isSubmitted && !!errors.emailAddress}
                        helperText={isSubmitted ? errors.emailAddress?.message : ''}
                        {...register('emailAddress', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email.'
                            }})}
                    />
                </div>

                {/* Password */}
                <div className="row g-2 mb-3">
                    <FormLabel id="demo-radio-buttons-group-label">Password</FormLabel>
                    <TextField
                        fullWidth
                        type="password"
                        margin="none"
                        error={isSubmitted && !!errors.password}
                        helperText={isSubmitted ? errors.password?.message : ''}
                        {...register('password', {
                            required: 'Password is required',
                            pattern: {
                                value: /(?=.{7,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/,
                                message: 'Password must be at least 7 characters long and include those letters: A-Z, a-z, 1-9, -, etc.'
                            }})}
                    />
                </div>

                {/* Password confirm */}
                <div className="row g-2 mb-3">
                    <FormLabel id="demo-radio-buttons-group-label">Confirm password</FormLabel>
                    <TextField
                        fullWidth
                        type="password"
                        margin="none"
                        error={isSubmitted && !!errors.confirmPassword}
                        helperText={isSubmitted ? errors.confirmPassword?.message : ''}
                        {...register('confirmPassword', { required: 'Confirm password' })}
                    />
                </div>

                {/* Address */}
                <div className="row g-2 mb-3">
                    <FormLabel id="demo-radio-buttons-group-label">Address</FormLabel>
                    <TextField
                        fullWidth
                        type="address"
                        margin="none"
                        error={isSubmitted && !!errors.address}
                        helperText={isSubmitted ? errors.address?.message : ''}
                        {...register('address', { required: 'Address is required' })}
                    />
                </div>

                {/* Phone number */}
                <div className="row g-2 mb-3">
                    <FormLabel id="demo-radio-buttons-group-label">Phone number</FormLabel>
                    <TextField
                        fullWidth
                        type="phoneNumber"
                        margin="none"
                        error={isSubmitted && !!errors.phoneNumber}
                        helperText={isSubmitted ? errors.phoneNumber?.message : ''}
                        {...register('phoneNumber', {
                            required: 'Phone number is required',
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Phone number must contain only digits'
                            }})}
                    />
                </div>

                {/* Gender */}
                <div className="form-floating mb-3">
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue="female"
                            render={({ field }) => (
                                <RadioGroup {...field} row>
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                    />
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                </div>

                {/* Date of birth*/}
                <div className="row g-2 mb-3">
                    <FormLabel id="demo-radio-buttons-group-label">Date of birth</FormLabel>
                    <TextField
                        fullWidth
                        type="date"
                        margin="none"
                        error={isSubmitted && !!errors.dateOfBirth}
                        helperText={errors.dateOfBirth?.message}
                        {...register('dateOfBirth', {
                            required: 'Date of birth is required',
                        })}
                    />
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Sign Up</button>
            </form>
        </>
    )
}
