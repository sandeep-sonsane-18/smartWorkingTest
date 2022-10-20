PHP version: 7.4.20
Laravel Version: 5.4.36

Vue folder: swfe
Laravel folder: smartWorkingBE



Steps to follow for project setup:

1) Clone repository from git: https://github.com/sandeep-sonsane-18/smartWorkingTest.git

2) For starting vue front-end: 
	2.1) open folder swfe
	2.2) run npm run serve

3) For starting back-end:
	3.1) open folder smartWorkingBE
	3.2) run php(or php path) artisan migrate (for creating tables in DB)
	3.3) run php(or php path) artisan serve
	**NOTE**
	if ip and port after artisan serve come different than 127.0.0.1:8000
	Then replace 'http://localhost:8000' with 'http://{ your ip }:{ your port }' in code in below mentioned file

	1) swfe/src/App.vue
	2) swfe/src/components/PropertyListing.vue
	3) swfe/src/components/CreatePropertyData.vue

Steps to follow for setting up data for 1st task:

1) in Browser or postman run below mention url for data collection
	url: http://localhost:8000/api/fetchPropertiesFromApi
	**NOTE**
	Change IP and PORT according to the system

	this will gather the data from 3rd Party API and insert or update accordingly

2) After gathering data, one can perform create, update, delete, read operations over project.