import { useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loginTrue, setLoginTrue] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    // emailni
    const email = emailRef.current.value.trim();
    if (!email) {
      newErrors.email = "Email address is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    // passwordni
    const password = passwordRef.current.value.trim();
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      const email = emailRef.current.value.trim();
      const password = passwordRef.current.value.trim();

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        setLoginTrue(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("Invalid credentials");
      }
    } else {
      console.log("Form validation failed!");
    }
  };

  return (
    <div className="flex items-center flex-col pb-96">
      <div className="shadow-lg shadow-black w-[498px] p-8 bg-[#fff] rounded-[20px]">
        <h2 className="text-4xl ml-24 text-black mb-10">Welcome back!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your email"
            ref={emailRef}
            className={`border-[1px]  rounded-lg pl-4 h-[50px] pt-[10px] pb-5 outline-none w-full bg-transparent text-black mb-6 border-[#5A698F] ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}

          <input
            type="password"
            placeholder="Enter password"
            ref={passwordRef}
            className={`border-[1px]  rounded-lg h-[50px] pt-[10px]	 pl-4 pb-5 outline-none w-full bg-transparent text-black mb-6 border-[#5A698F] ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password}</p>
          )}
          
          <h2
            className="mb-2 ml-[370px] text-[#FC4747] cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </h2>
          <button
            type="submit"
            className=" py-4 rounded-lg px-24 text-sm text-white bg-[#FC4747] mb-6 w-full"
            disabled={isLoading}
            onClick={() => navigate(loginTrue ? "/home" : "/login")}
          >
            {isLoading ? "Sending..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-white text-[15px]">
          Do not have an account?{" "}
        </p>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default Login;
