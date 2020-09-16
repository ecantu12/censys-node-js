
const getCredentials = require('./getCredentials');
const CensysSaasApi = require('../../censys-api/CensysSaasApi.js');


async function main(){

	const { CENSYS_SAAS_API_KEY } = getCredentials();

	const censysSaas = new CensysSaasApi({
		CENSYS_SAAS_API_KEY: CENSYS_SAAS_API_KEY
	});

	let {response, success, error} = await censysSaas.getLogbookData();

	console.log(success ? JSON.stringify(response.body, null, 4) :  'An error occurred: \n'+JSON.stringify(error, null, 4))

}


main();

