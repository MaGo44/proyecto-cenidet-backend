import {pool} from '../db.js'

export const getScholarGrades = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM scholar_grade')
        res.json(rows)
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}