import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  animation: ${slideIn} 0.5s forwards;
  ${({ isHidden }) =>
    isHidden &&
    `
    animation: ${slideOut} 0.5s forwards;
  `}
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #f2f2f2;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: rgba(26, 143, 227, 1);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

const Message = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
  color: ${({ isError }) => (isError ? "red" : "green")};
`;

const LinkWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const CustomLink = styled(Link)`
  color: rgba(26, 143, 227, 1);
`;

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // default role is "user"
  });
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // validate form data, e.g. check if email and password are not empty
    if (!formData.email || !formData.password) {
      setMessage("Please enter your email and password");
      return;
    }

    try {
      // send login request to backend with the selected role
      const response = await axios.post("https://communicables.onrender.com/login", {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // navigate to appropriate dashboard if login is successful
      if (response.status === 200) {
        if (formData.role === "admin") {
          nav("/nav");
        } else {
          nav("/home");
          setMessage("Login successful");
}
}
} catch (error) {
// display error message if login request fails
setMessage(error.response.data.message);
}
}

return (
<Container>
<Title>Login</Title>
<Form onSubmit={handleSubmit}>
<Input
       type="email"
       name="email"
       placeholder="Email"
       value={formData.email}
       onChange={handleChange}
     />
<Input
       type="password"
       name="password"
       placeholder="Password"
       value={formData.password}
       onChange={handleChange}
     />
<label htmlFor="role">Login as:</label>
<select name="role" id="role" value={formData.role} onChange={handleChange}>
<option value="user">User</option>
<option value="admin">Admin</option>
</select>
<Button type="submit">Login</Button>
</Form>
<Message isError={message.includes("Error")}>{message}</Message>
<LinkWrapper>
<CustomLink to="/signup">Don't have an account? Signup here</CustomLink>
</LinkWrapper>
</Container>
);
}

export default Login;