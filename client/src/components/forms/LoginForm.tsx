import React, { useState } from 'react';
import { Button, InputContainer, InputField, InputLabel } from "../../utils/styles";
import styles from './index.module.scss'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserCredentialsParams } from '../../utils/types';
import { postLoginUser } from '../../utils/api';

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserCredentialsParams>()
const navigate = useNavigate()

  const onSubmit = async (data: UserCredentialsParams) => {
    try {
      await postLoginUser(data)
      navigate('/conversations')
    }catch (e) {
      console.log(e)
    }
  }

  return <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
    <InputContainer>
      <InputLabel htmlFor='email'>Email</InputLabel>
      <InputField
        type='email'
        id='email'
        {...register('email', { required: 'Email is required' })}
      />
    </InputContainer>
    <InputContainer className={styles.loginForm}>
      <InputLabel htmlFor='password'>Password</InputLabel>
      <InputField
        type='password'
        id='password'
        {...register('password', { required: 'Password is Required' })}
      />
    </InputContainer>
    <Button className={styles.button}>Login</Button>
    <div className={styles.footerText}>
      <span>Don't have an account?</span>
      <Link to='/register'> <span>Register</span></Link>
    </div>
  </form>
};

