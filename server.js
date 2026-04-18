const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

process.env.MONGO_URI =
  "mongodb://rishikakanaujiya51_db_user:upeMYdZ44os79Adg@ac-oyx60em-shard-00-00.ylenrxf.mongodb.net:27017,ac-oyx60em-shard-00-01.ylenrxf.mongodb.net:27017,ac-oyx60em-shard-00-02.ylenrxf.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-115mnt-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  github: String,
});

const Project = mongoose.model("Project", projectSchema);

app.get("/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post("/projects", async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.json(newProject);
});

app.put("/projects/:id", async (req, res) => {
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.json(updatedProject);
});

app.delete("/projects/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
