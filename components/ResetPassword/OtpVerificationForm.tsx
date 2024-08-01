// src/components/OtpVerificationComponents/OtpVerificationForm.tsx
import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';

interface OtpVerificationFormProps {
    otp: string;
    handleOtpChange: (otp: string) => void;
    handleOtpSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleOptSendAgainCode: () => void;
    loading: boolean;
}

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({
    otp,
    handleOtpChange,
    handleOtpSubmit,
    loading,
    handleOptSendAgainCode
}) => {
    const [countdown, setCountdown] = useState<number>(0);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isTimerActive && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsTimerActive(false);
        }

        return () => clearInterval(timer);
    }, [countdown, isTimerActive]);

    const handleSendAgainClick = () => {
        if (!isTimerActive) {
            handleOptSendAgainCode();
            setCountdown(60);
            setIsTimerActive(true);
        }
    };

    return (
        <form id="otp-form" onSubmit={handleOtpSubmit}>
            <header className="mb-8 text-center">
                <h1 className="text-2xl font-bold mb-1">Verificação do Código</h1>
                <p className="text-[15px] text-slate-500">
                    Digite o código de verificação de 6 dígitos enviado para seu número de telefone.
                </p>
            </header>
            <div className="flex items-center justify-center gap-3 mb-4">
                <OtpInput
                    value={otp}
                    onChange={handleOtpChange}
                    numInputs={6}
                    renderSeparator={<span className="w-1"></span>}
                    inputStyle="text-center text-2xl font-bold text-black bg-white border border-slate-300 rounded-lg focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    containerStyle="flex justify-center gap-3"
                    renderInput={(props) => <input {...props} />}
                />
            </div>
            <div className="max-w-[260px] mx-auto mt-4">
                <button
                    type="submit"
                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
                >
                    {loading ? 'Verificando...' : 'Verificar Conta'}
                </button>
            </div>
            <div className="flex justify-center text-sm text-slate-500 mt-4">
                Não recebeu o código?
                <a
                    className={`font-medium ${isTimerActive ? 'text-gray-400' : 'text-indigo-500 hover:text-indigo-600'} ml-1`}
                    onClick={handleSendAgainClick}
                >
                    {isTimerActive ? `Reenviar (${Math.floor(countdown / 60)}:${countdown % 60})` : 'Reenviar'}
                </a>
            </div>
        </form>
    );
};

export default OtpVerificationForm;
