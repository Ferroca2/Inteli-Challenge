# Crypto Brief - AI Powered NEWS


## Overview

CryptoBrief is a digital platform aimed at optimizing and refining the acquisition of specialized information and news about tokenomics and crypto in general, in a transparent and distributed manner. Its purpose is to provide a source of informational assets that harmonize conciseness and high refinement.

## Technologies Used
* Typescript and VUE.js for the front-end
* Google Cloud Functions for web scraping and using GPT in OpenAI
* Headless Hathor Wallet to make API calls for interactions with Hathor Testnet, mintind tokens, sending transactions and other features.
* Hathor blockchain - a choose mainly for zero gas and high scalability for our use-case.
* Used standardized Hathor Custom-Made Tokens (NWC - NEWSCOIN) 
* Node.js for the back-end
* GPT API for resuming articles

## Features
* Find and Resume huge collections of texts into concise and relevant pieces for crypto usage
* Usage of Headless Harthon Wallet for distributing assets as reputation tokens into Harthon testnet with zero gas usage.

## Flowchart
This is how the application works.
1. Our front-end connects to Google Cloud after webscraping some important links and get their content. With this, an AI is able to summarize the oracles into byte size pieces of text (with some calls to OpenAI API) that comes back to our front end into our main page.

2. This is our NEWSCOINS token:

![logo token NEWSCoin fundo preto](https://user-images.githubusercontent.com/101767386/236680007-9494a3cc-95d1-4854-9d27-c83dc1532e70.png)



3. To use the Hathor blockchain, we have to set up a back-end with specific routes for Headless Harthon Wallet and make some API calls usnig some logics in our own frameworks (all using NodeJS). With this, it is possible to mint tokens directly for the final owner (wich will be one of the analysts).

4. Take a look on this Flowchart representation:

![diagrama de blocos](https://user-images.githubusercontent.com/101767386/236679928-9a295b56-e9da-480f-8cd1-18da97119217.jpg)



## Getting Started
## Requirements
Run headless Hathor Wallet using:
use this link first 
1. npm install
2.Set config.js file in src folder
3. npm start
### Front-end 
Our front usesthe firebase emulators for running cloud functions and a database locally.For using firebase you have to install the firebase CLI using the command:  npm install -g firebase-tools
After that, set your .env file inside the functions folder to use openai(OPENAI_API_KEY)  and follow this commands to run the app:
1. npm run firebase
2. npm run client:dev
This commands have to be run in different terminals

## Usage
### User Interface
1. When you load the page, you'll see some notices that was resumed by AI in the main page.
2. You can also go to some sub-pages, as events or analysts.
3. In the events section, you can see some important events related to the future of crypto world that the analysts can post.
4. In the analysts page, you can vote in you favorite analyst and give him a token that represents his reputation in our platform. Note: the token isn't given by the user and don't cost anything to be minted for the lucky analyst!

## Team:

[DannxC](https://github.com/DannxC)

[LFRezende](https://github.com/LFRezende)

[Ferroca2](https://github.com/Ferroca2)
