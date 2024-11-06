(function(){   //manejo de apertura y cierre de menu en disp moviles
    const openButton = document.querySelector('.nav__menu');
    const menu = document.querySelector('.nav__link');
    const closeMenu = document.querySelector('.nav__close');

    openButton.addEventListener('click', ()=>{
        menu.classList.add('nav__link--show');
    });

    closeMenu.addEventListener('click', ()=>{
        menu.classList.remove('nav__link--show');
    });

    // Seleccionar todos los enlaces de navegación que tengan href con un #
    document.querySelectorAll('.nav__links[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault(); // Previene el comportamiento predeterminado del enlace

            // Selecciona la sección objetivo
            const targetSection = document.querySelector(this.getAttribute('href'));

            // Desplazamiento suave hacia la sección con duración personalizada
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
})();

