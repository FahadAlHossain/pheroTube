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
            <button onclick="displayDetails()" class="btn btn-error text-white">${category.category}</button>
        `;
    })
    categoryBtn(data)
}


const displayDetails = (data) => {
    const detailsCategory = document.getElementById('details-category');
    console.log(data)
    detailsCategory.innerHTML = `
        <div class="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              src=
              alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
    `
}

const categoryBtn = async (data) => {
    // const ref = await fetch(`https://openapi.programming-hero.com/api/videos/category/`)
    // const data = await ref.json();
    // const load = data.data;
    // console.log(load);
    // displayDetails(load);
    data.forEach(item => {
        fetch(`https://openapi.programming-hero.com/api/videos/category/${item.category_id}`)
        .then(res => res.json())
        .then(data => console.log(data))
    })
   
}


