(function () {
    const gobletImg = document.getElementById("goblet");
    const gobletLink = document.getElementById("goblet-link");
    const topicText = document.getElementById("topic-text");
    const counterEl = document.getElementById("counter");
    const categoryContainer = document.getElementById("category-filters");

    let allTopics = {};
    let selectedCategories = new Set();
    let shuffledQueue = [];
    let animating = false;

    const STORAGE_KEY = "globet_state";

    // --- Fisher-Yates shuffle ---
    function shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // --- Build filtered topic list and shuffle ---
    function buildQueue() {
        const pool = [];
        for (const cat of selectedCategories) {
            if (allTopics[cat]) {
                pool.push(...allTopics[cat]);
            }
        }
        shuffledQueue = shuffle(pool);
        updateCounter();
        saveState();
    }

    function updateCounter() {
        if (!counterEl) return;
        const total = getTotalForSelected();
        counterEl.textContent = shuffledQueue.length + "/" + total + " restanti";
    }

    function getTotalForSelected() {
        let n = 0;
        for (const cat of selectedCategories) {
            if (allTopics[cat]) n += allTopics[cat].length;
        }
        return n;
    }

    // --- localStorage ---
    function saveState() {
        const state = {
            selectedCategories: Array.from(selectedCategories),
            queue: shuffledQueue
        };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) { /* quota exceeded — ignore */ }
    }

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    // --- Category UI ---
    function renderCategories() {
        if (!categoryContainer) return;
        categoryContainer.innerHTML = "";
        const cats = Object.keys(allTopics);
        cats.forEach(function (cat) {
            const btn = document.createElement("button");
            btn.className = "cat-btn" + (selectedCategories.has(cat) ? " active" : "");
            btn.textContent = cat;
            btn.setAttribute("aria-pressed", selectedCategories.has(cat));
            btn.addEventListener("click", function () {
                if (selectedCategories.has(cat)) {
                    selectedCategories.delete(cat);
                } else {
                    selectedCategories.add(cat);
                }
                renderCategories();
                buildQueue();
            });
            categoryContainer.appendChild(btn);
        });
    }

    // --- Extract topic ---
    function extractTopic() {
        if (shuffledQueue.length === 0) {
            buildQueue();
        }
        if (shuffledQueue.length === 0) {
            return "Nessun argomento disponibile";
        }
        const topic = shuffledQueue.pop();
        updateCounter();
        saveState();
        return topic;
    }

    // --- Goblet click ---
    gobletLink.addEventListener("click", function () {
        if (animating) return;
        animating = true;
        gobletLink.classList.add("disabled");

        gobletImg.src = "img/calice-transizione.gif";

        topicText.classList.remove("fade-in");
        void topicText.offsetWidth;
        topicText.textContent = extractTopic();
        topicText.classList.add("fade-in");

        setTimeout(function () {
            gobletImg.src = "img/calice-blu.gif";
            gobletLink.classList.remove("disabled");
            animating = false;
        }, 2100);
    });

    // --- Init ---
    fetch("topics.json")
        .then(function (res) { return res.json(); })
        .then(function (data) {
            allTopics = data.categories;
            const saved = loadState();
            const validCats = Object.keys(allTopics);

            if (saved && saved.selectedCategories) {
                saved.selectedCategories.forEach(function (c) {
                    if (validCats.indexOf(c) !== -1) selectedCategories.add(c);
                });
            }

            // Default: all categories selected
            if (selectedCategories.size === 0) {
                validCats.forEach(function (c) { selectedCategories.add(c); });
            }

            // Restore queue if categories match
            if (saved && saved.queue && saved.queue.length > 0) {
                shuffledQueue = saved.queue;
            } else {
                buildQueue();
            }

            renderCategories();
            updateCounter();
        })
        .catch(function () {
            topicText.textContent = "Errore nel caricamento degli argomenti";
        });
})();
