// ========================================
// MAIN JAVASCRIPT - ARC.3
// ========================================


// ========================================
// SUPABASE
// ========================================

const SUPABASE_URL = 'AQUI_TU_URL';
const SUPABASE_ANON_KEY = 'AQUI_TU_ANON_KEY';

let supabaseClient = null;

if (
    window.supabase &&
    SUPABASE_URL !== 'AQUI_TU_URL' &&
    SUPABASE_ANON_KEY !== 'AQUI_TU_ANON_KEY'
) {
    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
}


// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initContactForm();
    initParticles();

    /*
     * Se mantiene la estructura de la web.
     * No ejecutamos el antiguo typewriter destructivo
     * porque eliminaba los spans del título y podía
     * quitar el efecto neon de "Ideas Digitales".
     */

    initReviews();

});


// ========================================
// MENÚ MÓVIL
// ========================================

function initMobileMenu() {

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function(event) {

        event.stopPropagation();

        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        const spans = hamburger.querySelectorAll('span');

        if (hamburger.classList.contains('active')) {

            spans[0].style.transform =
                'rotate(45deg) translate(5px, 5px)';

            spans[1].style.opacity = '0';

            spans[2].style.transform =
                'rotate(-45deg) translate(7px, -6px)';

        } else {

            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';

        }

    });


    navLinks.forEach(link => {

        link.addEventListener('click', function() {

            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            const spans = hamburger.querySelectorAll('span');

            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';

        });

    });


    document.addEventListener('click', function(event) {

        if (
            !hamburger.contains(event.target) &&
            !navMenu.contains(event.target)
        ) {

            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            const spans = hamburger.querySelectorAll('span');

            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';

        }

    });

}


// ========================================
// SCROLL SUAVE
// ========================================

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener('click', function(e) {

            e.preventDefault();

            const targetId = this.getAttribute('href');

            const targetElement =
                document.querySelector(targetId);

            if (targetElement) {

                const headerOffset = 80;

                const elementPosition =
                    targetElement.getBoundingClientRect().top;

                const offsetPosition =
                    elementPosition +
                    window.pageYOffset -
                    headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

            }

        });

    });

}


// ========================================
// ANIMACIONES AL SCROLL
// ========================================

function initScrollAnimations() {

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };


    const observer = new IntersectionObserver(
        function(entries) {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('animate');

                    observer.unobserve(entry.target);

                }

            });

        },
        observerOptions
    );


    const animatedElements =
        document.querySelectorAll(
            '.service-card, .founder-card, .contact-method, .section-header, .about-text, .location-info, .review-card, .review-form-container'
        );


    animatedElements.forEach(element => {

        element.style.opacity = '0';

        element.style.transform =
            'translateY(30px)';

        element.style.transition =
            'opacity 0.6s ease, transform 0.6s ease';

        observer.observe(element);

    });


    const style = document.createElement('style');

    style.textContent = `

        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

    `;

    document.head.appendChild(style);

}


// ========================================
// HEADER SCROLL
// ========================================

function initHeaderScroll() {

    const header =
        document.querySelector('.header');

    if (!header) return;


    window.addEventListener('scroll', function() {

        const currentScroll =
            window.pageYOffset;


        if (currentScroll > 50) {

            header.style.background =
                'rgba(0, 0, 0, 0.98)';

            header.style.boxShadow =
                '0 2px 20px rgba(0, 212, 255, 0.1)';

        } else {

            header.style.background =
                'rgba(0, 0, 0, 0.95)';

            header.style.boxShadow =
                'none';

        }

    });

}


// ========================================
// FORMULARIO DE CONTACTO
// ========================================

