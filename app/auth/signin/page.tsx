"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { login, loginVerifyCPF } from "@/services/login/login";
import useAuthStore from "@/store/authStore";
import { formatCPF, validateCPF } from "@/utils/User/user";
import UserRoleEnum from "@/enums/UserRoleEnum";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

const SignIn: React.FC = () => {
    const router = useRouter();
    const authStore = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        cpf: "",
        password: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "cpf") {
            setFormData({
                ...formData,
                [name]: formatCPF(value),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validateForm = () => {
        const { cpf, password } = formData;
        const newErrors: { [key: string]: string } = {};

        if (!cpf)
            newErrors.cpf = "O CPF é obrigatório.";
        else if (!validateCPF(cpf))
            newErrors.cpf = "O CPF deve ser válido.";

        if (!password)
            newErrors.password = "A senha é obrigatória.";

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);

        try {
            const response = await login(formData.cpf, formData.password);
            if (response) {
                const user = await loginVerifyCPF(formData.cpf);
                if (user) {
                    if (user.userRole && user.userRole.id == UserRoleEnum.Nutricionist)
                        authStore.setUser(user);
                    else {
                        alert("Usuario não autorizado!\nEste site é apenas para Nutricionistas.");
                        return;
                    }
                }

                authStore.setToken(response.accessToken);
                authStore.setRefreshToken(response.refreshToken);
                router.push("/home");

            } else {
                alert("Usuário ou senha inválidos.");
            }
        } catch (error) {
            console.error(error)
            alert("Erro ao fazer login.");
        } finally {
            setLoading(false);
        }
        console.log("CPF:", formData.cpf);
        console.log("Senha:", formData.password);
    };

    const inputs = [
        { label: "CPF", type: "text", icon: UserIcon, placeholder: "Insira seu CPF", name: "cpf" },
        { label: "Senha", type: "password", icon: LockClosedIcon, placeholder: "Senha", name: "password" }
    ];

    return (
        <div className="bg-cyan-bg">
            <div className="w-6/12 m-auto pt-20 pb-20">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-20 mb-20">
                    <div className="w-full xl:w-3/4 m-auto p-4 sm:p-12.5 xl:p-17.5">
                        <div className="flex items-center justify-center">
                            <div className="flex-col items-center flex">
                                <Image
                                    width={150}
                                    height={50}
                                    src="/images/logo/logo-icon.png"
                                    alt="Logo"
                                />
                                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                    Login
                                </h2>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {inputs.map((input) => (
                                <div key={input.name} className="mb-4">
                                    <label
                                        htmlFor={input.name}
                                        className="mb-2.5 block font-medium text-black dark:text-white"
                                    >
                                        {input.label}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            name={input.name}
                                            id={input.name}
                                            value={formData[input.name as keyof typeof formData]}
                                            onChange={handleChange}
                                            className={`w-full rounded-lg border ${errors[input.name] ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                            aria-invalid={errors[input.name] ? "true" : "false"}
                                            aria-describedby={`${input.name}-error`}
                                        />
                                        {errors[input.name] && (
                                            <p id={`${input.name}-error`} className="text-red-500 text-sm mt-1">
                                                {errors[input.name]}
                                            </p>
                                        )}
                                        <span className="absolute right-4 top-4 text-stroke">
                                            {React.createElement(input.icon, { className: "h-6 w-6 text-stroke" })}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            <div className="mb-5">
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 flex items-center justify-center"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} className="text-white" />
                                    ) : (
                                        "Entrar"
                                    )}
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <p>
                                    Ainda não é cadastrado?{" "}
                                    <Link href="/auth/signup" className="text-primary">
                                        Cadastrar
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
