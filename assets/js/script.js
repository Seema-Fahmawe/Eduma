$(document).ready(function () {
    $('.carousel_01').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                dots: true
            },
            600: {
                items: 2,
                nav: true,
                dots: false,
            },
            500: {
                items: 1,
                nav: false,
                dots: true,
            },
            1000: {
                items: 4,
                nav: true,
                dots: false,
            }
        }
    });

    $('.carousel_02').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: true,
        responsive: {
            0: {
                items: 1,
            },

            480: {
                items: 1,
            },
            768: {
                items: 3,
            }
        }
    });

    $('.carousel_03').owlCarousel({
        loop: true,
        dots: false,
        center: true,
        items: 5,
        onDragged: triggerNext,

    });

    $('.carousel_04').owlCarousel({
        loop: true,
        margin: 10,
        dots: false,
        items: 1,
        onDragged: triggerNext,
    })
});


let countDownDate = new Date('Dec 25,2023 15:00:00').getTime();
let countDown = setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;

    if (distance < 0) {
        clearInterval(countDown);
        document.querySelector('.count').innerHTML = 'Expired';
    }

}, 1000)

function triggerNext(event) {
    if (event.target.classList.contains('carousel_03')) {
        $('.carousel_04').trigger('next.owl.carousel');
    } else if (event.target.classList.contains('carousel_04')) {
        $('.carousel_03').trigger('next.owl.carousel');
    }
}


let registerClick = document.getElementById('registerClick');
let registerPage = document.getElementById('registerPage');
let overlayReg = document.getElementById('overlayReg');
registerClick.addEventListener('click', function () {
    registerPage.style.display = 'block';
    document.getElementById('body').style.overflow = 'hidden';
});
overlayReg.addEventListener('click', function () {
    registerPage.style.display = 'none';
    document.getElementById('body').style.overflow = 'scroll';
    document.getElementById('body').style.overflowX = 'hidden';
});



let loginClick = document.getElementById('loginClick');
let loginPage = document.getElementById('loginPage');
let overlayLogin = document.getElementById('overlayLogin');
loginClick.addEventListener('click', function () {
    loginPage.style.display = 'block';
    document.getElementById('body').style.overflow = 'hidden';
});
overlayLogin.addEventListener('click', function () {
    loginPage.style.display = 'none';
    document.getElementById('body').style.overflow = 'scroll';
    document.getElementById('body').style.overflowX = 'hidden';
});


let nav = document.querySelector('nav');
let image = document.getElementById('logo');
$(window).scroll(function () {
    $('nav').toggleClass('scrolled', $(this).scrollTop() > 100);
    $('.navbar li .nav-link').toggleClass('scrollLink', $(this).scrollTop() > 100);
});


let lastScroll = 0;
window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset;
    if (currentScroll == 0) {
        image.setAttribute('src', 'assets/images/logo-edu-white.png');
        image.classList.remove('widthImage');
    }
    if (currentScroll > lastScroll && !nav.classList.contains('scrollDown')) {
        nav.classList.remove('scrollUp');
        nav.classList.add('scrollDown');
    } if (currentScroll < lastScroll && nav.classList.contains('scrollDown')) {
        nav.classList.remove('scrollDown');
        nav.classList.add('scrollUp');
        image.setAttribute('src', 'assets/images/logo-edu_black.webp');
        image.classList.add('widthImage');
    }
    lastScroll = currentScroll;
});


let btnCart = document.querySelectorAll('.btnCart');
let cartList = document.getElementById('cartList')
let imgPath = '';
let courseTitle = '';
let coursePrice = '';

let course = {
    'imgPath': '',
    'title': '',
    'price': ''
}
let courses = [];

function addToCart() {
    btnCart.forEach((element) => {
        element.addEventListener('click', function (e) {
            if (JSON.parse(localStorage.getItem('courses') == null)) {
                courses = [];
            } else {
                const courses = JSON.parse(localStorage.getItem('courses'));
            }
            imgPath = e.target.previousElementSibling.src.slice(e.target.previousElementSibling.src.indexOf('assets'));
            courseTitle = e.target.parentElement.parentElement.childNodes[3].childNodes[4].nextElementSibling.textContent;
            coursePrice = e.target.parentElement.parentElement.childNodes[3].childNodes[8].nextElementSibling.childNodes[2].nextElementSibling.childNodes[1].nextElementSibling.textContent;
            course['imgPath'] = imgPath;
            course['title'] = courseTitle;
            course['price'] = coursePrice;
            courses.unshift(course);
            localStorage.setItem('courses', JSON.stringify(courses));
            Swal.fire('Course Added to your Cart!')
            displayCourses();
        })
    })
}

function deleteCourse(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        courses.splice(id, 1);
        localStorage.setItem('courses', JSON.stringify(courses));
        displayCourses();
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })

}

addToCart();

function displayCourses() {
    let result = '';
    if (JSON.parse(localStorage.getItem('courses') == null)) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    if (courses.length == 0) {
        result += `<h2 class="text-center pt-4 fs-6">No items added!</h2>`
    }
    courses.map((course, index) => {
        result += `<div class="row p-2 pt-3 align-items-center">
        <div class="col-3 p-0  ps-3 img">
            <img src="${course['imgPath']}" class="w-100">
        </div>
        <div class="col-6">
            <h3 class="fs-6">${course['title']}</h3>
        </div>
        <div class="col-3">
            <span class="fs-5">${course['price']}</span>
        </div>
    </div>
    <div class="d-flex justify-content-between mt-1">
         <button class="btn text-danger bg-transparent border-0" onclick="deleteCourse(${index})"><i
            class="fa-solid fa-trash fs-3 "></i></button>
          <button class="btn btn-warning mt-2 mb-2">Buy Now</button>
    </div>
    <hr>`
    })
    cartList.innerHTML = result;
}

let cartSection = document.getElementById('cartSection');
let cartLink = document.getElementById('cartLink');
let close = document.getElementById('close');

cartLink.addEventListener('click', function () {
    cartSection.style.display = 'block';
    document.getElementById('body').style.overflow = 'hidden';
})

close.addEventListener('click', function () {
    cartSection.style.display = 'none';
    document.getElementById('body').style.overflow = 'scroll';
    document.getElementById('body').style.overflowX = 'hidden';

});


$(document).ready(function () {
    $('.loading').fadeOut(3000)
});

$('.TOP').fadeOut()
$(window).scroll(function () {
    if ($(window).scrollTop() > $('#popularCourse').offset().top) {
        $('.TOP').fadeIn(1000)
    } else {
        $('.TOP').fadeOut(1000)
    }
})

$('.TOP').click(function () {
    $('html').animate({ 'scrollTop': 0 }, 1000)
})

