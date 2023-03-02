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
import { createUser } from "~/models/user.server";
import { authenticator } from "~/services/auth.server";

const schema = z.object({
  fullName: z.string().min(3, "Name too short"),
  email: z.string().email(),
  password: z.string(),
});

type SchemaFields = z.infer<typeof schema>;

export default function SignUp() {
  return (
    <Container>
      <Form method="post">
        <Stack>
          <Title order={1}>Create an account</Title>
          <TextInput
            name="fullName"
            placeholder="Your full name"
            withAsterisk
            label="Full Name"
            autoComplete="name"
          />
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
            placeholder="New Password"
            withAsterisk
            label="Password"
            minLength={8}
            autoComplete="new-password"
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

  await createUser(result.data.email, result.data.password);

  return await authenticator.authenticate("user-pass", clonedRequest, {
    successRedirect: "/dashboard",
    failureRedirect: "/sign-up",
  });
}

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
}
