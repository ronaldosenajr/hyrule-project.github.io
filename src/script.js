const navBtns = document.querySelectorAll('.nav-btn');
const contentHolder = document.querySelector('#content');

let calledFromAPI = false;


document.addEventListener('wheel', () => {
	if (!calledFromAPI) {
		console.log('chamou a api');
		calledFromAPI = true;
		document.removeEventListener('wheel', () => {
			if (!calledFromAPI) {
				console.log('chamou a api');
				calledFromAPI = true;
			}
		})
	}
});

/* async function getCreatures(food = false) {
async function getCreatures(food = false) {
	const url = `https://botw-compendium.herokuapp.com/api/v2/category/creatures`
	if (food === false) {
		return await fetch(url).then((value) => value.json()).then((value) => value.data.non_food);
	}
	return await fetch(url).then((value) => value.json()).then((value) => value.data.food);
}

async function getCategoryes(category) {
	const url = `https://botw-compendium.herokuapp.com/api/v2/category/${category}`
	return await fetch(url).then((value) => value.json()).then((value) => value.data);
} */

async function allData() {
  let data;
  const allData = 'https://botw-compendium.herokuapp.com/api/v2';
  await fetch(allData)
  .then((result) => result.json())
  .then((value) => {
    const categories = [{
      creatures: {
        food: value.data.creatures.food,
        non_food: value.data.creatures.non_food,
      },
      equipment: value.data.equipment,
      materials: value.data.materials,
      monsters: value.data.monsters,
      treasure: value.data.treasure,
    }];
    data = categories;
    return data;
  });
  return data;
}

function createTextElements(h3, p, img, data) {
	h3.innerHTML = data.name;
	p.innerHTML = data.description;
	img.src = data.image;
}

function CreateCard(data) {
	const card = document.createElement('div');
	card.className = 'card';
	const img = document.createElement('img');
	img.className = 'card-img';
	const container = document.createElement('div');
	container.className = "container";
	const h3 = document.createElement('h3');
	const p = document.createElement('p');
	createTextElements(h3, p, img, data)
	card.appendChild(img);
	card.appendChild(container);
	container.appendChild(h3);
	container.appendChild(p);
	return card;
}

function removeCards() {
	contentHolder.innerHTML = '';
}

function changeClass(event) {
  const card = event.target;
  if (card.className === 'card'){
	  card.className = 'evidenceCard';
	  const cards = document.querySelectorAll('.card');
	  cards.forEach((card) => card.style.display = 'none');
  } else {
	card.className = 'card';
	const cards = document.querySelectorAll('.card');
	cards.forEach((card) => card.style.display = 'flex');
  }
}

async function appendCards(data) {
	removeCards();
	const promise = await data[0];
	const dataValues = promise;
	for (let i = 0; i < dataValues.length; i += 1) {
		const card = CreateCard(dataValues[i]);
		contentHolder.appendChild(card);
    card.addEventListener('click', changeClass);
	}
}

async function getCategoryText(event, callback) {
	const category = event.target.innerHTML.toLowerCase();
	const promise = await allData();
  let data = '';
	if (category === 'food') {
    data = promise.map((dataCategory) => {
      const {creatures} = dataCategory;
      return creatures.food;
    });
	} else if (category === 'creatures') {
		data = getCreatures(false);
	} else {
		data = getCategoryes(category);
	}
	appendCards(data);
}

async function addEventListeners() {
	const category = []
	navBtns.forEach((button) => button.addEventListener('click', getCategoryText));
}

addEventListeners();

// Hofs para os carts



