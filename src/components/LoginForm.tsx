import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "../api";
import type { TAuthData } from "../types";
import { APP_ROUTER_PATH } from "../constants";

type TLoginInputs = {
  email: string;
  password: string;
};

type TLoginFormProps = {
  onSignedIn: (data: TAuthData) => void;
};

export default function LoginForm({ onSignedIn }: TLoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginInputs>();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: TLoginInputs) => {
    setLoading(true);
    setErrorMsg("");

    const { data: signedInData, error } = await signIn(
      data.email,
      data.password
    );
    setLoading(false);

    if (error) {
      setErrorMsg(error);
    }

    if (signedInData) {
      onSignedIn(signedInData);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <a href={APP_ROUTER_PATH.register}>Register</a>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
