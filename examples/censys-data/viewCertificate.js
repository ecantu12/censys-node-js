
const getCredentials = require('./getCredentials.js');
const CensysDataApi = require('../../censys-api/CensysDataApi.js');


async function main(){

	const {CENSYS_API_ID, CENSYS_API_SECRET} = getCredentials();

	const censysData = new CensysDataApi({
		CENSYS_API_ID: CENSYS_API_ID,
		CENSYS_API_SECRET: CENSYS_API_SECRET
	});

	const index = 'certificates';
	const sha256Fingerprint = '3489dbafd3c573bc9db15816c6a7fae4456436a365e351be734b6a80fe26713e'

	const {data, success} = await censysData.view(index,sha256Fingerprint);

	console.log(data);

}


main();

