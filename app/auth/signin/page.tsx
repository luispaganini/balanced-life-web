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
                router.push("/dashboard");

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
        <div className="bg-cyan-bg min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <div className="text-center mb-6">
                    <Image
                        width={150}
                        height={50}
                        src="/images/logo/logo-icon.png"
                        alt="Logo"
                        className="mx-auto"
                    />
                    <h2 className="text-2xl font-bold text-black mb-2">Login</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                        <div key={input.name} className="mb-4">
                            <label
                                htmlFor={input.name}
                                className="block text-sm font-medium text-gray-700"
                            >
                                {input.label}
                            </label>
                            <div className="relative mt-1">
                                <input
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    name={input.name}
                                    id={input.name}
                                    value={formData[input.name as keyof typeof formData]}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg ${errors[input.name] ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`}
                                    aria-invalid={errors[input.name] ? "true" : "false"}
                                    aria-describedby={`${input.name}-error`}
                                />
                                {errors[input.name] && (
                                    <p id={`${input.name}-error`} className="text-red-500 text-xs mt-1">
                                        {errors[input.name]}
                                    </p>
                                )}
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    {React.createElement(input.icon, { className: "h-5 w-5 text-gray-500" })}
                                </span>
                            </div>
                        </div>
                    ))}

                    <div className="mb-5">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} className="text-white" />
                            ) : (
                                "Entrar"
                            )}
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                        <p>
                            Esqueceu sua senha?{" "}
                            <Link href="/auth/reset-password" className="text-indigo-500 hover:underline">
                                Recuperar senha
                            </Link>
                        </p>
                        <br />
                        <p>
                            Ainda não tem uma conta?{" "}
                            <Link href="/auth/signup" className="text-indigo-500 hover:underline">
                                Criar conta
                            </Link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SignIn;
