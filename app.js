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

		// Execute the `every_generate` if exist
		if( typeof config.every_generate === 'function' ){
			config.every_generate(Object.assign({
				count: i
			}, requestData));
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

// INSERT STYLE
var SINK_STYLE = `<style>
#sink{
	position: absolute; bottom: 0; max-width: 450px; left: 5%;
	padding: 1rem;
	border-top-left-radius: 1rem;
	border-top-right-radius: 1rem;
	background: #0d1117;
	color: white;
	border: 1px solid white;
	border-bottom: 0;
}
#sink *{ box-sizing: border-box; }
#sink{
	background: #0d1117; color: white; font-family: "Open sans", "Arial";
}
#sink input, #sink textarea{
	font-family: inherit; font-size: inherit; background: none; color: inherit; width: 100%;
	margin-bottom: 1rem; padding: 0.5rem;
	border: 1px solid #4f4f4f;
	border-radius: 0.2rem;
}
#sink input[type="submit"]{ background: white; color: #0d1117; font-weight: bold; border: none; }
#sink label{ font-size: small; color: gray; }
#sink main{ width: 500px; margin: 3rem auto 0rem; }
#sink #header{ text-align: center; margin-bottom: 2rem; }
#sink #header h2{ margin: 0rem; }
</style>`;
document.head.insertAdjacentHTML("beforeend", SINK_STYLE);


// INSERT THE DASHBOARD
var SINK_DASHBOARD = `<div id="sink" >
	<div id="header">
		<h2>Sink</h2>
		<div>Fish generator for Phishers</div>
	</div>
	<label>Target URL</label>
	<input id="link" type="text" placeholder="Link" value="http://localhost/sink/3vilBoat/login.php" >
	<label>Parameters</label>
	<textarea id="params" rows="5" >{
	"handle": "!EMAIL",
	"password": "!PASSWORD",
	"planet": "earth"
}</textarea>
	<label>Fish count</label>
	<input id="count" type="number" value="100" >
	<input id="submitButton" type="submit" value="Sink now!" >
	<div>
		<div>Fish generated <span id="fishGenerated" >0</span></div>
	</div>
</div>`;
document.body.insertAdjacentHTML("beforeend", SINK_DASHBOARD);

// ADD THE EVENTS
var linkTarget = document.querySelector("#sink #link");
var linkParams = document.querySelector("#sink #params");
var fishCount  = document.querySelector("#sink #count");
var submitButton = document.querySelector("#sink #submitButton");
var fishGenerated = document.querySelector("#sink #fishGenerated");
submitButton.addEventListener("click", () => {
	sink_now(linkTarget.value, JSON.parse(linkParams.value), {
		count: fishCount.value,
		every_generate: function(data){
			fishGenerated.innerHTML = `${ data.count } / ${ fishCount.value }`;
		}
	});
});