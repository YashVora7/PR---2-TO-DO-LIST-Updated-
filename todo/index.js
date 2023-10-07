const express = require('express');
const { todo } = require('node:test');
const app = express();
app.use(express.json())

let initialTodo = [{ title: "HTML", isCompleted: true, id: 1 }, { title: "javascript", isCompleted: true, id: 2 }, { title: "React", isCompleted: false, id: 3 }]

app.get('/', (req, res) => {
    res.send('welcome to the todo api')
})
app.get('/todos', (req, res) => {
    res.send(initialTodo)
})

app.post("/addtodo", (req, res) => {
    const data = [
        { title: req.body.title, isCompleted: req.body.isCompleted, id: initialTodo.length + 1 }
    ]
    initialTodo.push(data)
    res.status(200).send(...data)
})

app.patch("/update/:id", (req, res) => {
    let { id } = req.params

    let updatedTodo = initialTodo.filter(update => update.id == id)

    updatedTodo[0].title = req.body.title
    updatedTodo[0].isCompleted = req.body.isCompleted

    res.send(...updatedTodo)
})

app.delete("/delete/:id", (req, res) => {
    let { id } = req.params

    let index = initialTodo.findIndex(index => index.id == id)
    let deletedTodo = initialTodo.splice(index, 1)[0]

    res.send({ deletedTodo, initialTodo })
})

app.get("/todo/:id", (req, res) => {
    let { id } = req.params;
    let data = initialTodo.find(item => item.id == id);
    if (data) {
        res.send(data);
    } else {
        res.status(404).send("Todo not found");
    }
});


app.get("/findbystatus", (req, res) => {
    let isCompleted = req.query.isCompleted

    if (isCompleted === "true") {
        let isCompletedTodo = initialTodo.filter(get => get.isCompleted === true)
        res.send(isCompletedTodo)
    }
    else if (isCompleted === "false") {
        let isNotCompletedTodo = initialTodo.filter(get => get.isCompleted === false)
        res.send(isNotCompletedTodo)
    }
    else {
        res.status(404).send("invalid")
    }
})


// const ages = [32, 33, 16, 40];

// let demo = ages.filter(checkAdult => checkAdult.age >= 18);

// // function checkAdult(age) {
// //   return age >= 18;
// // }

// console.log(demo);


app.listen(8090, () => {
    console.log("Port listening on 8090");
})