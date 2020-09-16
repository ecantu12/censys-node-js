
const getCredentials = require('./getCredentials.js');
const CensysDataApi = require('../../censys-api/CensysDataApi.js');


async function main(){

	const {CENSYS_API_ID, CENSYS_API_SECRET} = getCredentials();

	const censysData = new CensysDataApi({
		CENSYS_API_ID: CENSYS_API_ID,
		CENSYS_API_SECRET: CENSYS_API_SECRET
	});

	const index = 'websites';
	const sites = ['apple.com', 'amazon.com', 'blabla.com', 'google.com', 'microsoft.com', 'facebook.com', 'slack.com', 'censys.io'];

	console.log();
	console.log('Domain'.padEnd(20,' ')+'Alexa Rank'.padEnd(14,' ')+'Ports');

	for(let i in sites) {

		const {data, success} = await censysData.view(index, sites[i]);

		let line = '';
		if(success){
			line =  data.domain.padEnd(20, ' ');
			line += data.alexa_rank.toString().padEnd(14, ' ');
			line += data.ports;

		} else {
			line = `${sites[i]} - Error: ${data.httpStatusCode}, ${data.httpStatusMessage}`
		}

		console.log(line);
	}
	console.log();

}


main();

