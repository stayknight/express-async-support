A hack of express to support async handler.
Slightly Modified from [express-async-errors](https://raw.githubusercontent.com/davidbanham/express-async-errors)

## Install
```bash
yarn add express-async-support
```

## Usage

```nodejs
const express = require('express')
require('express-async-support')
app = express()

// directly use async hanlder
app.get('/hello', async (req, res) => {
  throw new Error('oops!')
  res.send('hello!');
});

// errors thrown from handlers are passed to the error handler
app.use((err, req, res, next) => {
  res.status(500);
  res.json({ error: err.message });
  next(err);
});
```
