// account.js

const getCredentials = require('./getCredentials');
const CensysDataApi = require('../../censys-api/CensysDataApi.js');

async function main(){

	const {CENSYS_API_ID, CENSYS_API_SECRET} = getCredentials();

	const censysData = new CensysDataApi({
		CENSYS_API_ID: CENSYS_API_ID,
		CENSYS_API_SECRET: CENSYS_API_SECRET,
	});

	let {data, success} = await censysData.account();

	if(success){
		console.log(data);
		let left = data.quota.allowance - data.quota.used;
		console.log('\n', `Number of queries left: ${left}`, '\n');

	} else {
		console.log('An error occurred:');
		console.log(data, '\n');

	}
}


main();



