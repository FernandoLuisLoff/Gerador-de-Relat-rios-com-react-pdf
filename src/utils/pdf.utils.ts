import { pdf } from "@react-pdf/renderer";
import type { JSX } from "react";

export class PdfUtils {
    public static async gerar(pdfComponent: JSX.Element) {
        let url: string = '';
        try {
            const blob = await pdf(pdfComponent).toBlob();
            url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } finally {
            URL.revokeObjectURL(url);
        }
    }
}