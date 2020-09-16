
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
		// query: `443.https.get.headers.server: nginx AND location.city: Traverse City`,
		// query: `ip: 58.27.0.0/16`,
		query: `sgded.com`,
		page: 1,
		fields: [],
		flatten: true
	}

	let results = await censysData.search(index, payload);
	// console.log(results.response.body);

	let out = results.response.body;
	// console.log(results.response.body.metadata);
	// let pages = results.response.body.metadata.pages;

	// for(let i = 2; i < pages; i++ ){
	// 	payload.page = i;
	// 	results = await censysData.search(index, payload);
	// 	out = [...out, ...results.response.body.results];

	// }

	console.log(JSON.stringify(out, null, 4));

	// for(let i in out){
	// 	console.log(`ip: ${out[i].ip}  city: ${out[i]['location.city']}  Province: ${out[i]['location.province']}`)
	// }


	// for (let i in out) {
	// 	let ans = await censysData.view('ipv4', out[i].ip);
	// 	console.log(ans.error);
	// 	console.log(out[i].ip, ans.response.body.tags, ans.response.body.protocols)
	// }
	
}


main();

