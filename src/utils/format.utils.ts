export class FormatUtils {
    public static onlyNumber(value?: string | null): string {
        return (value ?? '').replace(/\D/g, '');
    }

    public static date(value?: Date | string | null): string {
        return !!value ? new Date(
            typeof value === 'string' ? new Date(value) : value
        ).toLocaleDateString('pt-BR') : '01/01/1900';
    }

    public static currency(value?: number | string | null): string {
        return (
            typeof value === 'string' ? Number(value) : value ?? 0
        ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    public static cpf(value?: string | null): string {
        if (!value) return '';
        const valueCleaned = this.onlyNumber(value);
        return valueCleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
}