import {pool} from '../db.js'

export const getCareers = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM careers')
        res.json(rows)
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}