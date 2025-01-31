document.addEventListener("DOMContentLoaded", () => {
  const materiasContainer = document.getElementById("materias");
  const comidasContainer = document.getElementById("comidas");
  const horarioGenerado = document.getElementById("horarioGenerado");

  const agregarMateria = document.getElementById("agregarMateria");
  const agregarComida = document.getElementById("agregarComida");
  const generarHorario = document.getElementById("generarHorario");

  // Agregar una nueva materia
  agregarMateria.addEventListener("click", () => {
    const materiaDiv = document.createElement("div");
    materiaDiv.classList.add("materia");
    materiaDiv.innerHTML = `
      <input type="text" name="nombre" placeholder="Nombre de la materia">
      <select name="prioridad">
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
    `;
    materiasContainer.appendChild(materiaDiv);
  });

  // Agregar una nueva comida
  agregarComida.addEventListener("click", () => {
    const comidaDiv = document.createElement("div");
    comidaDiv.classList.add("comida");
    comidaDiv.innerHTML = `
      <input type="text" name="nombre" placeholder="Nombre de la comida">
      <input type="time" name="hora">
    `;
    comidasContainer.appendChild(comidaDiv);
  });

  // Generar el horario
  generarHorario.addEventListener("click", () => {
    horarioGenerado.innerHTML = "";

    // Obtener datos del formulario
    const materias = Array.from(document.querySelectorAll("#materias .materia")).map((materia) => ({
      nombre: materia.querySelector("input[name='nombre']").value,
      prioridad: materia.querySelector("select[name='prioridad']").value,
    }));

    const comidas = Array.from(document.querySelectorAll("#comidas .comida")).map((comida) => ({
      nombre: comida.querySelector("input[name='nombre']").value,
      hora: comida.querySelector("input[name='hora']").value,
    }));

    const horasDisponibles = parseInt(document.getElementById("horasDisponibles").value, 10);
    const horaInicio = document.getElementById("horaInicio").value;

    // Validar entradas
    if (!horasDisponibles || !horaInicio) {
      alert("Por favor, ingresa las horas disponibles y la hora de inicio.");
      return;
    }

    const horaInicioEntera = parseInt(horaInicio.split(":")[0], 10);
    let rangoDisponible = horasDisponibles - 1; // Restar 1 hora para gestión emocional

    const actividades = [];

    // Procesar comidas
    comidas.forEach((comida) => {
      const horaComida = parseInt(comida.hora.split(":")[0], 10);
      if (horaComida >= horaInicioEntera && horaComida < horaInicioEntera + rangoDisponible) {
        rangoDisponible -= 0.5; // Restar 30 minutos
        actividades.push({
          tipo: "comida",
          nombre: comida.nombre,
          inicio: comida.hora,
          fin: `${horaComida + 0.5}:00`,
          duracion: "30 minutos",
        });
      }
    });

    // Distribuir tiempo entre materias
    const prioridades = { alta: 0.5, media: 0.3, baja: 0.2 };
    const totalPrioridad = materias.reduce((acc, materia) => acc + prioridades[materia.prioridad], 0);
    let horaActual = horaInicioEntera;

    materias.forEach((materia) => {
      if (rangoDisponible <= 0) return;

      const tiempoMateria = Math.floor((rangoDisponible * prioridades[materia.prioridad]) / totalPrioridad);
      if (tiempoMateria > 0) {
        actividades.push({
          tipo: "materia",
          nombre: materia.nombre,
          inicio: `${horaActual}:00`,
          fin: `${horaActual + tiempoMateria}:00`,
          duracion: `${tiempoMateria} horas`,
        });
        rangoDisponible -= tiempoMateria;
        horaActual += tiempoMateria;
      }
    });

    // Agregar gestión emocional
    if (rangoDisponible > 0) {
      actividades.push({
        tipo: "gestion emocional",
        nombre: "Gestión Emocional",
        inicio: `${horaActual}:00`,
        fin: `${horaActual + 1}:00`,
        duracion: "1 hora",
      });
    }

    // Ordenar y mostrar actividades
    actividades.sort((a, b) => parseInt(a.inicio.split(":")[0]) - parseInt(b.inicio.split(":")[0]));
    actividades.forEach((actividad) => {
      horarioGenerado.innerHTML += `<li>${actividad.nombre}: ${actividad.inicio} - ${actividad.fin} (${actividad.duracion})</li>`;
    });
  });
});
