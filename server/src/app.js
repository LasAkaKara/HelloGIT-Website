import Express from 'express'
import dotenv from 'dotenv'
import postRoutes from './routes/post.routes.js'
import eventRoutes from './routes/event.routes.js'
import projectRoutes from './routes/project.routes.js'
import teamRoutes from './routes/team.routes.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config()
export const app = Express()
app.use(Express.json())

app.get('/', (req, res) => {
    res.send("GCBS HomePage!")
    console.log("Accessed Successfully!")
})

app.use('/api/posts', postRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/teams', teamRoutes)
app.use('/api/auth', authRoutes)