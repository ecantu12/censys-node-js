// censysHttp.js


const http = require('fetch');


async function tryRequest(url, httpOptions) {
	
	try {
		let results = await httpRequest(url, httpOptions);

		if (results.response.status == 200){
			results.success = true;
			results.request.curl = asCurl(url, httpOptions);
			results.data = results.response.body.results ? results.response.body.results : results.response.body;

		} else {
			results.success = false;
			results.request.curl = asCurl(url, httpOptions);
			// special case for 404 since censys.io/api/v1 returns HTML instead of error object, otherwise return error object from response body
			results.data = results.response.status == 404 ? {error_code: '404', error:'not found'} : results.response.body;

		}
		return results;
	}
	catch(results) {
		results.success = undefined;
		results.data = results.error;
		return results;
	}
}


function httpRequest(url, httpOptions) {

	httpOptions.payload = ( typeof httpOptions.payload == 'object' ) ? JSON.stringify(httpOptions.payload) : httpOptions.payload.toString();
	let promise = new Promise ( (resolve, reject) => {
		http.fetchUrl(url, httpOptions, (error, meta, body) => {

			let results = {request: {url: url, meta: httpOptions}, response: (meta ? meta : {}) };
			if (error) {
				results.error = error;
				reject(results);
	
			} else {
				try {
					results.response.body = JSON.parse(body.toString());
				}
				catch(error) {
					results.response.body = {bodyAsString: body.toString()};
				}
				resolve(results);
			};
		
		});
		
	});
	return promise;
}


function asCurl(url, httpOptions){

	let curl = `curl -X ${httpOptions.method}`;
	curl += ` \\\n${url}`
	for ( let i in httpOptions.headers ){
		curl += ` \\\n-H '${i}: ${httpOptions.headers[i]}'`
	}
	curl += ( httpOptions.payload == '' ) ? '' : ` \\\n-d ${httpOptions.payload}`;

	return curl;
}

module.exports.tryRequest = tryRequest;
module.exports.request = httpRequest;
