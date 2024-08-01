// src/app/auth/otp-verification/OtpVerification.tsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatCPF } from '@/utils/User/user';
import OtpForm from './OtpForm';
import OtpVerificationForm from './OtpVerificationForm';
import PasswordResetForm from './ResetPasswordForm';
import { loginVerifyCPF } from '@/services/login/login';
import IUserInterface from '@/interfaces/User/IUserInterface';
import { resetPasswordGenerateCode, verifyPasswordCode } from '@/services/login/resetPassword';
import useAuthStore from '@/store/authStore';
import { patchUser } from '@/services/user/user';

const OtpVerification: React.FC = () => {
    const router = useRouter();
    const { setToken, clearTokens, token } = useAuthStore();
    const [cpf, setCpf] = useState('');
    const [loadingCpf, setLoadingCpf] = useState(false);
    const [otp, setOtp] = useState('');
    const [loadingOtp, setLoadingOtp] = useState(false);
    const [loadingPasswordReset, setLoadingPasswordReset] = useState(false);
    const [step, setStep] = useState<'cpf' | 'otp' | 'passwordReset'>('cpf');
    const [user , setUser] = useState<IUserInterface>();

    useEffect(() => {
        console.log(step);
    }, [step]);

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedCpf = formatCPF(e.target.value);
        setCpf(formattedCpf);
    };

    const handleCpfSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingCpf(true);
        try {
            const response = await loginVerifyCPF(cpf);
            if (!response) 
                throw new Error('CPF não encontrado.');
            
            setUser(response);
            await resetPasswordGenerateCode(response.id as number);
            setStep('otp');
        } catch (error) {
            alert('Não foi possível encontrar o CPF informado.');
        } finally {
            setLoadingCpf(false);
        }
    };
    const handleOptSendAgainCode = async () => {
        setLoadingOtp(true);
        try {
            await resetPasswordGenerateCode(user?.id as number);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingOtp(false);
        }
    }

    const handleOtpChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (otp.length === 6) {
            setLoadingOtp(true);
            try {
                const response = await verifyPasswordCode(otp);
                if (response.status !== 200)
                    throw new Error('Código inválido.');

                setToken(response.data.accessToken);
                setStep('passwordReset');
            } catch (error) {
                alert('Código inválido.');
            } finally {
                setLoadingOtp(false);
            }
        }
    };

    const handlePasswordSubmit = async (password: string) => {
        setTimeout(() => {
            setLoadingPasswordReset(true);
        }, 100);
        try {
            const response = await patchUser({
                password: password,
                id: undefined,
                name: undefined,
                birth: undefined,
                email: undefined,
                urlImage: undefined,
                gender: undefined,
                cpf: undefined,
                street: undefined,
                number: undefined,
                zipCode: undefined,
                location: undefined,
                userRole: undefined,
                phoneNumber: undefined,
                instagram: undefined,
                facebook: undefined,
                whatsapp: undefined,
                expirationLicence: undefined,
                isCompleteProfile: undefined,
                district: undefined
            }, user?.id as number);

            if ('id' in response) {
                clearTokens();
                router.push('/auth/signin');
            } else
                alert(response.message)


        } catch (error) {
            console.error(error);
        } finally {
            setLoadingPasswordReset(false);
        }
    };

    return (
        <div className="bg-cyan-bg min-h-screen flex items-center justify-center flex-1">
            <div className="w-full max-w-md bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
                {step === 'cpf' && (
                    <OtpForm
                        cpf={cpf}
                        handleCpfChange={handleCpfChange}
                        handleCpfSubmit={handleCpfSubmit}
                        loading={loadingCpf}
                    />
                )}
                {step === 'otp' && (
                    <OtpVerificationForm
                        otp={otp}
                        handleOtpChange={setOtp}
                        handleOtpSubmit={handleOtpChange}
                        handleOptSendAgainCode={handleOptSendAgainCode}
                        loading={loadingOtp}
                    />
                )}
                {step === 'passwordReset' && (
                    <PasswordResetForm
                        handlePasswordResetSubmit={handlePasswordSubmit}
                        loading={loadingPasswordReset}
                    />
                )}
            </div>
        </div>
    );
};

export default OtpVerification;
