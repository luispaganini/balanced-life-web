// src/components/OtpVerificationComponents/OtpForm.tsx
import React from 'react';

interface OtpFormProps {
    cpf: string;
    handleCpfChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCpfSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    loading: boolean;
}

const OtpForm: React.FC<OtpFormProps> = ({ cpf, handleCpfChange, handleCpfSubmit, loading }) => (
    <form id="cpf-form" onSubmit={handleCpfSubmit}>
        <header className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-1">Verificação de CPF</h1>
            <p className="text-[15px] text-slate-500">
                Digite seu número de CPF para continuar.
            </p>
        </header>
        <div className="mb-4">
            <input
                type="text"
                value={cpf}
                onChange={handleCpfChange}
                className="w-full text-black bg-white border border-slate-300 rounded-lg p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                placeholder="Digite o CPF"
                maxLength={14}
            />
        </div>
        <div className="max-w-[260px] mx-auto mt-4">
            <button
                type="submit"
                className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
            >
                {loading ? 'Verificando...' : 'Verificar'}
            </button>
        </div>
    </form>
);

export default OtpForm;
