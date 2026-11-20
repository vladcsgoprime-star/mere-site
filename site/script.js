let currentVarieties = [];
let currentIndex = 0;

function initCatalog(varietiesData) {
    currentVarieties = varietiesData;
    const grid = document.getElementById('varietiesGrid');
    if (!grid) return;

    grid.innerHTML = currentVarieties.map((item, index) => `
        <article class="variety-card" onclick="openVariety(${index})">
            <div class="variety-thumb">
                <img src="${item.photos[0]}" alt="${item.name}" loading="lazy">
            </div>
            <div class="variety-info">
                <span class="variety-tag">${item.season}</span>
                <h3>${item.name}</h3>
                <p>${item.shortDesc}</p>
            </div>
        </article>
    `).join('');
}

function openVariety(index) {
    currentIndex = index;
    const item = currentVarieties[currentIndex];
    const modal = document.getElementById('varietyModal');

    document.getElementById('modalTitle').textContent = item.name;
    document.getElementById('modalSeason').textContent = item.season;
    document.getElementById('modalTaste').textContent = item.taste;
    document.getElementById('modalDescription').textContent = item.fullDesc;

    const mainImg = document.getElementById('modalMainImg');
    mainImg.src = item.photos[0];
    mainImg.alt = item.name;

    const thumbsContainer = document.getElementById('modalThumbs');
    thumbsContainer.innerHTML = item.photos.map((photoUrl, photoIdx) => `
        <img 
            src="${photoUrl}" 
            alt="${item.name} фото ${photoIdx + 1}" 
            class="${photoIdx === 0 ? 'active' : ''}"
            onclick="selectPhoto('${photoUrl}', this)"
        >
    `).join('');

    const nextIndex = (currentIndex + 1) % currentVarieties.length;
    document.getElementById('nextBtn').textContent = `Следующий: ${currentVarieties[nextIndex].name} →`;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function selectPhoto(url, thumbElement) {
    document.getElementById('modalMainImg').src = url;
    document.querySelectorAll('#modalThumbs img').forEach(img => img.classList.remove('active'));
    thumbElement.classList.add('active');
}

function nextVariety() {
    const nextIndex = (currentIndex + 1) % currentVarieties.length;
    openVariety(nextIndex);
}

function prevVariety() {
    const prevIndex = (currentIndex - 1 + currentVarieties.length) % currentVarieties.length;
    openVariety(prevIndex);
}

function closeVariety() {
    const modal = document.getElementById('varietyModal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
    const modal = document.getElementById('varietyModal');
    if (e.target === modal) closeVariety();
});

document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('varietyModal');
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeVariety();
    if (e.key === 'ArrowRight') nextVariety();
    if (e.key === 'ArrowLeft') prevVariety();
});