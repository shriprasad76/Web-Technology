const express = require('express');
const app = express();
const port = 3000;  

app.use((req, res, next) => {
    console.log('Middleware execute newDate: ', new Date());
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});




/*activities:
1.what is middleware function?
when we use it in company level?
what are the types of middleware?
write 2/3 examples of middleware functions.
*/