import Swal from "sweetalert2";

export class SwalUtils {
    public static swalError() {
        Swal.fire({
            icon: 'error',
            title: 'Atenção',
            text: 'Deu Erro!',
            allowOutsideClick: false
        })
    }
}