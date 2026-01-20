import "/src/style.css";

export function AuthView(props) {

    //function to handle email input change
    function accountWithEmailACB(event) { 
        if (props.onEmailChange) {
            props.onEmailChange(event.target.value);
        }
    }

    //function to handle password input change
    function passwordForEmailACB(event) { 
        if (props.onPasswordChange) {
            props.onPasswordChange(event.target.value);
        }
    }
     
    //function to go back to home page,
    function goback() {
       props.onGoBack();
    }
     
    return (
        <div className="auth-wrap">
            <div className="activity-wrap">
                <div className="form">

                    {/*gradient background like itinerray*/}
                    <div className="itinerary-icon-right">
                        <img src="https://imgur.com/TEFxsil.png" className="background-icon-top"/>
                    </div>

                    <div className="itinerary-icon-left">
                        <img src="https://imgur.com/TEFxsil.png" className="background-icon-top"/>
                    </div>

                    <div className="form-card auth-card">

                        <h2 className="auth-title">
                            {props.showForgotPassword ? "Reset Password" : (props.isSignUpMode ? "Create Account" : "Sign In")}
                        </h2>

                        {props.errorMessage && (
                            <div className="error-message">{props.errorMessage}</div>
                        )}

                        {props.successMessage && (
                            <div className="success-message">{props.successMessage}</div>
                        )}

                        {!props.showForgotPassword ? (
                            <>
                                <div className="input-group">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        id="email"
                                        type="email" 
                                        placeholder="Enter your email" 
                                        value={props.email || ""}
                                        onInput={accountWithEmailACB}
                                        className={props.emailError ? "input-error" : ""}
                                    />
                                    {props.emailError && (
                                        <span className="field-error">{props.emailError}</span>
                                    )}
                                </div>

                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <div className="password-input-wrapper">
                                        <input 
                                            id="password"
                                            type={props.showPassword ? "text" : "password"}
                                            placeholder="Enter your password" 
                                            value={props.password || ""}
                                            onInput={passwordForEmailACB}
                                            className={props.passwordError ? "input-error" : ""}
                                        />
                                        <button 
                                            type="button"
                                            className="password-toggle"
                                            onClick={props.onTogglePasswordVisibility}
                                        >
                                            {props.showPassword ? "👁️" : "👁️‍🗨️"}
                                        </button>
                                    </div>

                                    {props.passwordError && (
                                        <span className="field-error">{props.passwordError}</span>
                                    )}

                                    {props.isSignUpMode && (      
                                        <span className="password-hint">Password must be at least 6 characters</span>
                                    )}
                                </div>

                                <button 
                                    className="auth-button primary"
                                    onClick={() => {
                                    if (props.isSignUpMode) {
                                        props.onSignUp();
                                    } else {
                                        props.onSignIn();
                                    }
                                    }}
                                    disabled={props.isLoading}
                                >
                                    {props.isLoading ? "Loading..." : (props.isSignUpMode ? "Sign Up" : "Sign In")}
                                </button>

                                <div className="auth-links">
                                    {!props.isSignUpMode && (
                                        <a href="#" onClick={(e) => { e.preventDefault(); props.onToggleForgotPassword(); }} className="link">
                                            Forgot password?
                                        </a>
                                    )}
                                    <a href="#" onClick={(e) => { e.preventDefault(); props.onToggleMode(); }} className="link">
                                        {props.isSignUpMode ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                                    </a>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="input-group">
                                    <label htmlFor="forgot-email">Email</label>
                                    <input 
                                        id="forgot-email"
                                        type="email" 
                                        placeholder="Enter your email" 
                                        value={props.email || ""}
                                        onInput={accountWithEmailACB}
                                    />
                                    <span className="forgot-password-hint">We'll send you a link to reset your password</span>
                                </div>

                                <button className="auth-button primary" onClick={props.onForgotPassword} disabled={props.isLoading}>
                                    {props.isLoading ? "Sending..." : "Send Reset Link"}
                                </button>

                                <div className="auth-links">
                                    <a href="#" onClick={(e) => { e.preventDefault(); props.onToggleForgotPassword(); }} className="link">
                                        Back to Sign In
                                    </a>
                                </div>
                            </>
                        )}
                    </div>

                </div>

                <div className="start">
                    <div className="header">Back To Home</div>
                    <button className="arrow" onClick={goback}> ← </button>  
                </div>

            </div>
        </div>
        
    );
} 