function initContactForm() {

    const contactForm =
        document.getElementById('contactForm');

    if (!contactForm) return;


    contactForm.addEventListener(
        'submit',
        function(e) {

            e.preventDefault();


            const formData =
                new FormData(contactForm);

            const form_data =
                Object.fromEntries(formData);


            if (
                !form_data.name ||
                !form_data.email ||
                !form_data.message
            ) {

                showNotification(
                    'Por favor, completa todos los campos requeridos.',
                    'error'
                );

                return;

            }


            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailRegex.test(form_data.email)
            ) {

                showNotification(
                    'Por favor, introduce un email válido.',
                    'error'
                );

                return;

            }


            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            const originalText =
                submitButton.textContent;


            submitButton.textContent =
                'Enviando...';

            submitButton.disabled = true;


            setTimeout(() => {

                showNotification(
                    '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.',
                    'success'
                );


                contactForm.reset();

                submitButton.textContent =
                    originalText;

                submitButton.disabled =
                    false;

            }, 1500);

        }
    );

}


// ========================================
// NOTIFICACIONES
// ========================================

function showNotification(
    message,
    type = 'info'
) {

    const existingNotification =
        document.querySelector('.notification');


    if (existingNotification) {
        existingNotification.remove();
    }


    const notification =
        document.createElement('div');


    notification.className =
        `notification notification-${type}`;


    notification.innerHTML = `

        <div class="notification-content">

            <i class="fas ${
                type === 'success'
                    ? 'fa-check-circle'
                    : type === 'error'
                        ? 'fa-exclamation-circle'
                        : 'fa-info-circle'
            }"></i>

            <span>${escapeHTML(message)}</span>

        </div>

    `;


    const style =
        document.createElement('style');


    style.textContent = `

        .notification {

            position: fixed;
            top: 100px;
            right: 20px;

            background: rgba(0, 0, 0, 0.95);

            border: 1px solid ${
                type === 'success'
                    ? '#00ff00'
                    : type === 'error'
                        ? '#ff0000'
                        : '#00d4ff'
            };

            border-radius: 8px;

            padding: 1rem 1.5rem;

            z-index: 10000;

            animation: slideIn 0.3s ease;

            box-shadow:
                0 4px 20px rgba(0, 0, 0, 0.5);

            max-width: 350px;
        }


        .notification-content {

            display: flex;
            align-items: center;
            gap: 10px;

            color: white;
            font-size: 0.9rem;

        }


        .notification-success {

            border-color: #00ff00;

            box-shadow:
                0 0 10px rgba(0, 255, 0, 0.3);

        }


        .notification-error {

            border-color: #ff0000;

            box-shadow:
                0 0 10px rgba(255, 0, 0, 0.3);

        }


        .notification-info {

            border-color: #00d4ff;

            box-shadow:
                0 0 10px rgba(0, 212, 255, 0.3);

        }


        @keyframes slideIn {

            from {
                transform: translateX(100%);
                opacity: 0;
            }

            to {
                transform: translateX(0);
                opacity: 1;
            }

        }


        @keyframes slideOut {

            from {
                transform: translateX(0);
                opacity: 1;
            }

            to {
                transform: translateX(100%);
                opacity: 0;
            }

        }

    `;


    document.head.appendChild(style);

    document.body.appendChild(notification);


    setTimeout(() => {

        notification.style.animation =
            'slideOut 0.3s ease';


        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 4000);

}


// ========================================
// PARTÍCULAS DEL HERO
// ========================================

function initParticles() {

    const particles =
        document.querySelectorAll(
            '.hero-particle'
        );


    particles.forEach((particle) => {

        particle.style.left =
            Math.random() * 100 + '%';

        particle.style.top =
            Math.random() * 100 + '%';


        const size =
            Math.random() * 4 + 2;


        particle.style.width =
            size + 'px';

        particle.style.height =
            size + 'px';


        particle.style.opacity =
            Math.random() * 0.5 + 0.3;


        const duration =
            Math.random() * 10 + 10;


        const delay =
            Math.random() * 5;


        particle.style.animationDuration =
            duration + 's';

        particle.style.animationDelay =
            delay + 's';

    });

}


// ========================================
// RESEÑAS - INICIALIZACIÓN
// ========================================

function initReviews() {

    const reviewForm =
        document.getElementById('reviewForm');

    const starSelector =
        document.getElementById('starSelector');

    const ratingInput =
        document.getElementById('reviewRating');


    if (!reviewForm) return;


    if (!supabaseClient) {

        const loading =
            document.getElementById(
                'reviewsLoading'
            );

        if (loading) {

            loading.innerHTML = `
                <i class="fas fa-database"></i>
                Configura Supabase para activar las reseñas.
            `;

        }

        return;

    }


    // Selector de estrellas

    if (starSelector) {

        const stars =
            starSelector.querySelectorAll(
                '.star-button'
            );


        stars.forEach(star => {

            star.addEventListener(
                'click',
                function() {

                    const rating =
                        parseInt(
                            this.dataset.rating
                        );


                    ratingInput.value =
                        rating;


                    stars.forEach(
                        currentStar => {

                            const currentRating =
                                parseInt(
                                    currentStar.dataset.rating
                                );


                            const icon =
                                currentStar.querySelector(
                                    'i'
                                );


                            if (
                                currentRating <= rating
                            ) {

                                currentStar.classList.add(
                                    'active'
                                );

                                icon.className =
                                    'fas fa-star';

                            } else {

                                currentStar.classList.remove(
                                    'active'
                                );

                                icon.className =
                                    'far fa-star';

                            }

                        }
                    );

                }
            );

        });

    }


    // Envío de reseña

    reviewForm.addEventListener(
        'submit',
        async function(e) {

            e.preventDefault();


            const name =
                document.getElementById(
                    'reviewName'
                ).value.trim();


            const rating =
                parseInt(
                    document.getElementById(
                        'reviewRating'
                    ).value
                );


            const message =
                document.getElementById(
                    'reviewMessage'
                ).value.trim();


            if (
                !name ||
                name.length < 2
            ) {

                showNotification(
                    'Introduce un nombre válido.',
                    'error'
                );

                return;

            }


            if (
                !rating ||
                rating < 1 ||
                rating > 5
            ) {

                showNotification(
                    'Selecciona una valoración de 1 a 5 estrellas.',
                    'error'
                );

                return;

            }


            if (
                !message ||
                message.length < 5
            ) {

                showNotification(
                    'Escribe una opinión de al menos 5 caracteres.',
                    'error'
                );

                return;

            }


            if (message.length > 500) {

                showNotification(
                    'La reseña no puede superar los 500 caracteres.',
                    'error'
                );

                return;

            }


            const submitButton =
                reviewForm.querySelector(
                    'button[type="submit"]'
                );


            const originalText =
                submitButton.textContent;


            submitButton.disabled =
                true;

            submitButton.textContent =
                'Publicando...';


            try {

                const {
                    error
                } = await supabaseClient
                    .from('reviews')
                    .insert([
                        {
                            name: name,
                            rating: rating,
                            message: message
                        }
                    ]);


                if (error) {

                    console.error(
                        'Error Supabase:',
                        error
                    );

                    throw error;

                }


                showNotification(
                    '¡Tu reseña se ha publicado correctamente!',
                    'success'
                );


                reviewForm.reset();

                ratingInput.value =
                    '0';


                starSelector
                    .querySelectorAll(
                        '.star-button'
                    )
                    .forEach(star => {

                        star.classList.remove(
                            'active'
                        );

                        const icon =
                            star.querySelector(
                                'i'
                            );

                        icon.className =
                            'far fa-star';

                    });


                await loadReviews();


            } catch (error) {

                console.error(error);


                showNotification(
                    'No se pudo publicar la reseña. Comprueba la configuración de Supabase.',
                    'error'
                );


            } finally {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    originalText;

            }

        }
    );


    loadReviews();

}


// ========================================
// CARGAR RESEÑAS
// ========================================

async function loadReviews() {

    const reviewsList =
        document.getElementById(
            'reviewsList'
        );

    const reviewsLoading =
        document.getElementById(
            'reviewsLoading'
        );

    const reviewsEmpty =
        document.getElementById(
            'reviewsEmpty'
        );


    if (
        !reviewsList ||
        !supabaseClient
    ) return;


    if (reviewsLoading) {

        reviewsLoading.style.display =
            'block';

    }


    try {

        const {
            data,
            error
        } = await supabaseClient

            .from('reviews')

            .select(
                'id, name, rating, message, created_at'
            )

            .order(
                'created_at',
                {
                    ascending: false
                }
            );


        if (error) {

            throw error;

        }


        reviewsList.innerHTML =
            '';


        if (reviewsLoading) {

            reviewsLoading.style.display =
                'none';

        }


        if (
            !data ||
            data.length === 0
        ) {

            if (reviewsEmpty) {

                reviewsEmpty.style.display =
                    'block';

            }

            updateRatingSummary([]);

            return;

        }


        if (reviewsEmpty) {

            reviewsEmpty.style.display =
                'none';

        }


        data.forEach(review => {

            reviewsList.appendChild(
                createReviewCard(review)
            );

        });


        updateRatingSummary(data);


    } catch (error) {

        console.error(
            'Error cargando reseñas:',
            error
        );


        if (reviewsLoading) {

            reviewsLoading.innerHTML = `

                <i class="fas fa-exclamation-triangle"></i>

                No se pudieron cargar las reseñas.

            `;

        }

    }

}


// ========================================
// CREAR TARJETA DE RESEÑA
// ========================================

function createReviewCard(review) {

    const card =
        document.createElement('article');


    card.className =
        'review-card';


    const safeName =
        escapeHTML(review.name);


    const safeMessage =
        escapeHTML(review.message);


    const date =
        formatReviewDate(
            review.created_at
        );


    let stars = '';


    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        if (
            i <= review.rating
        ) {

            stars +=
                '<i class="fas fa-star"></i>';

        } else {

            stars +=
                '<i class="far fa-star"></i>';

        }

    }


    card.innerHTML = `

        <div class="review-card-header">

            <div class="review-author">

                <div class="review-avatar">

                    <i class="fas fa-user"></i>

                </div>

                <div>

                    <div class="review-author-name">
                        ${safeName}
                    </div>

                    <div class="review-date">
                        ${date}
                    </div>

                </div>

            </div>


            <div
                class="review-stars"
                aria-label="${review.rating} de 5 estrellas"
            >

                ${stars}

            </div>

        </div>


        <p class="review-message">
            ${safeMessage}
        </p>

    `;


    return card;

}


