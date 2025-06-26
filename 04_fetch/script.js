(async () => {
	const usersJsonUrl = './users.json';
	const userList = document.querySelector('#userList');

	try {
		const response = await fetch(usersJsonUrl);
		const data = await response.json(); 
		data.forEach(user => {
			const li = document.createElement('li');
			li.textContent = `${user.name}(${user.email})`;
			userList.appendChild(li);
		});			
	} catch (error) {
		console.error('Fetchエラー:', error);
	};
})();