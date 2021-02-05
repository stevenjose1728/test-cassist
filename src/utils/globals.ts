import Swal from 'sweetalert2';
import HoldOn from 'react-hold-on';
import $ from 'jquery';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

	// const formatMiles = (n, decimals = true) => {
	// 	let c = isNaN(c = Math.abs(c)) ? 2 : c,
	// 		d = d == undefined ? "," : d,
	// 		t = t == undefined ? "." : t,
	// 		s = n < 0 ? "-" : "",
	// 		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
	// 		j = (j = i.length) > 3 ? j % 3 : 0;

	// 	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	// }

	const hideTooltip = async () => {
        await setTimeout( async () =>{
			//@ts-ignore
            await $('.tooltip.fade.show').tooltip('hide');
		}, 450)
	}
	
	const setLoading = () => {
		HoldOn.open({
			 theme: "sk-bounce",
			 idElement: "root-app-react-hold"
		});
	}

	const quitLoading = () => {
		HoldOn.close();
	}
	const showSuccess = (message?: string) => {
		Swal.fire({
            text: message || 'Accion realizada exitosamente',
            icon: "success",
			title: "",
			showCancelButton: false,
			showConfirmButton: false,
			toast: true,
			position: 'top-end',
			timerProgressBar: true,
			timer: 5000,
        });
	}

	const showError = (message?: string) => {
		Swal.fire({
            title: "",
            text: message || "Se ha producido un error",
            icon: "error",
			showCancelButton: false,
			showConfirmButton: false,
			toast: true,
			position: 'top-end',
			timerProgressBar: true,
			timer: 5000,
        });
	}

	const confirm = (message: string, callback: () => void) => {
		Swal.fire({
            title: "",
            text: message,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then(async confirm => {
        	if (confirm.value) {
        		callback();
        	}
        });
	}

	const toBase64 = (file:any) => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});

export {
	hideTooltip,
	toBase64,
	showError,
	showSuccess,
	confirm,
	setLoading,
	quitLoading
}
