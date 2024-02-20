import {pool} from '../db.js'

export const getCompanysInfo = async (req,res) => {
    try{
        const [rows] = await pool.query(`
        SELECT company_info.*, agreement_status.*, scholar_grade.*
        FROM company_info
        LEFT JOIN agreement_status ON company_info.company_agreement_status = agreement_status.status_id
        LEFT JOIN scholar_grade ON company_info.company_contact_max_studies = scholar_grade.grade_id
        GROUP BY company_info.company_id;`);

        if(rows.length<=0)return res.status(404).json({
            message:'Company Info not found'
        })
        console.log(rows[0])
        res.json(rows)
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const getCompanyInfo = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM company_info WHERE company_id = ?', [req.params.id])

        if(rows.length<=0)return res.status(404).json({
            message:'Company Info not found'
        })
        res.json(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const postCompanyInfo = async (req,res) => {
    const {company_name, company_business_name, company_address, company_postal_code, company_colony, company_location, company_municipality, company_state, company_external_number, company_country, company_representative_name, company_contact_name, company_contact_max_studies, company_contact_position, company_tel, company_tel_ext, company_cel, company_email, company_second_email, company_agreement_status, company_vacants_number,company_observation_desc,company_agreement_date} = req.body
    try{
        if (!req.body.company_tel_ext) {
            // Asignar null si está vacío
            req.body.company_tel_ext = null;
        }
        const [rows]= await pool.query('INSERT INTO company_info(company_name, company_business_name, company_address, company_postal_code, company_colony, company_location, company_municipality, company_state, company_external_number, company_country, company_representative_name, company_contact_name, company_contact_max_studies, company_contact_position, company_tel, company_tel_ext, company_cel, company_email, company_second_email, company_agreement_status, company_vacants_number,company_observation_desc,company_agreement_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [company_name, company_business_name, company_address, company_postal_code, company_colony, company_location, company_municipality, company_state, company_external_number, company_country, company_representative_name, company_contact_name, company_contact_max_studies, company_contact_position, company_tel, company_tel_ext, company_cel, company_email, company_second_email, company_agreement_status, company_vacants_number,company_observation_desc,company_agreement_date])
        res.send({
            company_name, 
            company_business_name, 
            company_address, 
            company_postal_code, 
            company_colony, 
            company_location, 
            company_municipality, 
            company_state, 
            company_external_number, 
            company_country, 
            company_representative_name, 
            company_contact_name, 
            company_contact_max_studies, 
            company_contact_position, 
            company_tel, 
            company_tel_ext, 
            company_cel, 
            company_email, 
            company_second_email, 
            company_agreement_status, 
            company_vacants_number,
            company_observation_desc,
            company_agreement_date
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const putCompanyInfo = async (req,res) => {
    const {id}=req.params
        const {company_name, company_business_name, company_address, company_postal_code, company_colony, company_location, company_municipality, company_state, company_external_number, company_country, company_representative_name, company_contact_name, company_contact_max_studies, company_contact_position, company_tel, company_tel_ext, company_cel, company_email, company_second_email, company_agreement_status, company_vacants_number,company_observation_desc,company_agreement_date} = req.body

        console.log(id)
    try{
        if (req.body.company_tel_ext=="") {
            // Asignar null si está vacío
            req.body.company_tel_ext = null;
        }
        const [result] = await pool.query('UPDATE company_info SET company_name = IFNULL(?,company_name), company_business_name = IFNULL(?,company_business_name), company_address = IFNULL(?,company_address), company_postal_code = IFNULL(?,company_postal_code), company_colony = IFNULL(?,company_colony), company_location = IFNULL(?,company_location), company_municipality = IFNULL(?,company_municipality), company_state = IFNULL(?,company_state), company_external_number = IFNULL(?,company_external_number), company_country = IFNULL(?,company_country), company_representative_name = IFNULL(?,company_representative_name), company_contact_name = IFNULL(?,company_contact_name), company_contact_max_studies = IFNULL(?,company_contact_max_studies), company_contact_position = IFNULL(?,company_contact_position), company_tel = IFNULL(?,company_tel), company_tel_ext = IFNULL(?,company_tel_ext), company_cel = IFNULL(?,company_cel), company_email = IFNULL(?,company_email), company_second_email = IFNULL(?,company_second_email), company_agreement_status = IFNULL(?,company_agreement_status), company_vacants_number = IFNULL(?,company_vacants_number), company_observation_desc = IFNULL(?,company_observation_desc), company_agreement_date = IFNULL(?,company_agreement_date) WHERE company_id = ?',
        [company_name, company_business_name, company_address, company_postal_code, company_colony, company_location, company_municipality, company_state, company_external_number, company_country, company_representative_name, company_contact_name, company_contact_max_studies, company_contact_position, company_tel, company_tel_ext, company_cel, company_email, company_second_email, company_agreement_status, company_vacants_number,company_observation_desc,company_agreement_date,id])

        if(result.affectedRows===0) return res.status(404).json({
            message:'Student Info not found'
        })

        const [rows] = await pool.query('SELECT * FROM company_info WHERE company_id = ?',[id])
        res.json(rows[0])
        console.log(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong',
            error: req.body.company_tel_ext
        })
    }
}
export const deleteCompanyInfo =  async (req,res) => {
    try{
        const [result] = await pool.query('DELETE FROM company_info WHERE company_id = ?', [req.params.id])

        if(result.affectedRows <= 0)return res.status(404).json({
            message:'Company Info not found'
        })
        res.sendStatus(204)
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}