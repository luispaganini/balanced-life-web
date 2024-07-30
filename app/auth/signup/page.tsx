"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserIcon, LockClosedIcon, EnvelopeIcon, PhoneIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import { formatCPF, formatPhoneNumber, validateCPF } from "@/utils/User/user";
import { TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, InputAdornment, IconButton } from '@mui/material';
import { createAccount } from "@/services/login/login";
import { useRouter } from "next/navigation";
import CircularProgress from '@mui/material/CircularProgress';
import UserRoleEnum from "@/enums/UserRoleEnum";
import { getCurrentDate } from "@/utils/Date/date";

const SignUp: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    // Estado para armazenar os valores dos inputs
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

    // Estado para armazenar os erros de validação
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Atualiza o estado do formulário quando um input muda
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

    // Função de validação
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

    // Valida os inputs e exibe erros se necessário
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

        // Exibe os valores no console se todos os campos forem válidos
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
        <div className="bg-cyan-bg">
            <div className="w-6/12 m-auto pt-20 pb-20">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="p-4 sm:p-12.5 xl:p-17.5">
                        <div className="flex items-center justify-center">
                            <div className="justify-center flex-col self-center flex items-center">
                                <Image
                                    width={150}
                                    height={50}
                                    src={"/images/logo/logo-icon.png"}
                                    alt="Logo"
                                />
                                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                    Cadastre-se
                                </h2>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {inputs.map((item) => (
                                <div key={item.name} className="mb-4">
                                    <label
                                        htmlFor={item.name}
                                        className="mb-2.5 block font-medium text-black dark:text-white"
                                    >
                                        {item.label}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={item.type}
                                            placeholder={item.label}
                                            name={item.name}
                                            id={item.name}
                                            value={formData[item.name as keyof typeof formData]}
                                            onChange={handleChange}
                                            max={item.name === "birth" ? getCurrentDate() : undefined}
                                            className={`w-full rounded-lg border ${errors[item.name] ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                            aria-invalid={errors[item.name] ? "true" : "false"}
                                            aria-describedby={`${item.name}-error`}
                                        />
                                        {errors[item.name] && (
                                            <p id={`${item.name}-error`} className="text-red-500 text-sm mt-1">
                                                {errors[item.name]}
                                            </p>
                                        )}
                                        {item.type !== "date" &&
                                            <span className="absolute right-4 top-4 text-stroke">
                                                {React.createElement(item.icon, { className: "h-6 w-6 text-stroke" })}
                                            </span>
                                        }
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

                            <div className="mb-5">
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 flex items-center justify-center"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} className="text-white" />
                                    ) : (
                                        "Criar conta"
                                    )}
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <p>
                                    Já tem uma conta?{" "}
                                    <Link href="/auth/signin" className="text-primary">
                                        Entrar
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

export default SignUp;
