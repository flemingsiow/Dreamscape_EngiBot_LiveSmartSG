# EngiBot

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Website](https://img.shields.io/badge/View-Website-blue)](http://acra-app-client-dev.us-east-1.elasticbeanstalk.com/)

We are Team Dreamscape, a group of Singapore Polytechnic students that took part in the Live Smart Singapore Hackathon hosted by ACRA and AWS. The following is
our team's proposed idea to help hasten and enhance the current business process in Singapore.

## Contents

1. [Short description](#short-description)
1. [The Architecture](#the-architecture)
1. [Getting Started](#getting-started)
1. [Deploying the Web Application](#deploying-the-web-application)
1. [Live demo](#live-demo)
1. [Built with](#built-with)
1. [Versioning](#versioning)
1. [Authors](#authors)
1. [License](#license)

## Short Description

### What's the Problem?

For many years Singapore has been considered by the business world to be a safe, thriving and efficient entry point into the Asian Market. However, this also
means Singapore has to ready to cope with the high influx of customers as well as be fully prepared in times of disruption. 

ACRA, is a statutory board under the Ministry of Finance. It registers and regulate businesses, sole proprietorships, partnerships, public accountants, filing agents etc.
It's goal is to provide an open corporate registry so that the public can obtain information about the business and the people running it.


### How can technology help?

In order for ACRA to develop into an efficient and advanced business hub, it must have a sophisticated socio-economic framework to better support their customers. Smart Nation can be utilised to harnessed technology to the fullest to improve the satisfication of customers, create more opportunities, and build stronger communities between ACRA and its customers.


### Our Solution

EngiBot is a AI rule based chatbot API that adds on to the existing ACRA chatbot. It includes but not limited to automating the "Requesting" process for simple waiver appeals, responding to customer's needs and interests, as well as automating the decision making process for tasks that handles with generic information.


## The Architecture

![EngiBot Architecture](https://github.com/flemingsiow/Dreamscape_EngiBot_LiveSmartSG/blob/master/EngiBot%20Architecture.jpg)


## Getting Started

These instructions will get you a copy of our prototype up and deploying the project on a live system.

### Installing Node.js

You will need to install Node.js to run our product. If you don't have a preference, get the latest version supported by Elastic Beanstalk.

Download Node.js at [https://nodejs.org/en/](https://nodejs.org/en/).


### Setting Up Our Product

Open up your Command Prompt or Terminal. 

cd into the "client" folder and npm install, this will install all the necessary node packages.

```shell
cd [path_name]\client
npm install
```

And repeat it for the "server" folder

```shell
cd [path_name]\server 
npm install
```

Now, you are ready to deploy the web application with AWS Elastic Beanstalk.

## Deploying the Web Application
We will be deploying the application on a live server.

### Live Server

Still in the same "server" directory as before, now with AWS Elastic Beanstalk you need to deploy and host your backend server.

```shell
eb deploy
```

Once it is finished, again, cd to your "client" folder and repeat the procedure to host your frontend server.
```shell
cd [path_name]\client
eb deploy
```


## Live demo

The running frontend dashboard can be found here: [http://acra-app-client-dev.us-east-1.elasticbeanstalk.com](http://acra-app-client-dev.us-east-1.elasticbeanstalk.com)

## Built with

* [AWS API Gateway](https://aws.amazon.com/api-gateway/) - To host our product as a serverless application
* [AWS Lambda](https://aws.amazon.com/lambda/) - The compute platform for handing logic
* [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) - To host and deploy our product as a server based web application
* [AWS Textract](https://aws.amazon.com/textract/) - Text-reading/recognition tool to extract words from images
* [AWS Lex](https://aws.amazon.com/lex/) - To create our AI rule based chabot, EngiBot
* [AWS S3](https://aws.amazon.com/s3/) - To store images and text files
* [AWS RDS](https://aws.amazon.com/rds/) - Our cloud-based MySQL relational database
* [AWS DynamoDB](https://aws.amazon.com/dynamodb/) - To generate charts based on data stored
* [AWS SES](https://aws.amazon.com/ses/) - To send an email notification to customers and ACRA officers
* [AWS SNS](https://aws.amazon.com/sns/) - To send a SMS notification to customers and ACRA officers


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Fleming Siow** - *Initial work* - [flemingsiow](https://github.com/flemingsiow)
* **Woo Yan Seun** 
* **Lim Hong Shun**

## License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details

