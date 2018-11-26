# Lipslut

Lipslut uses Gatsby.

For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/).

## Install

Make sure that you have the Gatsby CLI program installed:

```sh
npm install --global gatsby-cli
```

Then clone the repo :

```sh
git clone https://github.com/NEsfandiari/lipslut2.0.git
```

Then you can run it by:

```sh
cd lipslut2.0
gatsby develop
```

## Lambda Functions

Make sure that you have the Netlify CLI installed:

```sh
npm install netlify-cli -g
```

To build the current lambda functions:

```sh
npm run build:lambda
```

To run a local instance of the lambda functions:

```sh
npm run lambda-serve
```

## Environment Variables

1. Create a file called .env.development
2. Add this file to your .gitignore
3. Go to the Netlify Dashboard for elated-carson-131bb5. Under the settings tab in the "Build and Deploy" section
4. Copy and Paste every single environment variable listed there. However, for the GATSBY_NODE_ENV set this variable to "development"
