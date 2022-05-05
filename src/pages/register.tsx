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
  Input,
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
import * as Yup from "yup";

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

const RegisterSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Full name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  // password: Yup.string().required('Password is required'),
});

const Register = () => {
  const toast = useToast();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // interface Values {
  //   fullname: string;
  //   email: string;
  //   password: string;
  // }

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "john") {
      error = "Lol! You're not john😂";
    }
    return error;
  }

  function validateEmail(value){
    let error;
    if(!value){
      error='Email is Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)){
      error = 'Invalid email address'
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Flex justifyContent="center" mt={5}>
        <NextLink href="/test">
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
          w="full"
          mb={5}
        >
          {/* <Flex mb={5} alignSelf="center"> */}
          <Heading as="h5" fontSize="2vh">
            Signup to zcamp
          </Heading>
          <Button
            leftIcon={
              <FcGoogle
                style={{ backgroundColor: "white", borderRadius: 5 }}
                size={24}
              />
            }
            color="white"
            colorScheme="cyan"
            variant="solid"
            width="25vh"
            fontSize="2vh"
          >
            Signup with Google
          </Button>
          {/* </Flex> */}
        </HStack>

        <Box alignSelf="center">
          <Formik
            initialValues={{
              fullname: "",
              email: "",
              password: "",
            }}
            
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props) => (
              <Form>
                <Field name="fullname" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl variant="floating" id="fullname" isRequired isInvalid={form.errors.fullname && form.touched.fullname}>
                      <Input
                        placeholder=" "
                        variant="outline"
                        rounded={10}
                        {...field}
                        id='fullname'
                      />
                      <FormLabel htmlFor="fullname">Full Name</FormLabel>
                      <FormErrorMessage>{form.errors.fullname}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <FormControl variant="floating" id="email" isRequired mt={4}>
                  <Input
                    placeholder=" "
                    variant="outline"
                    rounded={10}
                    type="email"
                    name="email"
                  />                 
                  <FormLabel>Email</FormLabel>
                </FormControl>

                <FormControl variant="floating" id="password" mt={4} isRequired>
                  <InputGroup>
                    <Input
                      placeholder=" "
                      variant="outline"
                      rounded={10}
                      type={show ? "text" : "password"}
                    />
                    <FormLabel>Password</FormLabel>
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Flex alignSelf="center">
                  <Button
                    mt={5}
                    color="white"
                    backgroundColor="#D99EFF"
                    variant="solid"
                    width={60}
                    _hover={{ bg: "#B94EFF" }}
                    type="submit"
                    // onClick={() =>
                    //   toast({
                    //     title: "Account Created.",
                    //     description:
                    //       "Check your email address for verification",
                    //     status: "success",
                    //     duration: 6000,
                    //     isClosable: true,
                    //   })
                    // }
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
