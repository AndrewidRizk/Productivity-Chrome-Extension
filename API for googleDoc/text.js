fetch('http://localhost:4567/')
.then(res => res.json())
.then(data => console.log(data))