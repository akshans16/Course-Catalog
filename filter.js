document.addEventListener("DOMContentLoaded", function () {
    const filterTrigger = document.getElementById("filterTrigger");
    const filterPopup = document.getElementById("filterPopup");
    const closeFilter = document.getElementById("closeFilter");
    const filterOptions = document.querySelectorAll(".filter-option");
    const applyFilters = document.getElementById("applyFilters");
    const cards = document.querySelectorAll(".card");

    let selectedFilters = {
        topic: null,
        duration: null,
        difficulty: null,
    };

    // Show popup and prevent background scroll
    filterTrigger?.addEventListener("click", () => {
        filterPopup.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    });

    // Hide popup and restore scroll
    closeFilter?.addEventListener("click", () => {
        filterPopup.classList.add("hidden");
        document.body.style.overflow = "";
    });

    // Close popup if clicking outside the content
    filterPopup?.addEventListener("click", (e) => {
        if (e.target === filterPopup) {
            filterPopup.classList.add("hidden");
            document.body.style.overflow = "";
        }
    });

    // Handle selection toggling
    filterOptions.forEach((option) => {
        option.addEventListener("click", function () {
            const category = this.dataset.category;
            const value = this.dataset.value;

            // Remove selected class from all options in the same category
            document.querySelectorAll(`[data-category="${category}"]`).forEach((el) => {
                el.classList.remove("selected");
            });

            // Toggle selection
            if (selectedFilters[category] === value) {
                selectedFilters[category] = null;
                this.classList.remove("selected");
            } else {
                selectedFilters[category] = value;
                this.classList.add("selected");
            }
        });
    });

    
    applyFilters?.addEventListener("click", () => {
        const activeFilters = document.getElementById("activeFilters");
        activeFilters.innerHTML = ""; // Clear previous pills

        // Create pill elements based on selected filters
        for (let key in selectedFilters) {
            if (selectedFilters[key]) {
                const pill = document.createElement("div");
                pill.classList.add("pill");
                pill.dataset.category = key;

                
                let label = selectedFilters[key];
                if (key === "duration") {
                    label = {short: "Short", medium: "Medium", long: "Long"}[label];
                }
                if (key === "difficulty") {
                    label = {beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced"}[label];
                }
                if (key === "topic") {
                    label = selectedFilters[key]
                    .replace("web-dev", "Web Development")
                    .replace("data-science", "Data Science")
                    .replace("tools", "Tools");
                }

                pill.innerHTML = `${label} <span class="remove">×</span>`;
                activeFilters.appendChild(pill);

                // Remove pill & reset filter
                pill.querySelector(".remove").addEventListener("click", () => {
                    selectedFilters[key] = null;

                    // Also remove selected styling in filter popup
                    document.querySelectorAll(`[data-category="${key}"]`).forEach((el) => {
                        el.classList.remove("selected");
                    });

                    pill.remove();
                    applyFilters.click(); 
                });
            }
        }

        // Apply filtering to cards
        cards.forEach((card) => {
            const cardTopic = card.dataset.topic?.toLowerCase().replace(/\s/g, "-");
            const cardDuration = card.dataset.duration;
            const cardDifficulty = card.dataset.difficulty;

            let show = true;

            if (selectedFilters.topic && selectedFilters.topic !== cardTopic) {
                show = false;
            }

            if (selectedFilters.duration) {
                const mapDuration = {short: "1", medium: "2", long: "3"};
                if (mapDuration[selectedFilters.duration] !== cardDuration) {
                    show = false;
                }
            }

            if (selectedFilters.difficulty) {
                const mapDifficulty = {beginner: "1", intermediate: "2", advanced: "3"};
                if (mapDifficulty[selectedFilters.difficulty] !== cardDifficulty) {
                    show = false;
                }
            }

            card.style.display = show ? "block" : "none";
        });

        // Hide popup
        filterPopup.classList.add("hidden");
        document.body.style.overflow = "";
    });
});
