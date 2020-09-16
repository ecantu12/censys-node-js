

module.exports = function(){

	const CENSYS_API_ID = process.env.CENSYS_API_ID;
	const CENSYS_API_SECRET = process.env.CENSYS_API_SECRET;

	const credentialMessage = `
Your API credentials weren't found. Look in your Censys account to retrieve them:

    https://censys.io/account/api

Then export your account credentials like this:

    export CENSYS_API_ID='your_censys_api_id'
    export CENSYS_API_SECRET='your_censys_api_secret'

If you don't have an account, you can sign up for a free one here:

    https://censys.io/register

`
	if ( CENSYS_API_ID == undefined || CENSYS_API_SECRET == undefined ) {
		console.log(credentialMessage);
		process.exit(1);
	}

	return {CENSYS_API_ID, CENSYS_API_SECRET};

}