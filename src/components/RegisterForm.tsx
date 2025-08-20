import { useForm } from "react-hook-form";
import { signUp } from "../api";
import { APP_ROUTER_PATH } from "../constants";

type TRegisterValues = {
  email: string;
  password: string;
};

type TRegisterFormProps = {
  onRegistered: () => void;
};

export default function RegisterForm({ onRegistered }: TRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterValues>();

  const onSubmit = async (data: TRegisterValues) => {
    const resSignUp = await signUp(data.email, data.password);

    if (resSignUp.data) {
      onRegistered();
      return;
    }

    if (resSignUp.error) {
      alert(resSignUp.error);
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 300, margin: "0 auto" }}
    >
      <h2>Register</h2>
      <input
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <a href={APP_ROUTER_PATH.login}>Login</a>

      <button type="submit">Register</button>
    </form>
  );
}
