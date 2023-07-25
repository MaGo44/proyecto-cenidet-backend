import {pool} from '../db.js'

export const getStudentProjects = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM student_project')
        res.json(rows)
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const getStudentProject = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM student_info WHERE student_control_num = ?', [req.params.id])

        if(rows.length<=0)return res.status(404).json({
            message:'Student Info not found'
        })
        res.json(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const postStudentInfo = async (req,res) => {
    const {student_control_num, student_name, student_last_name, student_second_last_name, student_email, student_second_email, student_curp, student_sex_id, student_phone, student_cel_phone, student_career_id, student_avg, student_credits, student_studies_code, student_semester} = req.body
    try{
        const [rows]= await pool.query('INSERT INTO student_info(student_control_num, student_name, student_last_name, student_second_last_name, student_email, student_second_email, student_curp, student_sex_id, student_phone, student_cel_phone, student_career_id, student_avg, student_credits, student_studies_code, student_semester) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [student_control_num, student_name, student_last_name, student_second_last_name, student_email, student_second_email, student_curp, student_sex_id, student_phone, student_cel_phone, student_career_id, student_avg, student_credits, student_studies_code, student_semester])
        res.send({
            student_control_num, 
            student_name, 
            student_last_name, 
            student_second_last_name, 
            student_email, 
            student_second_email, 
            student_curp, 
            student_sex_id, 
            student_phone, 
            student_cel_phone, 
            student_career_id, 
            student_avg, 
            student_credits, 
            student_studies_code, 
            student_semester
        })
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const putStudentInfo = async (req,res) => {
    const {id}=req.params
        const {student_name, student_last_name, student_second_last_name, student_email, student_second_email, student_curp, student_sex_id, student_phone, student_cel_phone, student_career_id, student_avg, student_credits, student_studies_code, student_semester} = req.body

        console.log(id)
    try{

        const [result] = await pool.query('UPDATE student_info SET student_name = IFNULL(?,student_name), student_last_name = IFNULL(?,student_last_name), student_second_last_name = IFNULL(?,student_second_last_name), student_email = IFNULL(?,student_email), student_second_email = IFNULL(?,student_second_email), student_curp = IFNULL(?,student_curp), student_sex_id = IFNULL(?,student_sex_id), student_phone = IFNULL(?,student_phone), student_cel_phone = IFNULL(?,student_cel_phone), student_career_id = IFNULL(?,student_career_id), student_avg = IFNULL(?,student_avg), student_credits = IFNULL(?,student_credits), student_studies_code = IFNULL(?,student_studies_code), student_semester = IFNULL(?,student_semester) WHERE student_control_num = ?',
        [student_name, student_last_name, student_second_last_name, student_email, student_second_email, student_curp, student_sex_id, student_phone, student_cel_phone, student_career_id, student_avg, student_credits, student_studies_code, student_semester, id])

        if(result.affectedRows===0) return res.status(404).json({
            message:'Student Info not found'
        })

        const [rows] = await pool.query('SELECT * FROM student_info WHERE student_control_num = ?',[id])
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