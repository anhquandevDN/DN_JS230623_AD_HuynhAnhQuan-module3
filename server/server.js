const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todo.router');

const app = express();

const PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/v1', todoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
