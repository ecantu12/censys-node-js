// CensysDataApi.js


const censysHttp = require('./censysHttp.js');

module.exports = function(params) {

		params = params ? params : {};
		const CENSYS_API_ID = params.CENSYS_API_ID ? params.CENSYS_API_ID : '';
		const CENSYS_API_SECRET = params.CENSYS_API_SECRET ? params.CENSYS_API_SECRET : '';
		const catchErrors = params.catchErrors ? params.catchErrors : true;
		const rootEndpoint = params.rootEndpoint ? params.rootEndpoint : 'https://censys.io/api/v1';

		const httpsRequest = catchErrors ? censysHttp.tryRequest : censysHttp.request;

		let defaultHeaders = {
						'content-type': 'application/json',
						'authorization': '',
						'cache-control': 'no-cache',
						'user-agent': 'censys-cli/1.0'
					}

		// compute Authorization header from id and secret
		const buf = Buffer.from(`${CENSYS_API_ID}:${CENSYS_API_SECRET}`, 'ascii');
		defaultHeaders.authorization = `Basic ${buf.toString('base64')}`;

		this.search = function (index, payload = '') {
			return	httpsRequest(`${rootEndpoint}/search/${index}`, {
						method: 'POST',
						headers: {...defaultHeaders},
						payload: payload
					});
		}
			

		this.view = function (index, id) {
			return	httpsRequest(`${rootEndpoint}/view/${index}/${id}`, {
						method: 'GET',
						headers: {...defaultHeaders},
						payload: ''
					});
		}
			
	
		this.report = function (index, payload = '') {
			return	httpsRequest(`${rootEndpoint}/report/${index}`, {
						method: 'POST',
						headers: {...defaultHeaders},
						payload: payload
					});
		}
			
	
		this.series = this.rawData = {};
			this.series.get = function () {
				return	httpsRequest(`${rootEndpoint}/data`, {
							method: 'GET',
							headers: {...defaultHeaders},
							payload: ''
						});
			}
			this.series.view = function (series) {
				return	httpsRequest(`${rootEndpoint}/data/${series}`, {
							method: 'GET',
							headers: {...defaultHeaders},
							payload: ''
						});
			}
			this.series.result = function (series, result) {
				return	httpsRequest(`${rootEndpoint}/data/${series}/${result}`, {
							method: 'GET',
							headers: {...defaultHeaders},
							payload: ''
						});
			}
				
	
		this.account = function () {
			return	httpsRequest(`${rootEndpoint}/account`, {
						method: 'GET',
						headers: {...defaultHeaders},
						payload: ''
					});
		}
}
			











