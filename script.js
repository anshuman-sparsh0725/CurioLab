// ===============================
// Online Courses Website Script
// ===============================

// --------- Course Data ---------
const courses = [
    {
        id: 1,
        name: "Dive into Agentic AI",
        description: "An in-depth exploration of agentic artificial intelligence systems and their applications.",
        imageSrc: "Agentic Ai.jpg",
        googleFormLink: "https://forms.google.com/your-form-link1"
    },
    {
        id: 2,
        name: "AI for Content Creation & Influencers",
        description: "Learn how to leverage AI for creating engaging content across platforms like Instagram, YouTube, and more.",
        imageSrc: "AI for content creation.jpg",
        googleFormLink: "https://forms.google.com/your-form-link2"
    },
    {
        id: 3,
        name: "AI for Business and Entrepreneurship",
        description: "Discover how AI is revolutionizing business models and creating new entrepreneurial opportunities.",
        imageSrc: "AI for business.jpg",
        googleFormLink: "https://forms.google.com/your-form-link3"
    },
    {
        id: 4,
        name: "Smart Kid AI Workshop",
        description: "A fun, hands-on workshop where kids learn to create their own art, games, and stories using Artificial Intelligence.",
        imageSrc: "Smart Kid AI Workshop.jpg",
        googleFormLink: "https://forms.google.com/your-form-link4"
    },
    {
        id: 5,
        name: "Mobile App Development",
        description: "Build Android and iOS apps using modern frameworks and tools.",
        imageSrc: "course-image-5.jpg",
        googleFormLink: "https://forms.google.com/your-form-link5"
    },
    {
        id: 6,
        name: "Cloud Computing & DevOps",
        description: "Deploy, scale, and manage applications in the cloud with DevOps best practices.",
        imageSrc: "course-image-6.jpg",
        googleFormLink: "https://forms.google.com/your-form-link6"
    },
    {
        id: 7,
        name: "Cybersecurity Fundamentals",
        description: "Protect systems and data with hands-on cybersecurity training.",
        imageSrc: "course-image-7.jpg",
        googleFormLink: "https://forms.google.com/your-form-link7"
    },
    {
        id: 8,
        name: "Business Analytics",
        description: "Make data-driven decisions with business analytics and visualization tools.",
        imageSrc: "course-image-8.jpg",
        googleFormLink: "https://forms.google.com/your-form-link8"
    },
    {
        id: 9,
        name: "AI for Everyone",
        description: "Understand the basics of artificial intelligence and its real-world applications.",
        imageSrc: "course-image-9.jpg",
        googleFormLink: "https://forms.google.com/your-form-link9"
    },
    {
        id: 10,
        name: "Project Management Mastery",
        description: "Lead successful projects with agile, scrum, and traditional PM skills.",
        imageSrc: "course-image-10.jpg",
        googleFormLink: "https://forms.google.com/your-form-link10"
    }
];

// --------- Favorites System ---------
const FAVORITES_KEY = 'favoriteCourseIds';
let favoriteCourseIds = [];

function loadFavorites() {
    const stored = localStorage.getItem(FAVORITES_KEY);
    favoriteCourseIds = stored ? JSON.parse(stored) : [];
}
function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteCourseIds));
}

// --------- Render Functions ---------
function renderCourseCard(course, isFavorite = false, showHeart = false, minimal = false) {
    if (minimal) {
        return `
        <div class="course-card minimal-card" data-id="${course.id}">
            <img src="${course.imageSrc}" alt="${course.name}">
            <h3>${course.name}</h3>
        </div>
        `;
    }
    return `
    <div class="course-card" data-id="${course.id}">
        <img src="${course.imageSrc}" alt="${course.name}">
        <h3>${course.name}</h3>
        <p>${course.description}</p>
        <a href="${course.googleFormLink}" class="enroll-btn" target="_blank" rel="noopener">Enroll</a>
        ${showHeart ? `<i class="fa-solid fa-heart heart-icon${isFavorite ? ' favorited' : ''}"></i>` : ''}
    </div>
    `;
}

