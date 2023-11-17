# payload-dashboard-ui

This is a Dashboard UI project mainly constituted by a React App that fetches data from [payaload-dashboard-api](https://github.com/University-of-Aveiro-Rocketry-Team/payload-dashboard-api). The project can be deployed in development mode or orchestrated by Docker Compose using the provided docker-compose.yml file.  
<br>

## Prerequisites
Before you begin, ensure that you have the following installed on your system:

[Node.js v18.x or Newer](https://nodejs.org/en/download/package-manager#debian-and-ubuntu-based-linux-distributions)  
[NPM v6.x or Newer](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
[Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)  
[Docker](https://docs.docker.com/engine/install/)  
[Docker Compose](https://docs.docker.com/compose/install/)  
<br>

## Getting Started
To get started, first clone this repository and navigate to the project directory.

```bash
git clone git@github.com:University-of-Aveiro-Rocketry-Team/payload-dashboard-ui.git
cd payload-dashboard-ui
```
<br>

## Development mode
### Instal dependencies
To install the dependencies for this project, use the following command:
```
yarn install
```
### Run in development mode
To run the project, use the following command:
```
yarn dev
```
### Build
To build the project to a static site, use the following command:
```
yarn build
```
This will create a `build` directory with the static site which can be served using any static site server.  
<br>

## Docker Compose
### Build and Run
To build and run the Docker Compose project, use the following command:

```
docker-compose up --build
```
This will build the images (if not already built) and start the containers for all services defined in the docker-compose.yml file.

### Stop and Remove Containers
To stop and remove the containers, use the following command:

```
docker-compose down
```
<br>

## Services
### Ports and URLs
Here is a list of the services, their ports, and URLs:

1. **React Application**
   - Port: 3030
   - URL: http://localhost:3030  
<br>

## Demo
- [Dashboard Page](https://minimal-kit-react.vercel.app/)
- [Map Page](https://minimal-kit-react.vercel.app/products)
- [Data Page](https://minimal-kit-react.vercel.app/blog)
- [Not Found Page](https://minimal-kit-react.vercel.app/404)  
<br>

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
