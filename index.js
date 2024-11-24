const loadData = async () =>{
    const ref = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await ref.json();
    const load = data.data;
    console.log(load);
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


const displayDetails = (data) => {
    const detailsCategory = document.getElementById('details-category');
    // console.log(data)

    detailsCategory.innerHTML = '';
    data.forEach(items => {
        // console.log(items.category_id)
        detailsCategory.innerHTML += `
            <div class="card bg-white text-black w-[98%] shadow-xl">
              <figure>
                <img class="w-96 h-72 rounded-xl"
                  src=${items.thumbnail}
                  alt="Shoes" />
              </figure>
              <div class="card-body">
                    <div class="avatar">
                      <div class="w-10 rounded-full">
                         <img src=${items.authors[0].profile_picture} />
                      </div>
                        <h2 class="card-title pl-3">${items.title}</h2>
                    </div>
                    <div class="pl-14 text-slate-500">
                        <p>${items.authors[0].profile_name} <span>${items.authors[0].verified}</span></p>
                        <span>${items.others.views} views</span>
                    </div>
              </div>
            </div>
        `
    })
}

const categoryBtn = async (id) => {
    const ref = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await ref.json();
    const load = data.data;
    console.log(load);
    displayDetails(load);
    // data.forEach(item => {
    //     fetch(`https://openapi.programming-hero.com/api/videos/category/${item.category_id}`)
    //     .then(res => res.json())
    //     .then(data => console.log(data))
}

categoryBtn(1000);
   


