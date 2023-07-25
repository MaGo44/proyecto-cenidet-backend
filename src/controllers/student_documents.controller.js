import {pool} from '../db.js'

export const getStudentsDocuments = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM student_documents')
        res.json(rows)
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const getStudentDocument = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM student_documents WHERE document_id = ?', [req.params.id])

        if(rows.length<=0)return res.status(404).json({
            message:'Student Document not found'
        })
        res.json(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const postStudentDocument = async (req,res) => {
    const {student_id, document_type_id, document_file_name, alias, document_desc} = req.body
    try{
        const [rows]= await pool.query('INSERT INTO student_documents(document_id, student_id, document_type_id, document_file_name, alias, document_desc) VALUES (?,?,?,?,?,?)',
        [student_id, document_type_id, document_file_name, alias, document_desc])
        res.send({
            student_id, 
            document_type_id, 
            document_file_name, 
            alias, 
            document_desc
        })
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const putStudentDocument = async (req,res) => {
    const {id}=req.params
        const {student_id, document_type_id, document_file_name, alias} = req.body

        console.log(id)
    try{

        const [result] = await pool.query('UPDATE student_documents SET student_id = IFNULL(?,student_id), document_type_id = IFNULL(?,document_type_id), document_file_name = IFNULL(?,document_file_name), alias = IFNULL(?,alias) WHERE document_id = ?',
        [student_id, document_type_id, document_file_name, alias, document_desc, id])

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