const dataLode = async (search_phone = '13', isShowAll) => {
  const data = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${search_phone}`
  );
  const finalValue = await data.json();
  const phone = finalValue.data;
  phoneLode(phone, isShowAll);
};

const phoneLode = (phones, isShowAll) => {
  const phonesCards = document.getElementById('phonesCards');
  phonesCards.textContent = '';
  const seeMorezbtn = document.getElementById('seeMorezbtn');

  if (phones.length > 12 && !isShowAll) {
    seeMorezbtn.classList.remove('hidden');
  } else {
    seeMorezbtn.classList.add('hidden');
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card w-full bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
     <figure><img src="${phone.image}" alt="Phone" />
          </figure>
          <div class="card-body ">
            <h2 class="card-title justify-center">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            
            <div class="card-actions justify-center">
              <button onclick="phoneDetalis('${phone.slug}')" class="btn btn-primary">Show Detalis</button>
            </div>
          </div>
    `;

    phonesCards.appendChild(phoneCard);
  });
  loadingSpinner(false);
};
// phoneDetalis is used function-------

const phoneDetalis = async id => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phones = data.data;
  showPhoneDetails(phones);
};

//show phone detalis-----------

const showPhoneDetails = data => {
  console.log(data);
  const showdetalis = document.getElementById('show-detalis-contners');
  showdetalis.innerHTML = `
  <div class=""> <img src="${data.image}" alt=""></div>
  <div class=""> <h3 class="font-bold text-3xl">${data.name}</h3>
  <h2 class=""> <span class="text-xl font-semibold">Storage :</span> ${
    data.mainFeatures.storage
  }</h2>
  <h2 class=""> <span class="text-xl font-semibold"> display Size :</span> ${
    data.mainFeatures.displaySize
  }</h2>
  <h2 class=""> <span class="text-xl font-semibold"> chipSet :</span> ${
    data.mainFeatures.chipSet
  }</h2>
  <h2 class=""> <span class="text-xl font-semibold">memory :</span> ${
    data.mainFeatures.memory
  }</h2>
  <h2 class=""> <span class="text-xl font-semibold"> slug :</span> ${
    data.slug
  }</h2>
  <h2 class=""> <span class="text-xl font-semibold">release Date
 :</span> ${data.releaseDate}</h2>
  <h2 class=""> <span class="text-xl font-semibold">brand :</span> ${
    data.brand
  }</h2>
  <h2 class=""> <span class="text-xl font-semibold"> GPS :</span> ${
    data?.others?.GPS || 'No Gps'
  }</h2>

  </div>
  
 
  
  `;
  //--show modal-----
  my_modal_5.showModal();
};

function buttonHendlor(isShowAll) {
  loadingSpinner(true);
  const inputAreyas = document.getElementById('inputAreyas').value;
  dataLode(inputAreyas, isShowAll);
}

function loadingSpinner(islooding) {
  const loadingSpinners = document.getElementById('loadingSpinners');
  if (islooding) {
    loadingSpinners.classList.remove('hidden');
  } else {
    loadingSpinners.classList.add('hidden');
  }
}

const seeMorezbtn = document.getElementById('seeMorezbtn');
seeMorezbtn.addEventListener('click', function () {
  buttonHendlor(true);
});

dataLode();
