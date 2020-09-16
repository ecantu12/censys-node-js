

const getCredentials = require('./getCredentials');
const CensysDataApi = require('../../censys-api/CensysDataApi.js');


async function main(){

	const {CENSYS_API_ID, CENSYS_API_SECRET} = getCredentials();

	const censysData = new CensysDataApi({
		CENSYS_API_ID: CENSYS_API_ID,
		CENSYS_API_SECRET: CENSYS_API_SECRET
	});

	let index = `ipv4`;
	let payload = {
		query: `location.city: Ann Arbor AND location.province: Michigan`,
		field: `protocols`,
		buckets: 30
	}

	const {response, success, error} = await censysData.report(index, payload);

	const results = success ? response.body.results : error;

	console.log(JSON.stringify(results, null, 4));

	console.log(response.body.metadata.query);


}


main();

