
const getCredentials = require('./getCredentials.js');
const CensysDataApi = require('../../censys-api/CensysDataApi.js');


async function main(){

	const {CENSYS_API_ID, CENSYS_API_SECRET} = getCredentials();

	const censysData = new CensysDataApi({
		CENSYS_API_ID: CENSYS_API_ID,
		CENSYS_API_SECRET: CENSYS_API_SECRET,
		catchErrors: true,
	});

	const startPage = 20;
	const maxPages = 4;

	let index = `certificates`;
	let payload = {
		query: `censys.io AND tags: expired`,
		fields: [],
		flatten: false
	}

	let {data, success} = await censysData.multiPageSearch(index, payload, startPage, maxPages);

	if (success){
		console.log(data);

	} else {
		console.log('An error has occurred:')
		console.log(data)
	}


}


main();

