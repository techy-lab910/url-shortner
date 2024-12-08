import { useEffect, useState } from "react";
import Error from "./Error";
import { Input } from "./ui/input";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signUp } from "../db/apiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "../hooks/use-fetch";

const Signup = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();
  const [fileName, setFileName] = useState(null);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  // Handle input changes for both text fields and file uploads
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFileName(file.name);
      setFormData((prevState) => ({
        ...prevState,
        profile_pic: file,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Fetch signup function and manage loading and error states
  const { loading, error, fn: fnSignup, data } = useFetch(signUp, formData);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [error, loading]);

  // Handle form submission and validation
  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (error) {
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        setErrors({ api: error.message });
      }
    }
  };

  return (
    <Card className="bg-gray-900">
      <CardHeader>
        <CardTitle className="text-white text-xl">Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven&rsquo;t already
        </CardDescription>
        {error && <Error message={error?.message} />}
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-4">
        {/* Name input */}
        <div className="space-y-1 h-12">
          <Input
            className="h-full text-white"
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
        </div>
        {errors.name && <Error message={errors.name} />}

        {/* Email input */}
        <div className="space-y-1 h-12">
          <Input
            className="h-full text-white"
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>
        {errors.email && <Error message={errors.email} />}

        {/* Password input */}
        <div className="space-y-1 h-12">
          <Input
            className="h-full text-white"
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}

        {/* Profile picture input */}
        <div className="space-y-1 min-h-12">
          <label
            htmlFor="fileInput"
            className="bg-gray-900 inline-block text-white px-4 py-2.5 w-full border border-[#e5e7eb] rounded-md text-lg cursor-pointer"
          >
            {fileName
              ? fileName.length <= 35
                ? fileName
                : fileName.slice(0, 35) + "..."
              : "Select an Image"}
          </label>
          <input
            type="file"
            id="fileInput"
            name="profile_pic"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleInputChange}
          />
        </div>
        {errors.profile_pic && <Error message={errors.profile_pic} />}

      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup} variant="secondary">
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Create Account"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
