import {
  Button,
  Container,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { badRequest } from "remix-utils";
import { z } from "zod";
import { authenticator } from "~/services/auth.server";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SchemaFields = z.infer<typeof schema>;

export default function SignIn() {
  return (
    <Container>
      <Form method="post">
        <Stack>
          <Title order={1}>Sign-in into your account</Title>
          <TextInput
            type="email"
            name="email"
            placeholder="Your email"
            withAsterisk
            label="Email"
            autoComplete="email"
          />
          <PasswordInput
            name="password"
            placeholder="Your Password"
            withAsterisk
            label="Password"
            minLength={8}
            autoComplete="current-password"
          />
          <Button type="submit">Sign In</Button>
        </Stack>
      </Form>
    </Container>
  );
}

export async function action({ request }: ActionArgs) {
  const clonedRequest = request.clone();

  const fields = Object.fromEntries(
    await request.formData()
  ) as unknown as SchemaFields;

  const result = schema.safeParse(fields);
  if (!result.success) {
    return badRequest(result.error);
  }

  return authenticator.authenticate("user-pass", clonedRequest, {
    successRedirect: "/dashboard",
    failureRedirect: "/sign-in",
  });
}

export async function loader({ request }: LoaderArgs) {
  return authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
}
