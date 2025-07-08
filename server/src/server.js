import { app } from './app.js'
import { connectDatabase } from './config/db.js'

const PORT = process.env.PORT || 8000

connectDatabase()
    .then(() =>
        app.listen(PORT, () =>
            console.log('Connection Established')
        )
    );