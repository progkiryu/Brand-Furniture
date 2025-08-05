# ThreadLine

## Summary
ThreadLine is a desktop application built for furniture company Brand Furniture, operating in the confines of Sydney, Australia. The application's main functioning lies within its ability to streamline and organise jobs to foster productivity, which includes a variety of filtering and sorting.

## Technical Overview
ThreadLine was built using the MERN tech stack (MongoDB, Express, React, Node) and an additional dependency of Electron to export the code as a desktop interface. All of the code is written in Typescript to allow for stricter syntax rules and lessening logic disrepancies.

With MongoDB, a REST API was established to fetch and generate calls from the React front-end components to the Express server.

### Development:
To run the application in development mode, run:
```
npm run dev
```

### Deployment:
To build the application, run:
```
npm run dist:win (for Windows users)
npm run dist:mac (for Macintosh users)
npm run dist:linux (for Linux users)
```
This creates the 'dist' folders for both front-end (React) and back-end (Node and Electron).
