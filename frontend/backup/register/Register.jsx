import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../src/context/AuthContext";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ColorRing } from "react-loader-spinner";
import authService from "../../src/services/auth.service";
import "./register.css";

const Register = () => {
  const nav = useNavigate();
  //prevent double submit:
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(undefined);
  const { isLoggedIn } = useContext(AuthContext);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  //Validations:
  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Name is too short").required(),
    email: Yup.string().email("Must be a valid email").required(),
    password: Yup.string().min(3, "Password is too short").required(),
  });

  //if all is valid=> this method is invoked
  const handleRegister = (formValues) => {
    setIsLoading(true);

    const { username, email, password } = formValues;
    authService
      .register(username, email, password)
      .then((res) => {
        //swal
        nav("/login");
      })
      .catch((e) => {
        alert(e); //swal //modal
        setErrMessage(JSON.stringify(e.response.data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      {errMessage && <div>${errMessage}</div>}
      {isLoading && (
        <div className="mx-auto w-25">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{ margin: "0 auto" }}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleRegister}
        validationSchema={validationSchema}
      >
        <div className="my_container">
          <Form className="my_form ">
            <h1 className="h1">הרשמה</h1>
            <div className="my_div">
              <Field
                name="username"
                type="text"
                className="my_field"
                id="username"
              />
              <label htmlFor="username" className="  my_label ">
                שם משתמש
              </label>
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="my_div">
              <Field
                name="email"
                type="email"
                className="my_field"
                id="email"
              />
              <label htmlFor="email" className="my_label ">
                אימייל
              </label>
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="my_div">
              <Field
                name="password"
                type="password"
                className="my_field "
                id="password"
              />
              <label htmlFor="password" className="my_label">
                סיסמא
              </label>
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="my_div">
              <button
                disabled={isLoading}
                className="my_btn btn btn-primary"
                type="submit"
              >
                הרשמה
              </button>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default Register;
