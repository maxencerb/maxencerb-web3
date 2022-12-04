# Web3 implementations

This is a trial at Web3 implementations for any type of interactions.

There is a live version of this webapp on [https://web3.maxencerb.com](https://web3.maxencerb.com).

## Context

A lot of my front-end work almost always falls under private repos. I wanted to create a repo with some work to try and showcase some web3 techs / frameworks.

## Dependencies

- This is a Next 13 app (without the experimental app/ directory),
- For the web3 interactions, I used Rainbowkit (with wagmi and and ethers),
- I use SWR for data fetching management,
- Tailwind and framer motion for the UI

## Environment variables

There is only a single variable to run the project:

- NEXT_PUBLIC_ALCHEMY_ID: your alchemy key (must be a polygon key)

## Running the project

- Clone the repo
- Install the dependencies with `yarn`
- Create a `.env.local` file and add your alchemy key
- Run the project with `yarn dev`

Alternatively, you can run the project with `yarn start` to run the project in production mode after building it with `yarn build`.

*PS: You can use any other package manager if you want, but I prefer yarn.*
