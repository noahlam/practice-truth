this.addEventListener('message', function (e) {
	console.log(e.data)
	let beginTime = (new Date()).valueOf()
	while ((new Date()).valueOf() < beginTime + 3000) {

	}
	this.postMessage('过了3秒,返回数据')
	this.close()
})
