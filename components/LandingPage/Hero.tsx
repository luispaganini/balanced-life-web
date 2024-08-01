"use client";
import Image from 'next/image';
import heroImage from '@/public/images/event.jpeg';
import { useRouter } from 'next/navigation';

const Hero: React.FC = () => {
    const router = useRouter();
    return (
        <section className="relative h-screen flex items-center justify-center bg-gray-200">
            <div className="absolute inset-0">
                <Image
                    src={heroImage}
                    alt="Hero Image"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="object-cover" // Adiciona a classe object-cover para garantir que a imagem cubra o contêiner
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="relative z-10 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Balanced Life</h1>
                <p className="mb-6">Ajude seus pacientes a obter a melhor dieta.</p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => router.push('/auth/signin')}
                >
                    Vamos começar
                </button>
            </div>
        </section>
    );
};

export default Hero;
