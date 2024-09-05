 // Función para cargar el calendario del mes seleccionado
function cargarCalendario() {
    const mesSeleccionado = parseInt(document.getElementById("mes").value);
    const fecha = new Date();
    fecha.setFullYear(new Date().getFullYear(), mesSeleccionado, 1);
    const calendario = document.getElementById("calendario");
    calendario.innerHTML = ""; // Limpia el calendario para una nueva selección

    // Agrega los días de la semana como cabeceras
    const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    for (let i = 0; i < diasSemana.length; i++) {
        const diaSemana = document.createElement("div");
        diaSemana.textContent = diasSemana[i];
        calendario.appendChild(diaSemana);
    }

    // Calcula el día de la semana del primer día del mes
    const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();
    const diaIndexInicio = primerDia === 0 ? 6 : primerDia - 1;

    // Crea espacios vacíos hasta el primer día del mes
    for (let i = 0; i < diaIndexInicio; i++) {
        const diaVacio = document.createElement("div");
        diaVacio.classList.add("dia");
        calendario.appendChild(diaVacio);
    }

    // Crea y muestra cada día del mes
    for (let i = 1; i <= new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate(); i++) {
        const fechaDia = new Date(fecha.getFullYear(), fecha.getMonth(), i);
        const diaSemanaIndex = fechaDia.getDay();
        const diaIndexAjustado = diaSemanaIndex === 0 ? 6 : diaSemanaIndex - 1;
        const dia = document.createElement("div");
        dia.classList.add("dia");
        dia.textContent = i;
        dia.dataset.fecha = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${i}`;

        // Marca los días disponibles u ocupados
        if (diaIndexAjustado === 5 || diaIndexAjustado === 6) { // Fin de semana ocupado
            dia.classList.add("ocupado");
        } else {
            let disponibilidad = Math.random() < 0.7; // Probabilidad de disponibilidad
            if (disponibilidad) {
                dia.classList.add("disponible");
                dia.addEventListener("click", function() {
                    mostrarHorasDisponibles(this.dataset.fecha);
                    const dias = document.querySelectorAll(".dia");
                    dias.forEach(d => d.classList.remove("seleccionado"));
                    this.classList.add("seleccionado");
                    document.getElementById("fechaSeleccionada").textContent = `Fecha seleccionada: ${this.dataset.fecha}`;
                });
            } else {
                dia.classList.add("ocupado");
            }
        }
        calendario.appendChild(dia);
    }
}

// Función para mostrar las horas disponibles en un día seleccionado
function mostrarHorasDisponibles(fecha) {
    const listaHoras = document.getElementById("listaHoras");
    listaHoras.innerHTML = "";
    const horasInicio = 9;
    const horasFin = 18;
    for (let i = horasInicio; i <= horasFin; i++) {
        if (Math.random() < 0.7) { // Probabilidad de que una hora esté disponible
            const li = document.createElement("li");
            li.textContent = `${i}:00`;
            li.classList.add("hora");
            li.dataset.hora = i;
            li.addEventListener("click", function() {
                const horas = document.querySelectorAll("#listaHoras .hora");
                horas.forEach(h => h.classList.remove("seleccionada"));
                this.classList.add("seleccionada");
            });
            listaHoras.appendChild(li);
        }
    }
    // Muestra la sección de horas disponibles
    const horasDisponibles = document.getElementById("horasDisponibles");
    horasDisponibles.style.display = "block";
}
// Función para confirmar la reserva
function confirmarReserva() {
    const email = document.getElementById("email").value;
    const fechaSeleccionada = document.getElementById("fechaSeleccionada").textContent;
    const horaSeleccionadaElement = document.querySelector("#listaHoras .hora.seleccionada");
    
    // Verificar que todos los datos necesarios están presentes
    if (!email || !fechaSeleccionada || !horaSeleccionadaElement) {
        alert("Por favor, completa todos los campos y selecciona una fecha y hora.");
        return;
    }

    const horaSeleccionada = horaSeleccionadaElement.textContent;
    
    // validación de email 
    if (!email.includes('@')) {
        alert("Por favor, introduce un correo electrónico válido.");
        return;
    }

    // Confirmación de la reserva
    alert(`Tu reserva ha sido confirmada para el ${fechaSeleccionada} a las ${horaSeleccionada}.\nTe hemos enviado un correo de confirmación a ${email}.`);
    

}