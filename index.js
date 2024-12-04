import express from "express";

const app = express();

const port = 4000;

// app.get("/", (req, res) => {
//   res.send("Hello from saurabh");
// });

// app.get("/ginger-tea", (req, res) => {
//   res.send("What ginger tea would you like to prefer");
// });

// app.get("/twitter", (req, res) => {
//   res.send("bleaksaurabh");
// });

app.use(express.json());

let teaData = [];
let nextId = 1;

// ADD A NEW TEA
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// GET ALL TEA
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// GET A TEA WITH ID
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

// UPDATE TEA

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found for updation");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.send(200).send(tea);
});

// DELETE TEA

app.delete("/teas/:id", (req, res) => {
  console.log("delete");
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  return res.status(204).send("deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
