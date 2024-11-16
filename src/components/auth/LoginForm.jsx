import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        // reset,
    } = useForm();

    const submitForm = (formData) => {
        console.log(formData);
        navigate("/");
    };

    return (
        <form
            onSubmit={handleSubmit(submitForm)}
            className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
        >
            {/* //? email */}
            <Field label="Email" error={errors.email}>
                <input
                    {...register("email", { required: "Email is required" })}
                    className={`auth-input ${errors.email ? "border-red-500" : "border-gray-200"}`}
                    type="email"
                    name="email"
                    id="email"
                />
            </Field>

            {/* //? password */}
            <Field label="Password" error={errors.password}>
                <input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Your password must be atleast 8 characters",
                        },
                    })}
                    className={`auth-input ${
                        errors.password ? "border-red-500" : "border-gray-200"
                    }`}
                    type="password"
                    name="password"
                    id="password"
                />
            </Field>

            <Field>
                <button
                    type="submit"
                    className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                >
                    Login
                </button>
            </Field>
        </form>
    );
}
