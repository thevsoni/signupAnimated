import * as yup from 'yup';

//login validation
const LoginValidation = yup.object().shape({
    email: yup.string().email().required("Email is required").trim(),
    password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 character")
        .max(20, "Password must be leses than 20 character")
        .matches(/(?=.*[0-9])/, "Password must contain a number")
});

//register validation
const RegisterValidation = yup.object().shape({
    email: yup.string().email().required("Email is required").trim(),
    password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number"),
    fullName: yup.string().required("full name is required")
        .max(20, "Full name must be less than 20 character")
        .matches(/^[a-zA-Z ]*$/, "Full name must contain only letters")
});

//user profile updation
const ProfileValidation = yup.object().shape({
    fullName: yup.string().required("full name is required")
        .max(20, "Full name must be less than 20 character")
        .matches(/^[a-zA-Z ]*$/, "Full name must contain only letters"),
    email: yup.string().email().required("Email is required").trim(),

})

//change pwd validation
const PasswordValidation = yup.object().shape({
    oldPassword: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be atleast 6 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number"),
    newPassword: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be atleast 6 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number"),
    confirmPassword: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be atleast 6 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number")
        .oneOf([yup.ref("newPassword"), null], "Password must match"),
})

export { LoginValidation, RegisterValidation, ProfileValidation, PasswordValidation }