const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let issues = [
	{ id: 1, title: "Issue 1", description: "First issue" },
	{ id: 2, title: "Issue 2", description: "Second issue" },
];

app.post("/issues", (req, res) => {
	const newIssue = req.body;
	issues.push(newIssue);
	console.log("Created:", newIssue);
	res.status(201).json(newIssue);
});

app.get("/issues", (req, res) => {
	res.json(issues);
});

app.put("/issues/:id", (req, res) => {
	const { id } = req.params;
	const updatedIssue = req.body;
	issues = issues.map((issue) => (issue.id == id ? updatedIssue : issue));
	console.log("Updated:", updatedIssue);
	res.json(updatedIssue);
});

app.delete("/issues/:id", (req, res) => {
	const { id } = req.params;
	issues = issues.filter((issue) => issue.id != id);
	console.log("Deleted:", id);
	res.status(204).send();
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
