export default {
    validations: {
        required: () => 'This field is required.',
        invalidFormat: (obj) => `Invalid ${obj} format.`,
        passwordFormat: () => 'Password must be 8 to 20 characters long, with at least one uppercase letter, one number, and one symbol.',
        passwordNotMatch: () => 'Both passwords do not match.'
    },
    title: {
        login: () => 'Log In',
        signup: () => 'Sign Up',
        categories: () => 'Categories',
        brands: () => 'Brands'
    },
    label: {
        username: () => 'Username',
        password: () => 'Password',
        confirmPassword: () => 'Confirm Password',
        email: () => 'Email',
        phoneNumber: () => 'Phone Number',
        forgotPassword: () => 'Forgot Password',
        firstName: () => 'First Name',
        lastName: () => 'Last Name',
        dob: () => 'Date of Birth',
        gender: () => 'Gender'
    },
    button: {
        login: () => 'LOG IN',
        ok: () => 'OK',
        signup: () => 'SIGN UP',
        continue: () => 'Continue',
        backToHomepage: () => 'Back To Homepage',
        follow: () => "FOLLOW",
        following: () => "FOLLOWING",
    },
    error: {
        title: {
            oops: () => 'Oops!'
        },
        message: {
            general: () => 'Something went wrong, please try again later.',
            invalidAuth: () => 'Invalid email or password, please try again.'
        }
    }
};
