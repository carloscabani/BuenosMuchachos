(function () {   
    // Manejo de apertura y cierre de menú en dispositivos móviles
    const openButton = document.querySelector('.nav__menu');
    const menu = document.querySelector('.nav__link');
    const closeMenu = document.querySelector('.nav__close');

    openButton.addEventListener('click', () => {
        menu.classList.add('nav__link--show');
    });

    closeMenu.addEventListener('click', () => {
        menu.classList.remove('nav__link--show');
    });

    // Manejo de desplazamiento suave para enlaces con hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el comportamiento predeterminado
            const targetId = this.getAttribute('href').slice(1); // Obtiene el ID del hash
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
            }

            // Cerrar el menú si está abierto (en caso de dispositivos móviles)
            if (menu.classList.contains('nav__link--show')) {
                menu.classList.remove('nav__link--show');
            }
        });
    });
})();

