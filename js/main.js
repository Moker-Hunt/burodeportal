// Основной JavaScript файл для burodeportal.com

// Функция для скрытия/показа навигационной панели при прокрутке
(function() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Прокрутка вниз - скрываем навигацию
            navbar.classList.add('hidden');
        } else {
            // Прокрутка вверх - показываем навигацию
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
})();

// Мобильное меню
(function() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
        
        // Закрываем меню при клике на пункт меню
        const navbarLinks = document.querySelectorAll('.navbar-link');
        navbarLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
        
        // Закрываем меню при клике вне меню
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navbarMenu.contains(event.target);
            const isClickOnToggle = navbarToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navbarMenu.classList.contains('active')) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        });
    }
})();

// Уведомление о куках
(function() {
    const cookieNotice = document.querySelector('.cookie-notice');
    const acceptButton = document.querySelector('.cookie-accept');
    
    // Проверяем, было ли уже принято соглашение о куках
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted && cookieNotice) {
        // Показываем уведомление без блюринга контента
        cookieNotice.classList.remove('hidden');
        
        // Обработчик для кнопки принятия
        if (acceptButton) {
            acceptButton.addEventListener('click', function() {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieNotice.classList.add('hidden');
            });
        }
    }
})();

// Плавная прокрутка для якорных ссылок
(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

// Функция для отложенной загрузки изображений
(function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // Fallback для браузеров без поддержки IntersectionObserver
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        });
    }
})();

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Здесь можно добавить дополнительные функции, которые должны выполняться при загрузке страницы
    console.log('BuroDePortal - Página cargada correctamente');
});
