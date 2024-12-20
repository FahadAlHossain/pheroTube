const loadData = async () =>{
    const ref = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await ref.json();
    const load = data.data;
    // console.log(load);
    displayCategory(load);
}

loadData();

const displayCategory = (data) => {
    const btnCategory = document.getElementById('btn-category');
    
    data.forEach(category => {
        // console.log(category.category)
        btnCategory.innerHTML += `
            <button onclick="categoryBtn('${category.category_id}')" class="btn btn-error text-white">${category.category}</button>
        `;
    })
    // categoryBtn(data)
}

const convertDays = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const rScnd = seconds % 3600;
    const minutes = Math.floor( rScnd / 60);
    return `${hours} hr ${minutes} min ago`;
}


const displayDetails = (data) => {
    const detailsCategory = document.getElementById('details-category');
    // console.log(data);

    detailsCategory.innerHTML = '';
    data.forEach((items) => {
        const hrMin = convertDays(items.others.posted_date); 
        
        const verifiedBadge = items.authors[0].verified
            ? `<i class="fa-solid fa-circle-check text-blue-700"></i>` 
            : ''; // Add badge if verified is true
        
        detailsCategory.innerHTML += `
            <div class="card bg-white text-black w-[100%] shadow-xl">
              <figure>
                    <div class="indicator">
                        ${
                            items.others.posted_date
                                ? `<span class="indicator-item indicator-bottom badge badge-ghost mb-4 mr-20 text-white">${hrMin}</span>`
                                : ''
                        }
                        <div class="bg-base-300 grid place-items-center rounded-xl">
                            <img class="w-[100%] h-72 rounded-xl"
                                src=${items.thumbnail}
                                alt="Shoes" />
                        </div>
                    </div>
              </figure>
              <div class="card-body">
                    <div class="avatar">
                      <div class="w-10 h-10 rounded-full">
                         <img src=${items.authors[0].profile_picture} />
                      </div>
                        <h2 class="card-title text-lg pl-3">${items.title}</h2>
                    </div>
                    <div class="pl-14 text-slate-500">
                        <p>${items.authors[0].profile_name} ${verifiedBadge}</p>
                        <span>${items.others.views} views</span>
                    </div>
              </div>
            </div>
        `;
    });
};


document.getElementById('sort-by-views').addEventListener('click', () => {
    if (!currentVideos || currentVideos.length === 0) {
        console.warn("No videos available to sort.");
        return;
    }

    const sortedVideos = [...currentVideos].sort((a, b) => {
        const viewsA = parseInt(a.others.views) || 0; 
        const viewsB = parseInt(b.others.views) || 0;
        return viewsB - viewsA;
    });

    displayDetails(sortedVideos);
});

let currentVideos = [];

const categoryBtn = async (id) => {
    try {
        const ref = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
        const data = await ref.json();
        const load = data.data;

        currentVideos = load;

        // Check if the category contains videos
        if (load.length === 0) {
            // console.log(load)
            const detailsCategory = document.getElementById('details-category');
            detailsCategory.textContent = null;

            const noContent = document.getElementById('no-content');
            noContent.classList.remove('hidden');
            noContent.innerHTML = `
                <div class="text-center">
                    <div class="w-40 m-auto">
                        <img src="Assets/Icon.png" />
                    </div>
                    <div>
                        <p class="text-black text-4xl">Oops!! Sorry,There is no content here.</p>
                    </div>
                </div>
            `
        }else{
            const noContent = document.getElementById('no-content');
            noContent.classList.add('hidden')
            noContent.textContent = null
        }

        // If there are videos, display them
        displayDetails(load);
    } catch (error) {
        console.error("Error fetching category details:", error);
        const detailsCategory = document.getElementById('details-category');
        detailsCategory.innerHTML = `
            <p class="text-red-500 text-center">Failed to load videos. Please try again later.</p>
        `;
    }
};




categoryBtn(1000);
   


