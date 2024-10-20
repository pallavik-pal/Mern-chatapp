import { Container, Flex, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Login from "../components/Authentication/Login";

const Homepage = () => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);
  return (
    <Flex
      minH={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      px={4}
      textAlign="center"
      centerContent
      h="100%"
      w="100%"
    >
      <Container maxW={"container.md"} padding={0} centerContent>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          gap={10}
          width="500px"
          color="aliceblue"

          // Set the background to black
        >
          <VStack spacing={4} align={"stretch"}>
            <Login />
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Homepage;
