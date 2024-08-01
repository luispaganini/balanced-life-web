"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserIcon, LockClosedIcon, EnvelopeIcon, PhoneIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import { formatCPF, formatPhoneNumber, validateCPF } from "@/utils/User/user";
import { TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';
import { createAccount } from "@/services/login/login";
import { useRouter } from "next/navigation";
import CircularProgress from '@mui/material/CircularProgress';
import UserRoleEnum from "@/enums/UserRoleEnum";
import { getCurrentDate } from "@/utils/Date/date";

const SignUp: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        cpf: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        birth: "",
        gender: ""
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "cpf") {
            setFormData({
                ...formData,
                [name]: formatCPF(value),
            });
        } else if (name === "phoneNumber") {
            setFormData({
                ...formData,
                [name]: formatPhoneNumber(value),
            });
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const validateForm = () => {
        const { name, email, cpf, password, confirmPassword, phoneNumber, birth, gender } = formData;
        const newErrors: { [key: string]: string } = {};

        if (!name) newErrors.name = "O nome é obrigatório.";
        if (!email) {
            newErrors.email = "O email é obrigatório.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "O email deve ser válido.";
        }
        if (!cpf)
            newErrors.cpf = "O CPF é obrigatório.";
        else if (!validateCPF(cpf))
            newErrors.cpf = "O CPF deve ser válido.";

        if (!password) newErrors.password = "A senha é obrigatória.";
        if (password !== confirmPassword) newErrors.confirmPassword = "As senhas não coincidem.";
        if (!phoneNumber) newErrors.phoneNumber = "O telefone é obrigatório.";
        if (!birth) newErrors.birth = "A data de nascimento é obrigatória.";
        if (!gender) newErrors.gender = "O gênero é obrigatório.";

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
            await createAccount(
                {
                    name: formData.name,
                    email: formData.email,
                    cpf: formData.cpf,
                    password: formData.password,
                    phoneNumber: formData.phoneNumber,
                    birth: new Date(formData.birth),
                    isCompleteProfile: true,
                    gender: formData.gender,
                    idUserRole: UserRoleEnum.Nutricionist,
                    id: undefined,
                    urlImage: undefined,
                    street: undefined,
                    number: undefined,
                    zipCode: undefined,
                    location: undefined,
                    instagram: undefined,
                    facebook: undefined,
                    whatsapp: undefined,
                    expirationLicence: undefined,
                    district: undefined,
                    userRole: undefined,
                }
            );
            router.push("/auth/signin");
        } catch (error) {
            console.error("Erro ao criar conta:", error);
            alert("Erro ao criar conta.");
        } finally {
            setLoading(false);
        }

        console.log("Form Data:", formData);
    };

    const inputs = [
        { label: "Nome", icon: UserIcon, name: "name", type: "text" },
        { label: "E-mail", icon: EnvelopeIcon, name: "email", type: "email" },
        { label: "CPF", icon: UserIcon, name: "cpf", type: "text" },
        { label: "Senha", icon: LockClosedIcon, name: "password", type: "password" },
        { label: "Repetir Senha", icon: LockClosedIcon, name: "confirmPassword", type: "password" },
        { label: "Telefone", icon: PhoneIcon, name: "phoneNumber", type: "text" },
        { label: "Data de Nascimento", icon: CalendarIcon, name: "birth", type: "date" }
    ];

    return (
        <div className="bg-cyan-bg min-h-screen flex items-center justify-center pt-4 pb-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center justify-center mb-8">
                    <Image
                        width={150}
                        height={50}
                        src="/images/logo/logo-icon.png"
                        alt="Logo"
                    />
                </div>
                <h2 className="text-2xl font-bold text-center mb-8">Cadastre-se</h2>
                <form onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                        <div key={input.name} className="mb-4">
                            <label
                                htmlFor={input.name}
                                className="mb-2 block font-medium text-gray-700"
                            >
                                {input.label}
                            </label>
                            <div className="relative">
                                <input
                                    type={input.type}
                                    placeholder={input.label}
                                    name={input.name}
                                    id={input.name}
                                    value={formData[input.name as keyof typeof formData]}
                                    onChange={handleChange}
                                    max={input.name === "birth" ? getCurrentDate() : undefined}
                                    className={`w-full rounded-lg border ${errors[input.name] ? 'border-red-500' : 'border-gray-300'} bg-transparent py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
                                    aria-invalid={errors[input.name] ? "true" : "false"}
                                    aria-describedby={`${input.name}-error`}
                                />
                                {errors[input.name] && (
                                    <p id={`${input.name}-error`} className="text-red-500 text-sm mt-1">
                                        {errors[input.name]}
                                    </p>
                                )}
                                {input.type !== "date" && (
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        {React.createElement(input.icon, { className: "h-5 w-5" })}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}

                    <FormControl component="fieldset" margin="normal">
                        <FormLabel component="legend">Gênero</FormLabel>
                        <RadioGroup
                            name="gender"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        >
                            <FormControlLabel
                                value="Masculino"
                                control={<Radio />}
                                label="Masculino"
                            />
                            <FormControlLabel
                                value="Feminino"
                                control={<Radio />}
                                label="Feminino"
                            />
                        </RadioGroup>
                        {errors.gender && (
                            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                        )}
                    </FormControl>

                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} className="text-white" />
                            ) : (
                                "Criar conta"
                            )}
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                        <p>
                            Já tem uma conta?{" "}
                            <Link href="/auth/signin" className="text-blue-500 hover:text-blue-600">
                                Entrar
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
