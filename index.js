const express = require("express")
const cors=require("cors")
const { connection, usermodel } = require("./db")
const app = express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.json("welcome")
})
app.post("/addbook", async (req, res) => {
    try {
        const { Title, Author, Genre, Description, Price } = req.body
        let obj = { Title, Author, Genre, Description, Price }
        let user = new usermodel(obj)
        await user.save()
        res.json("user added")
    } catch (error) {
        res.json(error)
    }
})
app.get("/retrievebooks", async (req, res) => {
    try {
        let data = await usermodel.find()
        res.json(data)
    } catch (error) {

        res.json(error)
    }
})
app.delete("/deletebook/:id", async (req, res) => {
    try {
        let id = req.params.id
        console.log(id)
        await usermodel.findByIdAndDelete({ _id: id })
        let data = await usermodel.find()
        res.json(data)
    } catch (error) {

        res.json(error)
    }
})
app.get("/filterbook/:value", async (req, res) => {
    try {
        let val = req.params.value
        let data = await usermodel.find({ Genre: val })
        if (data) res.json(data)
        else res.json("Not found")
    } catch (error) {
        res.json(error)
    }
})

app.get("/sortbook/:value", async (req, res) => {
    try {
        let val = req.params.value
        if (val == "desc") {

            let data = await usermodel.aggregate([
                { $sort: { Price: -1 } }
            ]);
            res.json(data)
        } else {

            let data = await usermodel.aggregate([
                { $sort: { Price: 1 } }
            ]);
            res.json(data)

        }
    } catch (error) {

        res.json(error)
    }
})

app.listen(4500, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error);
    }
    console.log("server running");
})