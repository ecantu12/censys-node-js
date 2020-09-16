# censys-node-js

Node JS libraries for the Censys API's!


## Overview

This repository provides examples and wrapper functions you can use to access to Censys API's. The examples show how you can create your own scripts and build workflows for your systems using Node JS and the Censys data and Attack Surface Management API's.

API keys are required and can be retrieved from your Censys account. If you don't have an account, please contact Censys:

    https://censys.io/contact-sales


Node JS v12 and one module (fetch) is required to use the wrappers and run the examples.


## Installation and Usage

After you clone or download this repository, you'll need to install the fetch module.

Start by changing to the repository directory:

    cd censys-node-js


Install the fetch module:

    npm install fetch --save 


Now, the examples are ready to use. To call the logbook API, you would do this:

	export CENSYS_SAAS_API_KEY='your_censys_saas_api_id'
    cd censys-node-js/examples
    node censys-data/accountStatus.js


The account status in the :

    export CENSYS_API_ID='your_censys_api_id'
    export CENSYS_API_SECRET='your_censys_api_secret'
    node censys-asm/logbook.js

    
There are multiple examples for you to explore and try out.