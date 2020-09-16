// CensysSaasApi.js


const censysHttp = require('./censysHttp.js');

module.exports = class {
	constructor({
		CENSYS_SAAS_API_KEY,
		catchErrors = true,
		rootEndpoint = 'https://app.censys.io/api/beta'
	})

	{
		const httpRequest = catchErrors ? censysHttp.tryRequest : censysHttp.request;

		let defaultHeaders = {
						'Content-Type': 'application/json',
						'Censys-Beta-Api-Key': `${CENSYS_SAAS_API_KEY}`,
						'Cache-Control': 'no-cache',
						'User-Agent': 'censys-cli/1.0'
					}


		this.getLogbookData = (payload = { filters: { } }) =>
			getLogbookData(httpRequest, `${rootEndpoint}/logbook/getLogbookData`, {
				method: 'POST',
				headers: {...defaultHeaders},
				payload: payload
			});

		this.addSeeds = (payload = { seeds: [], ignoreErrorCodes: [] }) => 
			httpRequest (`${rootEndpoint}/seeds/addSeeds`, {
				method: 'POST',
				headers: {...defaultHeaders},
				payload: payload
			});

		this.getSeedChildren = (payload = { seeds: [] }) => 
			httpRequest (`${rootEndpoint}/seeds/getSeedChildren`, {
				method: 'POST',
				headers: {...defaultHeaders},
				payload: payload
			});

		this.getSeeds = () => 
			httpRequest (`${rootEndpoint}/seeds/getSeeds`, {
				method: 'POST',
				headers: {...defaultHeaders},
				payload: ''
			});

		this.removeSeeds = (payload = { seeds: [], ignoreErrorCodes: [] }) => 
			httpRequest (`${rootEndpoint}/seeds/removeSeeds`, {
				method: 'POST',
				headers: {...defaultHeaders},
				payload: payload
			});

		this.replaceSeedsWithLabel = (payload = { label: '', seeds: [], ignoreErrorCodes: [] }) => 
			httpRequest (`${rootEndpoint}/seeds/replaceSeedsWithLabel`, {
				method: 'POST',
				headers: {...defaultHeaders},
				payload: payload
			});
	}
}

async function getLogbookData(httpRequest, url, httpOptions) {

	let results = {};
	let nextWindowCursor = null;
	let data = [];
	try {
		do {
			results = await httpRequest(url, httpOptions);

			if (!results.success) throw 'error';

			data = [...data, ...results.data];

			//overwrite the payload with the nextWindowCursor object to get subsequent data
			httpOptions.payload = {};
			httpOptions.payload.nextWindowCursor = results.response.body.nextWindowCursor;

		} while (httpOptions.payload.nextWindowCursor !== null);

		results.data = data;
		return results;
	}
	catch(error) {
		return results;

	}
}





















