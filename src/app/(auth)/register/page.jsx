"use client";

import { newUser } from "@/api/user";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Field, ErrorMessage, Formik } from "formik";
import { useRouter } from "next/navigation";
import style from "../auth.module.css";
import * as yup from "yup";

export default function Register() {
  const router = useRouter();

  const registerUser = (values) => {
    const { name, email, password } = values;
    newUser(name, email, password).then((response) => {
      console.log(response);
      router.push("/login");
    });
  };

  return (
    <Card color="transparent" className="rounded-none flex justify-center items-center py-10" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={registerUser}
        validationSchema={yup.object().shape({
          name: yup.string().required("Required").max(10, "Max 10 characters"),
          email: yup.string().required("Email is required").email("Invalid email"),
          password: yup.string().required("Required").min(5, "Min 5 characters"),
        })}
      >
        {(formik) => (
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
              <Field name="name" as={Input} size="lg" label="Name" />
              <div className={style.errorMessage}>
                <ErrorMessage name="name" />
              </div>
              <Field name="email" as={Input} size="lg" label="Email" />
              <div className={style.errorMessage}>
                <ErrorMessage name="email" />
              </div>
              <Field name="password" as={Input} type="password" size="lg" label="Password" />
              <div className={style.errorMessage}>
                <ErrorMessage name="password" />
              </div>
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-blue-500 transition-colors hover:text-blue-700">
                Sign In
              </a>
            </Typography>
          </form>
        )}
      </Formik>
    </Card>
  );
}
