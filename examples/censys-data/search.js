
const getCredentials = require('./getCredentials.js');
const CensysDataApi = require('../../censys-api/CensysDataApi.js');



async function main(){

	const {CENSYS_API_ID, CENSYS_API_SECRET} = getCredentials();

	const censysData = new CensysDataApi({
		CENSYS_API_ID: CENSYS_API_ID,
		CENSYS_API_SECRET: CENSYS_API_SECRET
	});

	let index = `certificates`;
	let payload = {
		query: `censys.io`,
		page: 1,
		fields: [],
		flatten: true
	}

	let {response, success, error} = await censysData.search(index, payload);

	let output = [];

	if(success){
		output = response.body.results;
		let pages = response.body.metadata.pages > 8 ? 8 : response.body.metadata.pages;
		for(let i = 2; i < pages; i++ ){
			payload.page = i;
			let {response, success, error}  = await censysData.search(index, payload);
			output = success ? [...output, ...response.body.results] : output;

			process.stdout.write('Retrieving page ' + i + '/' + pages + '\r');

		};

	} else{
		console.log(error);


	}
	process.stdout.write('');
	console.log(JSON.stringify(output, null, 4));

}


main();

