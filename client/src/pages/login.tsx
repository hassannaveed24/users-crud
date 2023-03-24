import { LoginMutationPayload } from "@/data/user/login.data";
import AuthClient from "@/services/auth-client";
import ErrorManager from "@/services/error-manager";
import { FieldProps } from "@/types/formik";
import { useLayoutEffect } from "react";
import { Flex, TextInput, Button, Container, Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useAuth } from "@/data/user/auth.data";
import Spinner from "@/components/misc/spinner";

export default function Login() {
  const router = useRouter();
  const loginMutation = useMutation<void, AxiosError, LoginMutationPayload>(
    (payload) => {
      return AuthClient.login(payload);
    },
    {
      onError: (err) => {
        ErrorManager.handleError(err, { heading: "Login failed" });
      },
    }
  );

  const decodeMutation = useMutation<void, AxiosError, string>(
    (payload) => {
      return AuthClient.decode(payload, router);
    },
    {
      onError: (err) => {
        ErrorManager.handleError(err, { heading: "Login failed" });
      },
    }
  );
  const auth = useAuth();

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && !auth.user) {
      decodeMutation.mutate(accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  return decodeMutation.isLoading ? (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner className="w-6 h-6 border-[3px] text-blue-1" />
      </div>
    </>
  ) : (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => {
        loginMutation.mutate({ ...values, router });
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
      })}
    >
      {() => {
        return (
          <Form>
            <Container>
              <Flex w={"100%"} h={"100vh"} justify="center" align={"center"} direction="column" gap={16}>
                <Text>Welcome to Users CRUD</Text>
                <Field name={"email"}>
                  {({ field, meta }: FieldProps) => {
                    return (
                      <>
                        <TextInput label="Email" placeholder="Enter email" {...field} withAsterisk error={meta.error} />
                      </>
                    );
                  }}
                </Field>

                <Button type="submit">Login</Button>
              </Flex>
            </Container>
          </Form>
        );
      }}
    </Formik>
  );
}