// ========================================
// RESUMEN DE VALORACIONES
// ========================================

function updateRatingSummary(
    reviews
) {

    const averageElement =
        document.getElementById(
            'averageRating'
        );

    const starsElement =
        document.getElementById(
            'averageStars'
        );

    const countElement =
        document.getElementById(
            'reviewsCount'
        );


    const count =
        reviews.length;


    let average = 0;


    if (count > 0) {

        const total =
            reviews.reduce(
                (
                    sum,
                    review
                ) =>
                    sum +
                    Number(review.rating),
                0
            );


        average =
            total / count;

    }


    if (averageElement) {

        averageElement.textContent =
            average.toFixed(1);

    }


    if (countElement) {

        countElement.textContent =
            count === 1
                ? '1 reseña'
                : `${count} reseñas`;

    }


    if (starsElement) {

        starsElement.innerHTML =
            '';


        const rounded =
            Math.round(average);


        for (
            let i = 1;
            i <= 5;
            i++
        ) {

            const icon =
                document.createElement('i');


            if (
                i <= rounded
            ) {

                icon.className =
                    'fas fa-star';

            } else {

                icon.className =
                    'far fa-star';

            }


            starsElement.appendChild(
                icon
            );

        }

    }

}


// ========================================
// FECHA DE RESEÑA
// ========================================

