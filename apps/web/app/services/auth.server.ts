import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import type { User } from "~/models/user.server";
import { verifyLogin } from "~/models/user.server";

export let authenticator = new Authenticator<Pick<User, "id">>(sessionStorage);

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await verifyLogin(email, password);
  if (!user) {
    throw new Error("Incorrect credentials");
  }
  return { id: user.id };
};

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email")!;
    const password = form.get("password")!;
    let user = await login({
      email: email as string,
      password: password as string,
    });
    return user;
  }),
  "user-pass"
);
