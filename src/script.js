const navBtns = document.querySelectorAll('.nav-btn');
const contentHolder = document.querySelector('#content');

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

async function appendCards(data) {
	removeCards();
	const a = await data;
	const dataValues = Object.values(a);
	for (let i = 0; i < dataValues.length; i += 1) {
		const card = CreateCard(dataValues[i]);
		contentHolder.appendChild(card);
	}
}

function getCategoryText(event, callback) {
	const category = event.target.innerHTML.toLowerCase();
	let data = ''
	if (category === 'food') {
		data = getCreatures(true);
	} else if (category === 'creatures') {
		data = getCreatures(false);
	} else {
		data = getCategoryes(category);
	}
	appendCards(data);
}

function addEventListeners() {
	const category = []
	navBtns.forEach((button) => button.addEventListener('click', getCategoryText));
}

addEventListeners();

$(window).on("load",function(){
	$(".loader-wrapper").fadeOut(1600, "linear");
	}); 
