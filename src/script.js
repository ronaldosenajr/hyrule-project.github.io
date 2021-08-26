const navBtns = document.querySelectorAll('.nav-btn');
const contentHolder = document.querySelector('#content');

let calledFromAPI = false;

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
      all: [...value.data.creatures.food, 
		...value.data.creatures.non_food, 
		...value.data.equipment, ...value.data.materials,
		...value.data.monsters, ...value.data.treasure],
    }];
    data = categories;
    return data;
  });
  return data;
}

const datas = allData()

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
	if (card.className === 'card') {
		card.className = 'evidenceCard';
		const cards = document.querySelectorAll('.card');
		cards.forEach((card) => card.style.display = 'none');
	} else {
		card.className = 'card';
		const cards = document.querySelectorAll('.card');
		cards.forEach((card) => card.style.display = 'flex');
	}
}

async function appendCards(data, createAllcards = false) {
	removeCards();
	if (createAllcards) {
		const promise = await data[0];
		const dataValues = promise.all;
		for (let i = 0; i < dataValues.length; i += 1) {
			const card = CreateCard(dataValues[i]);
			contentHolder.appendChild(card);
			card.addEventListener('click', changeClass);
		}
	} else {
		const promise = await data[0];
		const dataValues = promise;
		for (let i = 0; i < dataValues.length; i += 1) {
			const card = CreateCard(dataValues[i]);
			contentHolder.appendChild(card);
			card.addEventListener('click', changeClass);
		}
	}
}

async function getCategories(category) {
  const promise = await datas;
  let data = '';
  data = promise.map((dataCategory) => {
    const { equipment, treasure, monsters, materials, creatures } = dataCategory;
    if (category === 'equipment') {
      return equipment;
    }
    if (category === 'treasure') {
      return treasure;
    }
    if (category === 'monsters') {
      return monsters;
    }
    if (category === 'materials') {
      return materials;
    }
    if (category === 'food') {
      return creatures.food;
    }
    if (category === 'creatures') {
      return creatures.non_food;
    }
  });
  appendCards(data, false);
}

function getCategoryText(event, callback) {
	const category = event.target.innerHTML.toLowerCase();
	getCategories(category);
}

async function createAllCategories() {
	if (!calledFromAPI) {
		calledFromAPI = true;
		const promise = await allData();
		const data = promise;
		appendCards(data, true);
	}
}

async function addEventListeners() {
	const category = []
	navBtns.forEach((button) => button.addEventListener('click', getCategoryText));
}

addEventListeners();

window.onload = () => {
	createAllCategories();
};