function formatReviewDate(
    dateString
) {

    if (!dateString) {
        return '';
    }


    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        'es-ES',
        {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
    );

}


// ========================================
// SEGURIDAD HTML
// ========================================

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            '&amp;'
        )
        .replace(
            /</g,
            '&lt;'
        )
        .replace(
            />/g,
            '&gt;'
        )
        .replace(
            /"/g,
            '&quot;'
        )
        .replace(
            /'/g,
            '&#039;'
        );

}


// ========================================
// PRELOAD DE IMÁGENES
// ========================================

function preloadImages() {

    const images = [
        'img/logo.png'
    ];


    images.forEach(src => {

        const img =
            new Image();

        img.src = src;

    });

}


// ========================================
// LAZY LOADING
// ========================================

function initLazyLoading() {

    const images =
        document.querySelectorAll(
            'img[data-src]'
        );


    const imageObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const img =
                            entry.target;


                        img.src =
                            img.dataset.src;


                        img.removeAttribute(
                            'data-src'
                        );


                        observer.unobserve(
                            img
                        );

                    }

                });

            }
        );


    images.forEach(img =>
        imageObserver.observe(img)
    );

}


// ========================================
// BACK TO TOP
// ========================================

function initBackToTop() {

    const backToTopButton =
        document.createElement(
            'button'
        );


    backToTopButton.className =
        'back-to-top';


    backToTopButton.innerHTML =
        '<i class="fas fa-arrow-up"></i>';


    backToTopButton.setAttribute(
        'aria-label',
        'Volver arriba'
    );


    const style =
        document.createElement(
            'style'
        );


    style.textContent = `

        .back-to-top {

            position: fixed;

            bottom: 30px;
            right: 30px;

            width: 50px;
            height: 50px;

            background:
                linear-gradient(
                    135deg,
                    #00d4ff,
                    #0099cc
                );

            border: none;

            border-radius: 50%;

            color: #000;

            font-size: 1.2rem;

            cursor: pointer;

            opacity: 0;

            visibility: hidden;

            transition:
                all 0.3s ease;

            z-index: 999;

            box-shadow:
                0 0 20px
                rgba(0, 212, 255, 0.5);

        }


        .back-to-top.visible {

            opacity: 1;
            visibility: visible;

        }


        .back-to-top:hover {

            transform:
                translateY(-5px);

            box-shadow:
                0 0 30px
                rgba(0, 212, 255, 0.8);

        }

    `;


    document.head.appendChild(
        style
    );


    document.body.appendChild(
        backToTopButton
    );


    window.addEventListener(
        'scroll',
        () => {

            if (
                window.pageYOffset > 300
            ) {

                backToTopButton.classList.add(
                    'visible'
                );

            } else {

                backToTopButton.classList.remove(
                    'visible'
                );

            }

        }
    );


    backToTopButton.addEventListener(
        'click',
        () => {

            window.scrollTo({

                top: 0,

                behavior: 'smooth'

            });

        }
    );

}


