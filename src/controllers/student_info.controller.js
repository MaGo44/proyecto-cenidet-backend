import {pool} from '../db.js'

export const getStudentsInfo = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM student_info')
        res.json(rows)
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const getStudentInfo = async (req,res) => {
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
export const getStudentsInfoAdmin = async (req,res) => {
    try{
        const [rows] = await pool.query(`
        SELECT
        student_info.*, student_project.*, 
        company_info.company_name, 
        careers.*, 
        periods.*, 
        student_profile_pics.*,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'document_id', student_documents.document_id,
                'document_desc', student_documents.document_desc
                -- Agrega otras columnas de student_document según sea necesario
            )
        ) AS Documents
        FROM student_info
        LEFT JOIN student_project ON student_info.student_id = student_project.student_id
        LEFT JOIN student_documents ON student_info.student_id = student_documents.student_id
        LEFT JOIN company_info ON student_project.project_company_id = company_info.company_id
        LEFT JOIN careers ON student_info.student_career_id = careers.career_id
        LEFT JOIN periods ON student_project.project_period = periods.period_id
        LEFT JOIN student_profile_pics ON student_info.student_id = student_profile_pics.student_id
        GROUP BY student_info.student_id, student_project.project_id, student_profile_pics.profile_pic_id;`);
        
        if(rows.length<=0)return res.status(404).json({
            message:'Student Info not found'
        })
        console.log(rows)
        res.json(rows)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const postStudentInfo = async (req,res) => {
    const {student_control_num, student_name, student_last_name, student_second_last_name, student_email, student_second_email, student_curp, student_sex_id, student_phone, student_cel_phone, student_career_id, student_avg, student_credits, student_studies_code, student_semester} = req.body
    try{
        const [result]= await pool.query('INSERT INTO student_info(student_control_num, student_name, student_last_name, student_second_last_name, student_email, student_second_email, student_curp, student_sex_id, student_phone, student_cel_phone, student_career_id, student_avg, student_credits, student_studies_code, student_semester) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [student_control_num, student_name, student_last_name, student_second_last_name, student_email, student_second_email, student_curp, student_sex_id, student_phone, student_cel_phone, student_career_id, student_avg, student_credits, student_studies_code, student_semester])
        const insertedId = result.insertId;
        const insertedControl = result.student_control_num
        console.log(insertedId, insertedControl)
        res.send({
            student_id:insertedId,
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
        console.log(res)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            message:'Something goes wrong', 
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
export const deleteStudentInfo = async (req,res) => {
    try{
        const [result] = await pool.query('DELETE FROM student_info WHERE student_id = ?', [req.params.id])

        if(result.affectedRows <= 0)return res.status(404).json({
            message:'Student Info not found'
        })
        res.sendStatus(204)
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}