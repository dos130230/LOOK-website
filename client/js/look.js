const hostName = 'http://127.0.0.1:8000'
const customersList = document.querySelector('.customers-list')
const ordersList = document.querySelector('.orders-list')
const clientId = document.querySelector('#clientId')
const userHeader = document.querySelector('#userHeader')


function createElements (...array) {
	return array.map( el => {
		return document.createElement(el)
	} )
}

async function renderUsers () {

	const response = await fetch(hostName + '/users')
	const users = await response.json()

	for(let user of users) {
		const [li, span, a] = createElements('li', 'span', 'a')

		li.className = 'customer-item'
		span.className = 'customer-name'
		a.className = 'customer-phone'

		span.textContent = user.first_name
		a.textContent = '+' + user.telephone

		a.setAttribute('href', 'tel:' + '+' + user.telephone)

		li.append(span, a)
		customersList.append(li)

		li.onclick = () => {
			renderOrders(user.user_id)
			clientId.textContent = user.user_id
			userHeader.textContent = user.first_name

			// getFoots(user.user_id,)
			// console.log()

			async function renderSelector (){
				let ovqat ;
				let selector = document.querySelector('#foodsSelect')
				let response = await fetch(hostName + '/foods')
				let result = await response.json()
				console.log(result)
				selector.innerHTML = ''
				result.forEach(element => {
					let option = document.createElement('option')
					option.textContent = element.food_name
					option.setAttribute('value',element.food_id)
					selector.append(option)
				});

				let select_out = document.querySelectorAll('option')
				select_out.forEach((el)=>{
					el.onclick = () =>{
						ovqat=el.va
					}
				})
			}
			renderSelector()













		}
	}
}



let usernameInput = document.querySelector('#usernameInput')
let telephoneInput = document.querySelector('#telephoneInput')
let submit = document.querySelector('.submit')

async function Postzapr(urername,phone) {
	const rawResponse = await fetch(hostName +'/users', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({
		  username:urername,
		  phone:phone
	  })
	});

	const content = await rawResponse.json();
  
	console.log(content);
  }
	

  submit.onclick=  ()=>{
	  if (!usernameInput.value) return
	Postzapr(usernameInput.value,telephoneInput.value)
  }




async function renderOrders (userId) {

	const response = await fetch(hostName + '/orders/' + userId)
	const orders = await response.json()
	ordersList.innerHTML = null
	for(let order of orders) {
		const [li, img, div, foodName, foodCount] = createElements('li', 'img', 'div', 'span', 'span')

		li.className = 'order-item'
		foodName.className = 'order-name'
		foodCount.className = 'order-count'

		img.src = hostName + order.food.food_img_link

		foodName.textContent = order.food.food_name 
		foodCount.textContent = order.count

		div.append(foodName, foodCount) 
		li.append(img, div)
		ordersList.append(li)
	}
}
let foodsCount = document.querySelector('#foodsCount')
let fotbuuton = document.querySelector('.fotbuuton')




async function getFoots(id,fot_id,nechta){
	const rawResponse = await fetch(hostName +'/orders', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			userId:id,
			foodId:fot_id,
			count :nechta
		})
	  });
  
	  const content = await rawResponse.json();
} 
renderUsers()






