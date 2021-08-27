const navBtns = document.querySelectorAll('.nav-btn');
const contentHolder = document.querySelector('#content');
const lestSearchBtn = document.querySelector('.saiba-mais-button');

let calledFromAPI = false;

async function allData() {
 testsWriting
	const allData = 'https://botw-compendium.herokuapp.com/api/v2';
	return await fetch(allData)
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
				all: [...value.data.creatures.food, ...value.data.creatures.non_food, ...value.data.equipment, ...value.data.materials, ...value.data.monsters, ...value.data.treasure],
			}];
			return categories;
		});
}

const datas = allData();

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
	let card = event.target;
	if (card.nodeName === 'H3' || card.nodeName === 'P') {
		const newCard = card.parentElement.parentElement;
		card = newCard;
	}
	if (card.nodeName === 'IMG') {
		const newCard = card.parentElement;
		card = newCard;
	}
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

async function getCategories(category, callback) {
	const promise = await datas;
	let data = '';
	data = promise.map((dataCategory) => {
		const { creatures } = dataCategory;
		if (category === 'food') {
			return creatures.food;
		} else if (category === 'creatures') {
			return creatures.non_food;
		} else {
			return dataCategory[category];
		}
	});
	callback(data, false);
}

async function getCategoryText(event) {
	const category = event.target.innerHTML.toLowerCase();
	getCategories(category, appendCards);
}

async function createAllCategories() {
	const promise = await datas;
	const data = promise;
	appendCards(data, true);
}

async function addEventListeners() {
	navBtns.forEach((button) => button.addEventListener('click', getCategoryText));
	lestSearchBtn.addEventListener('click', createAllCategories);
}

addEventListeners();

const sum = (a, b) => a + b;


module.exports = { allData, datas, getCategories, appendCards, sum };
