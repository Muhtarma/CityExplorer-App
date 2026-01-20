//inspiratioon from the canvas document authentication guide and firebase documentation
import { reactive } from "vue";
import { auth } from "../firestoreModel.js";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth";
import { AuthView } from "../views/authView.jsx";
import { useRouter } from "vue-router";

// reactive state outside the component to persist  across rendering
const authState = reactive({
    enterEmail: "",
    enterPassword: "",
    showPassword: false,
    isSignUpMode: false,
    showForgotPassword: false,
    errorMessage: "",
    successMessage: "",
    emailError: "",
    passwordError: "",
    isLoading: false
});


//function to sign out user
export function signOutUser() {
    signOut(auth);
}

export function AuthPresenter() {
    const router = useRouter();

    //function to validate email format
    function checkEmailValidation(email) {
        if (!email) {
            return "Email is required";
        }
     
        if (!email.includes("@") ||!email.includes(".")) {
            return "Please enter a valid email address";
        }
        return "";
    }

    //function to check the password validity
    function checkPasswordValidation(password, isSignUp = false) {
        if (!password) {
            return "Password is required";
        }

        if (isSignUp && password.length < 6) {
            return "Password must be at least 6 characters";
        }

        return "";
    }

    //function to handle errors and clear all messages 
    function clearMessagesACB() {
        authState.errorMessage = "";
        authState.successMessage = "";
        authState.emailError = "";
        authState.passwordError = "";
    }

    //function to convert firebase error to user-friendly messages
    function handleAuthenticationErrorACB(error) {
        authState.isLoading = false;
        const errorMessage = {
            "auth/email-already-in-use": "This email is already registered. Please sign in instead.",
            "auth/invalid-email": "The email address is not valid. Please check and try again.",
            "auth/weak-password": "The password is too weak. Please use at least 6 characters.",
            "auth/user-not-found": "No account found with this email. Please sign up first.",
            "auth/wrong-password": "Incorrect password. Please try again or reset your password.",
            "auth/invalid-credential": "Invalid email or password. Please check your credentials.",
            "auth/too-many-requests": "Too many failed attempts. Please try again later or reset your password.",
            "auth/network-request-failed": "Network error. Please check your connection and try again."
        };
            
       authState.errorMessage = errorMessage[error.code] || "An error occurred. Please try again.";
    }

    // calllback function for signing up with email and password 
    function signUpToCreateAccountACB() {
        clearMessagesACB();
        const emailValidation = checkEmailValidation(authState.enterEmail);
        const passwordValidation = checkPasswordValidation(authState.enterPassword, true);

        if (emailValidation) {
            authState.emailError = emailValidation;
            return;
        }
        
        if (passwordValidation) {
            authState.passwordError = passwordValidation;
            return;
        }

        authState.isLoading = true;

        createUserWithEmailAndPassword(auth, authState.enterEmail, authState.enterPassword)
        .then(() => {
            authState.isLoading = false;
            authState.successMessage = "Account created successfully!";
            clearMessagesACB();
            router.push('/home');
        })
        .catch(handleAuthenticationErrorACB);
    }
  
    //callbackk function for signing in with email and password
    function signInToAccountACB() {
        clearMessagesACB();
        const emailValidation = checkEmailValidation(authState.enterEmail);
        const passwordValidation = checkPasswordValidation(authState.enterPassword);
        
        if (emailValidation) {
            authState.emailError = emailValidation;
            return;
        }
        
        if (passwordValidation) {
            authState.passwordError = passwordValidation;
            return;
        }

        authState.isLoading = true;

        signInWithEmailAndPassword(auth, authState.enterEmail, authState.enterPassword)
        .then(() => {
            authState.isLoading = false;
            authState.successMessage = "Signed in successfully!";
            clearMessagesACB();
            router.push('/home');
        })
        .catch(handleAuthenticationErrorACB);
    }

    //function to handle forgot password
    function handleForgotPasswordACB() {
        clearMessagesACB();
        //const email = authState.forgotPasswordEmail || authState.enterEmail;
        const emailValidation = checkEmailValidation(authState.enterEmail);
        if (emailValidation) {
            authState.emailError = emailValidation;
            authState.errorMessage = emailValidation;
            return;
        }

        authState.isLoading = true;

        sendPasswordResetEmail(auth, authState.enterEmail)
        .then(() => {
            authState.isLoading = false;
            authState.successMessage = "Password reset email sent! Please check your inbox.";
        })
        .catch(handleAuthenticationErrorACB);
    }

    // function to handle email change clears error when user starts typing
    function handleEmailChangeACB(email) {
        authState.enterEmail = email;
        if (authState.emailError) {
            const validation = checkEmailValidation(email);
            if (!validation) {
                authState.emailError = "";
            }
        }
    }

    // function to handle password change clears error when user starts typing
    function handlePasswordChangeACB(password) {
        authState.enterPassword = password;
        if (authState.passwordError) {
            authState.passwordError = "";
        }
    }

    // function to show and hide password 
    function togglePasswordVisibilityACB() {
        authState.showPassword = !authState.showPassword;
    }

    // main toggle function to toggle b/w sign in and sign up mode
    function toggleModeACB() {
        authState.isSignUpMode = !authState.isSignUpMode;
        authState.showForgotPassword = false;
        clearMessagesACB();
    }

    // function to toggle forgot password view, switches ui tie forgot password mode
    function toggleForgotPasswordACB() {
        authState.showForgotPassword = !authState.showForgotPassword;
        clearMessagesACB();
    }

    //function to go back to home page,
    function goHomeACB() {
        router.push('/home');
    }

    return (
        <AuthView 
            email={authState.enterEmail}
            password={authState.enterPassword}
            showPassword={authState.showPassword}
            isSignUpMode={authState.isSignUpMode}
            showForgotPassword={authState.showForgotPassword}
            onSignIn={signInToAccountACB} 
            onSignUp={signUpToCreateAccountACB}
            onForgotPassword={handleForgotPasswordACB}
            onEmailChange={handleEmailChangeACB}
            onPasswordChange={handlePasswordChangeACB}
            onTogglePasswordVisibility={togglePasswordVisibilityACB}
            onToggleMode={toggleModeACB}
            onToggleForgotPassword={toggleForgotPasswordACB}
            onGoBack={goHomeACB}
            errorMessage={authState.errorMessage}
            successMessage={authState.successMessage}
            emailError={authState.emailError}
            passwordError={authState.passwordError}
            isLoading={authState.isLoading}
        />
    );
}

