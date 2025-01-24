import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, Link } from "react-router-dom";

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

function Signup() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // Check for lowercase field names in formData
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
      setMessage("Please fill in all fields");
      return;
    }
  
    console.log("Submitting:", formData); // Add this for debugging
    
    fetch("http://127.0.0.1:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Signup failed");
        }
      })
      .then((data) => {
        console.log("Signup successful:", data);  // Log the API response here
        nav("/home");
        setMessage("Signup successful");
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Signup failed. Please check the console for more details.");
      });
  }
  
  

  return (
    <Container>
      <Title>Sign up</Title>
      <Form
onSubmit={handleSubmit}>
<Input
  type="text"
  name="first_name"
  placeholder="First Name"
  value={formData.first_name}
  onChange={handleChange}
/>
<Input
  type="text"
  name="last_name"
  placeholder="Last Name"
  value={formData.last_name}
  onChange={handleChange}
/>
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

<Button type="submit">Sign up</Button>
{message && <Message isError>{message}</Message>}
</Form>
<LinkWrapper>
<Message>
Already have an account?{" "}
<CustomLink to="/login">Log in</CustomLink>
</Message>
</LinkWrapper>
</Container>
);
}

export default Signup;