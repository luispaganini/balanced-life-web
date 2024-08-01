// src/components/OtpVerificationComponents/PasswordResetForm.tsx
import React, { useState } from 'react';

interface PasswordResetFormProps {
    handlePasswordResetSubmit: (password: string) => void;
    loading: boolean;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ handlePasswordResetSubmit, loading }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors({ ...errors, password: '' });
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (errors.confirmPassword) {
            setErrors({ ...errors, confirmPassword: '' });
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem.';
        }

        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        handlePasswordResetSubmit(password);
    };

    return (
        <form id="password-reset-form" onSubmit={handleSubmit}>
            <header className="mb-8 text-center">
                <h1 className="text-2xl font-bold mb-1">Redefinição de Senha</h1>
                <p className="text-[15px] text-slate-500">
                    Crie uma nova senha para sua conta.
                </p>
            </header>
            <div className="mb-4">
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`w-full text-black bg-white border ${errors.password ? 'border-red-500' : 'border-slate-300'} rounded-lg p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
                    placeholder="Nova Senha"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={`w-full text-black bg-white border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-300'} rounded-lg p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
                    placeholder="Confirmar Senha"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
            </div>
            <div className="max-w-[260px] mx-auto mt-4">
                <button
                    type="submit"
                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
                    disabled={loading}
                >
                    {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                </button>
            </div>
        </form>
    );
};

export default PasswordResetForm;
