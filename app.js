var firstName = ["Aaren","Aarika","Abagael","Abagail"];
var firstNameLength = firstName.length;
var secondName = ["Smith","Johnson","Williams","Brown"];
var secondNameLength = secondName.length;
var randomWords = ["apple", "orange", "grapes", "programming"];
var randomWordsLength = randomWords.length;

async function sink_now(url, param, config){

	function randomize(n, from = 0){ return Math.round( Math.random() * n ) + from; }
	function appendNumber(str){ return randomize(1) ? str + randomize(100) : str; }

	config.count = config.count ?? 1;
	var keys = Object.keys(param);
	var keyLength = keys.length;

	console.log("Attempting to sink... ⛵");
	for(var i = 1; i <= config.count; i++){
		var randomFirstName = firstName[ randomize(firstNameLength) ];
		var randomSecondName 	= secondName[ randomize(secondNameLength) ]
		var isUpper = randomize(1);
		var requestData = Object.assign({}, param);

		for(var x = 0; x < keyLength; x++){
			switch( param[keys[x]] ){
				case "!USERNAME":
					requestData[keys[x]] = appendNumber(randomize(1) ? randomFirstName : randomSecondName);
					requestData[keys[x]] = isUpper ? requestData[keys[x]].toUpperCase() : requestData[keys[x]].toLowerCase();
					break;
				case "!PASSWORD":
					if( randomize(100) > 90 ){
						requestData[keys[x]] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split('').splice(0, randomize(25, 8)).sort(() => { return .5 - Math.random() }).join('')
					}else{
						if( randomize(100) > 80 ){
							requestData[keys[x]] = randomWords[ randomize(randomWordsLength) ];
						}else if( randomize(100) > 70 ){
							requestData[keys[x]] = randomFirstName + randomSecondName;
						}else{
							requestData[keys[x]] = randomSecondName + randomFirstName;
						}
						if( randomize(1) ){
							requestData[keys[x]] += randomize(50);	
						}
					}

					break;
				case "!EMAIL":
					var providers = ["@protonmail.com", "@gmail.com", "@yahoo.com"];
					if( randomize(100) > 50 ){
						requestData[keys[x]] = randomFirstName + randomSecondName;
					}else{
						requestData[keys[x]] = randomSecondName + randomFirstName;
					}
					if( randomize(1) ){
						requestData[keys[x]] += randomize(50);	
					}
					requestData[keys[x]] += providers[ randomize(2) ];
					requestData[keys[x]] = isUpper ? requestData[keys[x]].toUpperCase() : requestData[keys[x]].toLowerCase();
					break;
			}
		}
		console.log("DATA", requestData);
		var result = await fetch(url, {
			method: "POST",
			body: JSON.stringify(requestData)
		});

		if( i == 1 && result >= 200 && result <= 300 ){
			console.log("Terminating:", result.status, " code");
			break;
		}

		if( i == 1 ){
			console.log("Allowed: 🟢");
			console.log("Starting to sink");
		}else if( i % 5 == 0 ){
			console.log(`Count ${ i } / ${ config.count }`)
		}
	}

	console.log("Finish sinking! Total:", config.count);
}