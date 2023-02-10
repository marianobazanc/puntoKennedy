const carreras = ['LIC. EN ADMINISTRACIÓN', 'LIC. EN ADMINISTRACIÓN HOTELERA', 'LIC. EN CIENCIAS SOCIALES', 'LIC. EN COMERCIALIZACIÓN',
    'LIC. EN COMERCIO INTERNACIONAL', 'LIC. EN DISEÑO GRAFICO', 'LIC. EN PERIODISMO Y COMUNICACIONES', 'LIC. EN PSICOPEDAGOGIA',
    'LIC. EN PUBLICIDAD', 'LIC. EN RELACIONES LABORALES', 'LIC. EN RELACIONES PUBLICAS', 'LIC. EN SERVICIO SOCIAL', 'LIC. EN TURISMO',
    'ABOGACIA', 'CONTADOR PUBLICO', 'PERIODISTA', 'TEC. EN GESTION DE OPERACIONES LOGISTICAS', 'TEC. EN SEGURIDAD E HIGIENE EN EL TRABAJO',
    'TEC. EN TECNOLOGIA DE LA INFORMACION', 'TEC. UNIV. EN MARTILLERO PUBLICO Y CORREDOR', 'TEC. UNIV. EN SEGUROS']

carreras.forEach((carrera) => {
    let opt = document.createElement("option")
    opt.text = carrera
    opt.value = carrera
    selectCarreras.appendChild(opt)
})

/* Validacion del formulario Mas Informacion */
window.addEventListener('load', () => {
    const form = document.getElementById('formularioInformacion')
    const nombre = document.getElementById('nombre')
    const apellido = document.getElementById('apellido')
    const email = document.getElementById('email')
    const telefono = document.getElementById('telefono')
    const provincias = document.getElementById('provincias')
    const carreras = document.getElementById('selectCarreras')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        validacionCampos(e)
    })

    const validacionCampos = (e) => {
        let datos = {
            valorNombre: nombre.value.trim(),
            valorApellido: apellido.value.trim(),
            valorEmail: email.value.trim(),
            valorTelefono: telefono.value.trim(),
            valorProvincia: provincias.value,
            valorCarreras: carreras.value
        }

        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const regexNumber = /^[0-9]*$/
        if (datos.valorNombre === "" || datos.valorApellido === "" || datos.valorEmail === "" || datos.valorTelefono === "" || datos.valorProvincia === "Seleccione una provincia" || datos.valorCarreras === "Seleccione una carrera") {
            Swal.fire({
                title: '¡Error!',
                text: 'Por favor rellene todos los campos del formulario',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return
        }
        if(!regexEmail.test(datos.valorEmail)){
            Swal.fire({
                title: '¡Error!',
                text: 'Ingrese un mail valido',
                icon: 'error',
                confirmButtonColor: 'Ok'
            })
            return
        }
        if(!regexNumber.test(datos.valorTelefono)){
            Swal.fire({
                title: '¡Error!',
                text: 'Ingrese un telefono valido. Solo se admiten numeros',
                icon: 'error',
                confirmButtonColor: 'Ok'
            })
            return
        }
        else {
            Swal.fire({
                title: 'Espere...',
                text: 'Enviando el formulario. Por favor espere...'
            })
            emailjs.sendForm('service_ffmjjim', 'template_w6ptwkj', e.target)
            .then(function () {
                Swal.fire({
                    title: '¡Envio exitoso!',
                    text: 'Hemos recibido su informacion correctamente. En la brevedad nos estaremos comunicando para brindarle toda la informacion',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#5cb85c'
                })
                form.reset()
            }, function (error) {
                Swal.fire({
                    title: '¡Error!',
                    text: 'Ha ocurrido un error inesperado. Intente nuevamente o mas tarde.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            });
        }
    }

})