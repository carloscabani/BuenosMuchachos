// Espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function() {
    // Aplica la clase de entrada 'fade-in' al cargar la página
    document.body.classList.add("fade-in");

    // Selecciona todos los enlaces
    document.querySelectorAll("a").forEach(anchor => {
        anchor.addEventListener("click", function(event) {
            // Evita el comportamiento predeterminado del enlace
            event.preventDefault();
            const link = this.href;

            // Agrega la clase 'fade-out' al cuerpo para iniciar la animación de salida
            document.body.classList.add("fade-out");

            // Espera 500 ms para permitir que la animación se complete, luego redirige
            setTimeout(() => {
                window.location.href = link;
            }, 500); // Ajusta el tiempo para que coincida con la duración de la animación en CSS
        });
    });
});
