import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState();
  const [isLogin, setIsLogin] = useState(true);
  const [pic, setPic] = useState();

  const toast = useToast();
  const history = useHistory();
  const handleClick = () => setShow(!show);
  const postDetails = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pic);
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat app");
      data.append("cloud_name", "pallavik159");
      fetch("https://api.cloudinary.com/v1_1/pallavik159/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);

    if (!email || !password || (!isLogin && (!name || !pic))) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const endpoint = isLogin ? "/api/user/login" : "/api/user";
      const payload = isLogin
        ? { email, password }
        : { name, email, password, pic };

      const { data } = await axios.post(endpoint, payload, config);

      toast({
        title: isLogin ? "Login Successful" : "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats"); // Redirect after successful login/registration
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <>
      <Box
        border={"1px solid grey"}
        borderRadius={4}
        padding={5}
        bg="white"
        width="500px"
      >
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel color={"black"}>Email</FormLabel>
            <Input
              height="50px"
              color={"black"}
              placeholder="Enter your email id"
              fontSize={14}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel color={"black"}> Password</FormLabel>

            <Input
              color={"black"}
              height="50px"
              type={show ? "text" : "password"}
              fontSize={14}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {!isLogin && (
            <FormControl id="confirmPassword" isRequired>
              <FormLabel color={"black"}>Confirm Password</FormLabel>
              <Input
                height="50px"
                placeholder="Confirm Password"
                color={"black"}
                fontSize={14}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
          )}
          {!isLogin && (
            <FormControl id="firstname" isRequired>
              <FormLabel color={"black"}>Name</FormLabel>
              <Input
                height="50px"
                placeholder="FirstName"
                type="text"
                color={"black"}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          )}
          {!isLogin && (
            <FormControl id="pic" isRequired>
              <FormLabel color={"black"}>ProfilePicture</FormLabel>
              <Input
                height="50px"
                color={"black"}
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </FormControl>
          )}

          <Button
            w={"full"}
            colorScheme="blue"
            size={"sm"}
            fontSize={14}
            onClick={submitHandler}
            isLoading={loading}
            h="45px"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </Button>

          <Text mx={1} color={"black"}>
            OR
          </Text>

          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            pointer={"cursor"}
            border={"1px solid grey"}
          >
            <Image src="/ggl.png" w={10} alt="google " />
            <Text mx={2} color={"blue.500"}>
              Login with Google
            </Text>
          </Flex>
        </VStack>
      </Box>
      <Box border={"1px solid gray"} borderRadius={4} padding={5} bg="white">
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Box mx={2} fontSize={14} color={"black"}>
            {isLogin ? (
              <Text fontSize={"large"}>"Don't have an account?"</Text>
            ) : (
              <Text fontSize={"large"}> "Already have an account?"</Text>
            )}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            color={"blue.500"}
            cursor={"pointer"}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Login;
