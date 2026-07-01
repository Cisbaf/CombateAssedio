

export function FormatPhone(phone: string){
    if (!phone) return "--";

    const num = phone.replace(/\D/g, '');

    if (num.length === 11) {
        return `(${num.slice(0, 2)}) ${num.slice(2, 7)}-${num.slice(7, 11)}`;
    }
    return phone;
}

export function FormatDate(date: string){

    const hasZ = date.toUpperCase().endsWith('Z');
    const data = new Date(hasZ ? date : date + 'Z');
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

export function FormatCPF(cpf: string){
    if (!cpf) return "--";

    const num = cpf.replace(/\D/g, '');

    if (num.length === 11) {
        return `${num.slice(0, 3)}.${num.slice(3, 6)}.${num.slice(6, 9)}-${num.slice(9, 11)}`;
    }
    return cpf;
}

export function FormatDataHora(dataHora: string): string{
    if (!dataHora) return "--";

    const hasZ = dataHora.toUpperCase().endsWith('Z');
    const data = new Date(hasZ ? dataHora : dataHora + 'Z');
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
}