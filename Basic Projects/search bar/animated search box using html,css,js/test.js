const searchBox = document.querySelector(".search-box");
        const searchBtn = document.querySelector(".search-icon");
        const cancelBtn = document.querySelector(".cancel-icon");
        const searchInput = document.querySelector("input");
        const searchData = document.querySelector(".search-data");

        searchBtn.addEventListener("click",()=>{
            searchBox.classList.add("active");
            searchBtn.classList.add("active");
            searchInput.classList.add("active");
            cancelBtn.classList.add("active");

        });

        cancelBtn.addEventListener("click",()=>{
            searchBox.classList.remove("active");
            searchBtn.classList.remove("active");
            searchInput.classList.remove("active");
            cancelBtn.classList.remove("active");
            searchData.classList.remove("active");
        });
        