// --------- Top Courses Infinite Slider ---------
const slider = document.getElementById('top-courses-slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
// Ensure the first four courses are the ones with the provided images
const topCourses = [
    courses.find(c => c.imageSrc === 'Agentic Ai.jpg'),
    courses.find(c => c.imageSrc === 'AI for content creation.jpg'),
    courses.find(c => c.imageSrc === 'AI for business.jpg'),
    courses.find(c => c.imageSrc !== 'Agentic Ai.jpg' && c.imageSrc !== 'AI for content creation.jpg' && c.imageSrc !== 'AI for business.jpg' && c.imageSrc !== undefined),
    courses[4],
    courses[5]
].filter(Boolean);
const visibleCards = 3;
const slideStep = 3;
let currentIndex = 0; // 0: show 1-3, 1: show 4-6
let cardWidth = 0;
let isTransitioning = false;

function renderTopCoursesSlider() {
    slider.innerHTML = '';
    for (let i = 0; i < topCourses.length; i++) {
        const card = document.createElement('div');
        card.innerHTML = renderCourseCard(topCourses[i], false, false, true);
        slider.appendChild(card.firstElementChild);
    }
    setTimeout(() => {
        const card = slider.querySelector('.course-card');
        if (card) {
            cardWidth = card.offsetWidth + parseInt(getComputedStyle(slider).gap || 0);
            setSliderPosition();
        }
    }, 0);
}
function setSliderPosition(animate = true) {
    if (!animate) slider.style.transition = 'none';
    else slider.style.transition = '';
    slider.style.transform = `translateX(-${currentIndex * cardWidth * slideStep}px)`;
    if (!animate) {
        void slider.offsetWidth;
        slider.style.transition = '';
    }
}
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        if (currentIndex === 0) {
            currentIndex = 1;
        } else {
            currentIndex = 0;
        }
        setSliderPosition(true);
        setTimeout(() => { isTransitioning = false; }, 500);
    });
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        if (currentIndex === 0) {
            currentIndex = 1;
        } else {
            currentIndex = 0;
        }
        setSliderPosition(true);
        setTimeout(() => { isTransitioning = false; }, 500);
    });
}
// Drag and Touch functionality for Top Courses slider
let isDown = false;
let startX;
let scrollLeft;
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('dragging');
});
slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('dragging');
});
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX);
    slider.scrollLeft = scrollLeft - walk;
});
slider.addEventListener('touchstart', (e) => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener('touchend', () => {
    isDown = false;
    slider.classList.remove('dragging');
});
slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX);
    slider.scrollLeft = scrollLeft - walk;
});

// --------- All Courses Grid ---------
const allCoursesSection = document.getElementById('all-courses-section');
function renderAllCoursesGrid() {
    allCoursesSection.innerHTML = courses.map(course =>
        renderCourseCard(course, favoriteCourseIds.includes(course.id), true)
    ).join('');
}

// --------- Explore All Courses Button ---------
const exploreBtn = document.getElementById('exploreBtn');
exploreBtn.addEventListener('click', () => {
    allCoursesSection.classList.toggle('hidden');
    if (allCoursesSection.classList.contains('hidden')) {
        exploreBtn.textContent = 'Explore All Courses';
    } else {
        exploreBtn.textContent = 'Hide Courses';
    }
});

// --------- Heart Icon (Favorites) Logic ---------
allCoursesSection.addEventListener('click', (e) => {
    const heart = e.target.closest('.heart-icon');
    if (!heart) return;
    const card = heart.closest('.course-card');
    const courseId = Number(card.dataset.id);
    const idx = favoriteCourseIds.indexOf(courseId);
    if (idx > -1) {
        favoriteCourseIds.splice(idx, 1);
        heart.classList.remove('favorited');
    } else {
        favoriteCourseIds.push(courseId);
        heart.classList.add('favorited');
    }
    saveFavorites();
});

// --------- Search Bar Functionality ---------
const courseSearchBar = document.getElementById('course-search-bar');
if (courseSearchBar) {
    courseSearchBar.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (allCoursesSection.classList.contains('hidden')) {
            exploreBtn.click();
        }
        const cards = allCoursesSection.querySelectorAll('.course-card');
        cards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            if (title.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// --------- Favorites Modal Logic ---------
const favCoursesBtn = document.getElementById('favCoursesBtn');
const favoritesModal = document.getElementById('favoritesModal');
const closeBtn = favoritesModal.querySelector('.close-btn');
const favoriteCoursesContainer = document.getElementById('favorite-courses-container');

favCoursesBtn.addEventListener('click', () => {
    renderFavoritesModal();
    favoritesModal.classList.remove('hidden');
});
closeBtn.addEventListener('click', () => {
    favoritesModal.classList.add('hidden');
});
window.addEventListener('click', (e) => {
    if (e.target === favoritesModal) {
        favoritesModal.classList.add('hidden');
    }
});
function renderFavoritesModal() {
    favoriteCoursesContainer.innerHTML = '';
    if (favoriteCourseIds.length === 0) {
        favoriteCoursesContainer.innerHTML = '<p style="color:var(--text-secondary);margin:32px auto;">No favorite courses yet.</p>';
        return;
    }
    const favCourses = courses.filter(c => favoriteCourseIds.includes(c.id));
    favoriteCoursesContainer.innerHTML = favCourses.map(course =>
        renderCourseCard(course, true, false)
    ).join('');
}

// --------- Initialization ---------
function init() {
    loadFavorites();
    renderTopCoursesSlider();
    renderAllCoursesGrid();
    // If user already opened all courses, keep button text in sync
    if (!allCoursesSection.classList.contains('hidden')) {
        exploreBtn.textContent = 'Hide Courses';
    }
}
window.addEventListener('DOMContentLoaded', init); 