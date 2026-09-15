document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('clienteForm');
    const resultadoDiv = document.getElementById('resultado');
    const historialLista = document.getElementById('historialLista');

    async function cargarHistorial() {
        try {
            const response = await fetch('/clientes');
            const clientes = await response.json();
            historialLista.innerHTML = '';
            clientes.forEach(c => {
                const li = document.createElement('li');
                li.textContent = `${c.nombre} (${c.edad} años) - ${c.ciudad}`;
                historialLista.appendChild(li);
            });
        } catch (error) {
            console.error('Error al cargar el historial:', error);
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const edad = document.getElementById('edad').value;
        const ciudad = document.getElementById('ciudad').value;

        try {
            const response = await fetch('/clientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, edad, ciudad })
            });

            const data = await response.json();

            if (response.ok) {
                resultadoDiv.textContent = data.mensaje;
                resultadoDiv.classList.remove('oculto');
                form.reset();
                cargarHistorial();
            } else {
                alert(data.error || 'Ocurrió un error');
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            alert('No se pudo conectar con el servidor.');
        }
    });

    cargarHistorial();
});