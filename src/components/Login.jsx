import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BeatLoader } from 'react-spinners'
import Error from './Error';
import * as Yup from 'yup';
import useFetch from '../hooks/use-fetch'
import { login } from '../db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router'
import { UrlState } from '../context'


const Login = () => {
  const check = true;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');
  const [errorData, setErrorData] = useState([])
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const {loading, error, fn: fnLogin, data} = useFetch(login, formData);
  const {fetchUser} = UrlState();

  useEffect(() => {
    if (error === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [error, data]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async () => {
    setErrorData([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email("Invalid Email").required("Email is Required"),
        password: Yup.string().min(6, "Password must be atleast 6 characters").required("Password is Required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnLogin();

    } catch (error) {
      const newError = {};

      error?.inner?.forEach(err => {
        newError[err.path] = err.message;
      })

      setErrorData(newError);
    }
  }

  return (
    <Card className="bg-gray-900">
      <CardHeader>
        <CardTitle className="text-white text-xl" >Login</CardTitle>
        <CardDescription className="" >to Your account if you already have one</CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-4 mb-4">
        <div className="space-y-1 h-12">
          <Input type="email" name='email' placeholder="Enter Email" className="h-full text-white" onChange={handleInputChange} />
          {errorData?.email && <Error message={errorData.email} />}
        </div>
        <div className="space-y-1 h-12">
          <Input type="password" name="password" placeholder="Enter Password" className="h-full text-white" onChange={handleInputChange} />
          {errorData?.password && <Error message={errorData.password} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin} variant='secondary' >{loading ? <BeatLoader size={20} color='#36d7b7' /> : 'Login'}</Button>
      </CardFooter>
    </Card>

  )
}

export default Login