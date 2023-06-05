import express from "express";
import mysql from "mysql";
import cors from "cors"

const app = express();





const db = mysql.createConnection(

    {
        host: "localhost",
        user: "root",
        password: "password",
        database: "hotel"
    }
)

app.use(express.json())

app.use(cors());

//login

app.post('/', (req, res) => {
    const user = req.body.user;
    const password = req.body.password;

    db.query("SELECT * FROM login WHERE user = ? AND password = ?", [user, password], (err, result) => {
        if (err) {
            return res.json(err)
        }
        if (result.length > 0) {
            return res.json(result)
        } else { return { message: "Wrong username/password comination!" } }
    }
    )
})



//database tekla

app.get("/teklaPalace", (req, res) => {
    const q = 'SELECT * FROM hotel.tekla;'
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json(data)
    })
})


app.post("/teklaPalace", (req, res) => {
    const q = 'INSERT INTO tekla (`type`,`user`,`amount`,`currency`,`comment`,`date`) VALUES (?)';

    const values = [
        req.body.type,
        req.body.user,
        req.body.amount,
        req.body.currency,
        req.body.comment,
        req.body.date,
    ]


    db.query(q, [values], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json("book has been added")
    })
})



app.delete("/teklaPalace/:id", (req, res) => {
    const bookId = req.params.id
    const q = 'DELETE FROM tekla WHERE id=?'
    db.query(q, [bookId], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json("book has been deleted")
    })
})

// database urban

app.get("/urban", (req, res) => {
    const q = 'SELECT * FROM hotel.urban;'
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json(data)
    })
})


app.post("/urban", (req, res) => {
    const q = 'INSERT INTO urban (`type`,`user`,`amount`,`currency`,`comment`,`date`) VALUES (?)';

    const values = [
        req.body.type,
        req.body.user,
        req.body.amount,
        req.body.currency,
        req.body.comment,
        req.body.date,
    ]


    db.query(q, [values], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json("book has been added")
    })
})



app.delete("/urban/:id", (req, res) => {
    const bookId = req.params.id
    const q = 'DELETE FROM urban WHERE id=?'
    db.query(q, [bookId], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json("book has been deleted")
    })
})




app.listen(8800, () => {
    console.log("connected2")
})