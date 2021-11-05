const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const liks = [];

  const project = {id: uuid(),title,url,techs,liks}

  repositories.push(project);

  response.json(project);



  response.status(200).json('ok')
});

app.put("/repositories/:id", (request, response) => {

  const {id} = request.params;
  const {title, url, techs} = request.body;
  
  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id);
 
  if(repositoriesIndex < 0 ){
    return response.status(400).json({error:'Project not found.'});
  };
  
  const repositorie = {id,title,url,techs}

    repositories[repositoriesIndex] = repositorie;
    return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  
  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id);
 
  if(repositoriesIndex < 0 ){
    return response.status(400).json({error:'Project not found.'});
  };

    repositories.splice(repositoriesIndex,1);

    return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  
  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id);
 
  if(repositoriesIndex < 0 ){
    return response.status(400).json({error:'Project not found.'});
  };
    const { liks } = repositories[repositoriesIndex];
    liks.push('like');

    response.json(liks.length);
});

module.exports = app;
