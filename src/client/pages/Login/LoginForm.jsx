import React from 'react';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import { withAuth } from '../../providers/AuthProvider';

import Center from '../../components/Center';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Label from '../../components/Label';
import ErrorMessage, { ErrorMessageStyled } from '../../components/ErrorMessage';

const Box = styled.section`
  background: #fff;
  width: 600px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 20px;
`;
const Title = styled.header`
  color: #000;
  font-weight: normal;
  font-size: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 16px;
`;
const ButtonStyled = styled(Button)`
  margin: 1rem 0;
`;

const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username is too short!')
    .max(70, 'Username is too long!')
    .required('Username is required!'),
  password: yup
    .string()
    .min(5, 'Password is too short.')
    .max(70, 'Username is too long.')
    .required('Password is required!')
});

const LoginForm = ({ auth }) => {
  const [{ data: authToken, loading, error }, loginUser] = useAxios(
    {
      url: '/api/auth',
      method: 'POST'
    },
    { manual: true }
  );

  if (!loading && authToken) {
    auth.login(authToken);
  }

  return (
    <Center>
      <Box>
        <Title>Sign in to your account</Title>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={values => {
            loginUser({ data: { ...values } });
          }}
          validationSchema={LoginSchema}
          render={() => (
            <Form>
              <Label htmlFor="username">Username</Label>
              <Field name="username" render={({ field }) => <Input type="text" {...field} />} />
              <ErrorMessage name="username" />
              <Label htmlFor="password">Password</Label>
              <Field name="password" render={({ field }) => <Input type="password" {...field} />} />
              <ErrorMessage name="password" />
              <ButtonStyled type="submit" unsized>
                Sign in
              </ButtonStyled>
            </Form>
          )}
        />
        {error && <ErrorMessageStyled>Invalid username or password.</ErrorMessageStyled>}
      </Box>
    </Center>
  );
};

export default withAuth(LoginForm);
