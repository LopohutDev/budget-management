"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { buildURL } from "@/app/helpers";
import { SignUpRequest } from "@/types/user.types";

interface Values {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
}

const SignupMutation = async (body: SignUpRequest) => {
  const url = buildURL("/api/auth/signup", {});

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  mobileNumber: Yup.string().required("Required"),
});

const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session?.data) {
      router.push("/");
    }
  }, [session, router]);

  const handleSignUp = async (values: Values) => {
    try {
      const result = await SignupMutation(values);

      if (result) router.push("/login");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
  };

  return (
    <SessionProvider session={session.data as Session}>
      <div className="flex w-full h-full">
        <div className="relative bg-gray-800 w-0 lg:w-[50%] rounded-r-[36px]">
          {/* <Image
            className="w-full h-full object-cover rounded-r-[36px]"
            src="admin-login.svg"
            alt="admin-login-bg"
            width={250}
            height={100}
          /> */}
          <div className="absolute top-[45%] left-10 flex flex-col">
            {/* <Image
              className="w-0 lg:w-full"
              src="https://stg.image.ticketnation.altev.tech/tnlogowhite.png"
              alt="ticketnation-logo"
              width={350}
              height={100}
            /> */}
            <span className="text-white hidden lg:flex lg:text-4xl">
              Budget Manager
            </span>
          </div>
        </div>
        <div className="relative lg:w-[50%] w-full flex justify-center items-center">
          <div className="w-full max-w-md">
            <div className="flex w-full justify-center">
              <h2 className="text-3xl font-semibold text-white mt-6 lg:mt-0 lg:text-black">
                SIGN UP
              </h2>
              {errorMessage && (
                <p className="mt-2 text-sm text-center text-red-500">
                  {errorMessage}
                </p>
              )}
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={SignUpSchema}
              onSubmit={handleSignUp}
            >
              {({ isSubmitting }) => (
                <Form className="mt-8 space-y-6 px-5">
                  <div className=" rounded-md shadow-sm">
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <Field
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="relative block w-full p-4 mb-3 text-black placeholder-gray-500 bg-gray-100 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                        placeholder="Email address"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="mt-2 text-sm text-red-500"
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="relative block w-full p-4 text-black placeholder-gray-500 bg-gray-100 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                        placeholder="Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="mt-2 text-sm text-red-500"
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="firstName" className="sr-only">
                        First Name
                      </label>
                      <Field
                        id="firstName"
                        name="firstName"
                        required
                        className="relative block w-full p-4 text-black placeholder-gray-500 bg-gray-100 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                        placeholder="First Name"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="p"
                        className="mt-2 text-sm text-red-500"
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="lastName" className="sr-only">
                        Last Name
                      </label>
                      <Field
                        id="lastName"
                        name="lastName"
                        required
                        className="relative block w-full p-4 text-black placeholder-gray-500 bg-gray-100 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                        placeholder="Last Name"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="p"
                        className="mt-2 text-sm text-red-500"
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="mobileNumber" className="sr-only">
                        Mobile Number
                      </label>
                      <Field
                        id="mobileNumber"
                        name="mobileNumber"
                        required
                        className="relative block w-full p-4 text-black placeholder-gray-500 bg-gray-100 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                        placeholder="Mobile Number"
                      />
                      <ErrorMessage
                        name="mobileNumber"
                        component="p"
                        className="mt-2 text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full flex justify-center p-4 border border-transparent text-md font-medium rounded-md text-white bg-lime-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isSubmitting ? "Logging in..." : "Sign In"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default SignUpPage;
