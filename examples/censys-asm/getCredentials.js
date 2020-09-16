

module.exports = function(){

	const CENSYS_SAAS_API_KEY = process.env.CENSYS_SAAS_API_KEY;

	const credentialMessage = `
Your Censys SaaS API key wasn't found. You can retrieve your API key here:

    https://app.censys.io/admin

Then export your Censys SaaS API key like this:

    export CENSYS_SAAS_API_KEY='your_censys_saas_api_id'

If you don't have an account, please contact Censys:

    https://censys.io/contact-sales

`
	if ( CENSYS_SAAS_API_KEY == undefined ) {
		console.log(credentialMessage);
		process.exit(1);
	}

	return {CENSYS_SAAS_API_KEY: CENSYS_SAAS_API_KEY};

}