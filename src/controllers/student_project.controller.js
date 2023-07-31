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
        const [rows] = await pool.query('SELECT * FROM student_project WHERE project_id = ?', [req.params.id])

        if(rows.length<=0)return res.status(404).json({
            message:'Student Project not found'
        })
        res.json(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const postStudentProject = async (req,res) => {
    const {student_id,  project_name, project_company_id, project_start_date, project_finish_date, project_position_name, project_area, project_external_adviser, project_internal_adviser_id, project_contract_status, project_period, project_objective_desc, project_problem_desc, project_results_desc, project_product_desc } = req.body
    try{
        const [rows]= await pool.query('INSERT INTO student_project(student_id,  project_name, project_company_id, project_start_date, project_finish_date, project_position_name, project_area, project_external_adviser, project_internal_adviser_id, project_contract_status, project_period, project_objective_desc, project_problem_desc, project_results_desc, project_product_desc) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [student_id,  project_name, project_company_id, project_start_date, project_finish_date, project_position_name, project_area, project_external_adviser, project_internal_adviser_id, project_contract_status, project_period, project_objective_desc, project_problem_desc, project_results_desc, project_product_desc])
        res.send({
            student_id,  
            project_name, 
            project_company_id, 
            project_start_date, 
            project_finish_date, 
            project_position_name, 
            project_area, 
            project_external_adviser, 
            project_internal_adviser_id, 
            project_contract_status, 
            project_period, 
            project_objective_desc, 
            project_problem_desc, 
            project_results_desc, 
            project_product_desc
        })
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const putStudentProject = async (req,res) => {
    const {id}=req.params
        const {student_id,  project_name, project_company_id, project_start_date, project_finish_date, project_position_name, project_area, project_external_adviser, project_internal_adviser_id, project_contract_status, project_period, project_objective_desc, project_problem_desc, project_results_desc, project_product_desc} = req.body

        console.log(id)
    try{

        const [result] = await pool.query('UPDATE student_project SET student_id = IFNULL(?,student_id), project_name = IFNULL(?,project_name), project_company_id = IFNULL(?,project_company_id), project_start_date = IFNULL(?,project_start_date), project_finish_date = IFNULL(?,project_finish_date), project_position_name = IFNULL(?,project_position_name), project_area = IFNULL(?,project_area), project_external_adviser = IFNULL(?,project_external_adviser), project_internal_adviser_id = IFNULL(?,project_internal_adviser_id), project_contract_status = IFNULL(?,project_contract_status), project_period = IFNULL(?,project_period), project_objective_desc = IFNULL(?,project_objective_desc), project_problem_desc = IFNULL(?,project_problem_desc), project_results_desc = IFNULL(?,project_results_desc), project_product_desc = IFNULL(?,project_product_desc) WHERE project_id = ?',
        [student_id,  project_name, project_company_id, project_start_date, project_finish_date, project_position_name, project_area, project_external_adviser, project_internal_adviser_id, project_contract_status, project_period, project_objective_desc, project_problem_desc, project_results_desc, project_product_desc, id])

        if(result.affectedRows===0) return res.status(404).json({
            message:'Student Project not found'
        })

        const [rows] = await pool.query('SELECT * FROM student_project WHERE project_id = ?',[id])
        res.json(rows[0])
        console.log(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const deleteStudentProject = (req,res) => res.send('eliminando estudiantes')