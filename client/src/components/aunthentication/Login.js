import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../features/auth/authSlice';

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
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
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

const Select = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #f2f2f2;
  font-size: 16px;
`;

const Label = styled.label`
  margin-bottom: 8px;
  color: #333;
`;

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    return () => dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }

    dispatch(login({
      email: formData.email,
      password: formData.password,
      role: formData.role,
    }));
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
          disabled={loading}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />
        <Label htmlFor="role">Login as:</Label>
        <Select
          name="role"
          id="role"
          value={formData.role}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </Select>
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Form>
      {error && <Message isError>{error}</Message>}
      <LinkWrapper>
        <CustomLink to="/signup">Don't have an account? Signup here</CustomLink>
      </LinkWrapper>
    </Container>
  );
}

export default Login;