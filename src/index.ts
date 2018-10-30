require('dotenv').config({});
import app from './App';

const port = process.env.PORT || 3000;

app.listen(port, err => err ? console.log(err) : console.log(`Server is listening on port ${port}`));