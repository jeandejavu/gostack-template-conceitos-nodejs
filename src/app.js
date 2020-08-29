const express = require("express");
const cors = require("cors");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", ({ body: { url, title, techs } }, response) => {
  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0,
  };
  repositories.push(repository);

  return response.json(repository);
});

app.put(
  "/repositories/:id",
  ({ params: { id }, body: { url, title, techs } }, response) => {
    const index = repositories.findIndex((repository) => repository.id === id);
    if (index > -1) {
      repositories[index] = {
        ...repositories[index],
        url,
        title,
        techs,
      };
      return response.json(repositories[index]);
    }

    return response.status(400).send();
  }
);

app.delete("/repositories/:id", ({ params: { id } }, response) => {
  const index = repositories.findIndex((repository) => repository.id === id);
  if (index > -1) {
    repositories.splice(index, 1);
    return response.status(204).send();
  }

  return response.status(400).send();
});

app.post("/repositories/:id/like", ({ params: { id } }, response) => {
  const index = repositories.findIndex((repository) => repository.id === id);
  if (index > -1) {
    repositories[index] = {
      ...repositories[index],
      likes: repositories[index].likes + 1,
    };
    return response.json(repositories[index]);
  }

  return response.status(400).send();
});

module.exports = app;
