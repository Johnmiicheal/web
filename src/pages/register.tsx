import {
  Flex,
  Heading,
  Box,
  Button,
  Text,
  ChakraProvider,
  VStack,
  HStack,
  FormControl,
  useToast,
  FormErrorMessage,
  FormHelperText,
  Link,
  InputRightElement,
  InputGroup,
  extendTheme,
  FormLabel,
  InputRightAddon,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import NextLink from "next/link";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { useState } from "react";
import {
  validateName,
  validateEmail,
  validatePass,
} from "../validators/usernamepass";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [,register] = useRegisterMutation();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const router = useRouter()

  return (
    <ChakraProvider theme={theme}>
      <Flex justifyContent="center" mt={5} p={5}>
        <NextLink href="/">
          <img src="/signuppic.png" width="500vh" alt="signup_banner" />
        </NextLink>
      </Flex>
      <Box
        w={["full", "lg"]}
        p={[5, 5]}
        mx="auto"
        border={["none"]}
        borderRadius={10}
        alignSelf="center"
      >
        <HStack
          spacing={1}
          align="center"
          justify="space-between"
          mb={5}
          px={5}
        >
          {/* <Flex mb={5} alignSelf="center"> */}
          <Heading as="h5" fontSize={{ base: "1.1rem", md: "1.5rem" }}>
            Signup to zcamp
          </Heading>
          <Button
            leftIcon={
              <FcGoogle
                style={{ backgroundColor: "white", borderRadius: 5 }}
                size={21}
              />
            }
            color="white"
            colorScheme="cyan"
            variant="solid"
            width={40}
            fontSize={{ base: "0.5rem", md: "0.7rem"}}
          >
            Signup with Google
          </Button>
          {/* </Flex> */}
        </HStack>

        <Box alignSelf="center" px={5}>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
            }}
            onSubmit={ async (values, {setErrors}) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
              }, 1000);
              console.log(values);
              const response = await register({options: values})
              if( response.data?.register.errors ){
                setErrors(toErrorMap(response.data?.register.errors));
              } else if (response.data?.register.user){
                router.push("/")
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                />

                <Box mt={5}>
                  <InputField
                    name="email"
                    placeholder="email"
                    label="Email"
                    type="email"
                  />
                </Box>
                
                <Box mt={5}>
                  <InputGroup>
                    <InputField
                      name="password"
                      placeholder="password"
                      label="Password"
                      type={show ? "text" : "password"}
                      autoComplete={'none'}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>               

                <Flex alignSelf="center">
                  <Button
                    mt={5}
                    color="white"
                    backgroundColor="#D99EFF"
                    variant="solid"
                    width={60}
                    _hover={{ bg: "#B94EFF" }}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Continue
                  </Button>
                  <Text
                    fontWeight={600}
                    color="GrayText"
                    alignSelf="center"
                    mt={5}
                    ml={5}
                    fontSize="0.8rem"
                  >
                    Already a member?{" "}
                    <NextLink href="/login" passHref>
                      <Link color="#D99EFF" _hover={{ color: "#B94EFF" }}>
                        {" "}
                        Sign In
                      </Link>
                    </NextLink>
                  </Text>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Register;