// ========================================
// FUNCIONES ADICIONALES
// ========================================

document.addEventListener(
    'DOMContentLoaded',
    function() {

        preloadImages();

        initLazyLoading();

        initBackToTop();

    }
);


// ========================================
// THEME TOGGLE - FUTURO
// ========================================

function initThemeToggle() {

    const themeToggle =
        document.querySelector(
            '.theme-toggle'
        );


    if (themeToggle) {

        themeToggle.addEventListener(
            'click',
            function() {

                document.body.classList.toggle(
                    'light-theme'
                );


                localStorage.setItem(
                    'theme',
                    document.body.classList.contains(
                        'light-theme'
                    )
                        ? 'light'
                        : 'dark'
                );

            }
        );


        const savedTheme =
            localStorage.getItem(
                'theme'
            );


        if (
            savedTheme === 'light'
        ) {

            document.body.classList.add(
                'light-theme'
            );

        }

    }

}


// ========================================
// PERFORMANCE
// ========================================

function debounce(
    func,
    wait
) {

    let timeout;


    return function executedFunction(
        ...args
    ) {

        const later = () => {

            clearTimeout(
                timeout
            );

            func(...args);

        };


        clearTimeout(
            timeout
        );


        timeout =
            setTimeout(
                later,
                wait
            );

    };

}


function throttle(
    func,
    limit
) {

    let inThrottle;


    return function() {

        const args =
            arguments;

        const context =
            this;


        if (!inThrottle) {

            func.apply(
                context,
                args
            );


            inThrottle = true;


            setTimeout(
                () => {
                    inThrottle = false;
                },
                limit
            );

        }

    };

}}, 250));
