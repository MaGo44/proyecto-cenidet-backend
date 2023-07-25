import {pool} from '../db.js'

export const getInternalAdvisersInfo = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM internal_adviser_info')
        res.json(rows)
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const getInternalAdviserInfo = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM internal_adviser_info WHERE internal_adviser_id = ?', [req.params.id])

        if(rows.length<=0)return res.status(404).json({
            message:'Internal Adviser Info not found'
        })
        res.json(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const postInternalAdviserInfo = async (req,res) => {
    const {internal_adviser_id,internal_name, internal_last_name, internal_second_last_name, internal_sex_id, internal_scholar_grade, internal_phone, internal_cel_phone, internal_adscription_career, internal_email, internal_second_email} = req.body
    try{
        const [rows]= await pool.query('INSERT INTO internal_adviser_info(internal_adviser_id,internal_name, internal_last_name, internal_second_last_name, internal_sex_id, internal_scholar_grade, internal_phone, internal_cel_phone, internal_adscription_career, internal_email, internal_second_email) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [internal_adviser_id,internal_name, internal_last_name, internal_second_last_name, internal_sex_id, internal_scholar_grade, internal_phone, internal_cel_phone, internal_adscription_career, internal_email, internal_second_email])
        res.send({
            internal_adviser_id,
            internal_name, 
            internal_last_name, 
            internal_second_last_name, 
            internal_sex_id, 
            internal_scholar_grade, 
            internal_phone, 
            internal_cel_phone, 
            internal_adscription_career, 
            internal_email, 
            internal_second_email
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const putInternalAdviserInfo = async (req,res) => {
    const {id}=req.params
        const {internal_name, internal_last_name, internal_second_last_name, internal_sex_id, internal_scholar_grade, internal_phone, internal_cel_phone, internal_adscription_career, internal_email, internal_second_email} = req.body

        console.log(id)
    try{

        const [result] = await pool.query('UPDATE internal_adviser_info SET internal_name = IFNULL(?,internal_name), internal_last_name = IFNULL(?,internal_last_name), internal_second_last_name = IFNULL(?,internal_second_last_name), internal_sex_id = IFNULL(?,internal_sex_id), internal_scholar_grade = IFNULL(?,internal_scholar_grade), internal_phone = IFNULL(?,internal_phone), internal_cel_phone = IFNULL(?,internal_cel_phone), internal_adscription_career = IFNULL(?,internal_adscription_career), internal_email = IFNULL(?,internal_email), internal_second_email = IFNULL(?,internal_second_email) WHERE internal_adviser_id = ?',
        [internal_name, internal_last_name, internal_second_last_name, internal_sex_id, internal_scholar_grade, internal_phone, internal_cel_phone, internal_adscription_career, internal_email, internal_second_email,id])

        if(result.affectedRows===0) return res.status(404).json({
            message:'Student Info not found'
        })

        const [rows] = await pool.query('SELECT * FROM internal_adviser_info WHERE internal_adviser_id = ?',[id])
        res.json(rows[0])
        console.log(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const deleteStudentInfo = (req,res) => res.send('eliminando estudiantes')