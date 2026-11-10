// Toda la lógica de la pantalla vive acá.
// Lee las órdenes de datos.js y las dibuja en el HTML.

let estadoActual = "todas";

// --- Almacenamiento ---
// Las órdenes se guardan en el navegador (localStorage), así no se
// pierden al recargar. La primera vez se cargan las de ejemplo.

const CLAVE_ALMACEN = "taller-ramirez-ordenes";

function cargarOrdenes() {
  try {
    const guardado = localStorage.getItem(CLAVE_ALMACEN);
    if (guardado) {
      return JSON.parse(guardado);
    }
  } catch (error) {
    console.warn("No se pudieron leer los datos guardados:", error);
  }
  return ordenesDeEjemplo.map(o => ({ ...o }));
}

function guardarOrdenes() {
  try {
    localStorage.setItem(CLAVE_ALMACEN, JSON.stringify(ordenes));
  } catch (error) {
    console.warn("No se pudieron guardar los datos:", error);
  }
}

let ordenes = cargarOrdenes();

// --- Utilidades ---

function formatearMonto(valor) {
  return "$" + valor.toLocaleString("es-CL");
}

function formatearFecha(iso) {
  const fecha = new Date(iso + "T00:00:00");
  return fecha.toLocaleDateString("es-CL", { day: "2-digit", month: "short" });
}

function mostrarAviso(texto) {
  const aviso = document.getElementById("aviso");
  aviso.textContent = texto;
  aviso.classList.add("visible");
  clearTimeout(mostrarAviso.timer);
  mostrarAviso.timer = setTimeout(() => aviso.classList.remove("visible"), 2200);
}

// --- Resumen de arriba ---

function dibujarResumen() {
  const abiertas = ordenes.filter(o => o.estado === "en-espera" || o.estado === "en-reparacion").length;
  const enReparacion = ordenes.filter(o => o.estado === "en-reparacion").length;
  const listas = ordenes.filter(o => o.estado === "listo").length;
  const facturado = ordenes
    .filter(o => o.estado === "entregado")
    .reduce((suma, o) => suma + o.monto, 0);

  document.getElementById("resumen").innerHTML = `
    <div class="tarjeta">
      <div class="tarjeta-etiqueta">Órdenes abiertas</div>
      <div class="tarjeta-valor">${abiertas}</div>
    </div>
    <div class="tarjeta">
      <div class="tarjeta-etiqueta">En reparación</div>
      <div class="tarjeta-valor">${enReparacion}</div>
    </div>
    <div class="tarjeta">
      <div class="tarjeta-etiqueta">Listas para entregar</div>
      <div class="tarjeta-valor">${listas}</div>
    </div>
    <div class="tarjeta">
      <div class="tarjeta-etiqueta">Facturado este mes</div>
      <div class="tarjeta-valor">${formatearMonto(facturado)}</div>
    </div>
  `;
}

// --- Filtros ---

function dibujarFiltros() {
  const opciones = [
    { clave: "todas", texto: "Todas" },
    { clave: "en-espera", texto: "En espera" },
    { clave: "en-reparacion", texto: "En reparación" },
    { clave: "listo", texto: "Listo" },
    { clave: "entregado", texto: "Entregado" }
  ];

  const contenedor = document.getElementById("filtros");
  contenedor.innerHTML = "";

  opciones.forEach(op => {
    const boton = document.createElement("button");
    boton.className = "filtro" + (estadoActual === op.clave ? " activo" : "");
    boton.textContent = op.texto;
    boton.onclick = () => {
      estadoActual = op.clave;
      dibujarFiltros();
      dibujarTabla();
    };
    contenedor.appendChild(boton);
  });
}

// --- Tabla ---

function dibujarTabla() {
  const lista = estadoActual === "todas"
    ? ordenes
    : ordenes.filter(o => o.estado === estadoActual);

  const filas = lista.map(o => `
    <div class="tabla-fila">
      <span class="patente">${o.patente}</span>
      <span class="cliente">${o.cliente}</span>
      <span class="vehiculo">${o.vehiculo}</span>
      <span class="servicio">${o.servicio}</span>
      <span><span class="estado estado-${o.estado}">${ESTADOS[o.estado]}</span></span>
      <span class="monto">${formatearMonto(o.monto)}</span>
      <span class="ingreso">${formatearFecha(o.ingreso)}</span>
    </div>
  `).join("");

  const vacio = `<div class="tabla-fila" style="grid-template-columns: 1fr; color: #667085; padding: 32px 20px;">No hay órdenes en este estado.</div>`;

  document.getElementById("tabla").innerHTML = `
    <div class="tabla-fila tabla-cabecera">
      <span>Patente</span>
      <span>Cliente</span>
      <span>Vehículo</span>
      <span>Servicio</span>
      <span>Estado</span>
      <span style="text-align:right">Monto</span>
      <span style="text-align:right">Ingreso</span>
    </div>
    ${lista.length > 0 ? filas : vacio}
  `;
}

// --- Formulario de nueva orden ---

const dialogo = document.getElementById("dialogo-nueva");
const formulario = document.getElementById("form-nueva");

function fechaHoyISO() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

function actualizarPantalla() {
  dibujarResumen();
  dibujarFiltros();
  dibujarTabla();
}

document.getElementById("btn-nueva").onclick = () => {
  formulario.reset();
  dialogo.showModal();
  document.getElementById("campo-patente").focus();
};

document.getElementById("btn-cancelar").onclick = () => {
  dialogo.close();
};

document.getElementById("campo-patente").addEventListener("input", (evento) => {
  evento.target.value = evento.target.value.toUpperCase();
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const datos = new FormData(formulario);
  const nueva = {
    id: Math.max(0, ...ordenes.map(o => o.id)) + 1,
    patente: datos.get("patente").trim().toUpperCase(),
    cliente: datos.get("cliente").trim(),
    vehiculo: datos.get("vehiculo").trim() || "Sin especificar",
    servicio: datos.get("servicio").trim() || "Sin especificar",
    estado: datos.get("estado"),
    monto: Number(datos.get("monto")) || 0,
    ingreso: fechaHoyISO()
  };

  ordenes.unshift(nueva);
  guardarOrdenes();
  estadoActual = "todas";
  dialogo.close();
  actualizarPantalla();
  mostrarAviso(`Orden creada: ${nueva.patente}`);
});

document.getElementById("btn-reiniciar").onclick = () => {
  if (!confirm("¿Borrar las órdenes creadas y volver a las de ejemplo?")) return;
  localStorage.removeItem(CLAVE_ALMACEN);
  ordenes = cargarOrdenes();
  estadoActual = "todas";
  actualizarPantalla();
  mostrarAviso("Datos restablecidos");
};

// --- Arranque ---

dibujarResumen();
dibujarFiltros();
dibujarTabla();
