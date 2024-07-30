export const validateCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    const digits = cpf.split('').map(Number);
    const validateDigit = (start: number, end: number) => {
        const sum = digits.slice(0, end).reduce((acc, val, i) => acc + val * (start - i), 0);
        const remainder = (sum * 10) % 11;
        return remainder === 10 ? 0 : remainder;
    };

    const firstDigit = validateDigit(10, 9);
    const secondDigit = validateDigit(11, 10);

    return digits[9] === firstDigit && digits[10] === secondDigit;
};

export const formatCPF = (value: string) => {
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length <= 3) return value;
    if (value.length <= 6) return `${value.slice(0, 3)}.${value.slice(3)}`;
    if (value.length <= 9) return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;
};

export const formatPhoneNumber = (value: string) => {
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length <= 2) return `(${value}`;
    if (value.length <= 7) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
};