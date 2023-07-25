import express from "express"
import {pool} from './db.js'
import studentInfoRoutes from './routes/student_info.routes.js'
import careersRoutes from './routes/careers.routes.js'
import gendersRoutes from './routes/genders.routes.js'
import periodsRoutes from './routes/periods.routes.js'
import scholarGradeRoutes from './routes/scholar_grade.routes.js'
import internalAdviserInfoRoutes from './routes/internal_adviser_info.routes.js'
import companyInfoRoutes from './routes/company_info.routes.js'
import ping from "./routes/index.routes.js"

const app =express()

// app.get('/ping', async (req, res) => {
//     const [result] = await pool.query('SELECT 1 + 1 AS RESULT')
//     res.json(result)
// });

app.use(express.json())

app.use('/api',studentInfoRoutes)
app.use('/api',careersRoutes)
app.use('/api',gendersRoutes)
app.use('/api',periodsRoutes)
app.use('/api',scholarGradeRoutes)
app.use('/api',internalAdviserInfoRoutes)
app.use('/api',companyInfoRoutes)
app.use(ping)

app.use((req,res,next)=>{
    res.status(404).json({
        message:'Endpoint not found'
    })
})

export default app;