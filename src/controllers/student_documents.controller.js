import {pool} from '../db.js'
import multer from 'multer';
const storage = multer.diskStorage({
  destination: 'src/uploadDocuments/',
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Puedes personalizar el nombre del archivo si lo deseas
  },
});

const upload = multer({ storage });

export const getStudentDocuments = async (req,res) => {
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
export const postStudentDocument = async (req, res) => {
  try {
    // Utiliza upload.fields() para manejar tanto campos como archivos
    upload.fields([
      { name: 'cartaPresentacion', maxCount: 1 },
      { name: 'cartaAceptacion', maxCount: 1 },
      // { name: 'cv', maxCount: 1 },
      // ... Agrega más campos aquí si es necesario
    ])(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: 'Error al cargar el archivo.' });
      } else if (err) {
        return res.status(500).json({ message: 'Algo salió mal.' });
      }
  
      try {
        const [rows] = await pool.query(
          'INSERT INTO student_documents (student_id, document_type_id, document_file_name, alias, document_desc) VALUES (?, ?, ?, ?, ?)',
          [student_id, document_type_id, document_file_name, alias, document_desc]
        );
  
        res.send({
          student_id,
          document_type_id,
          document_file_name,
          alias,
          document_desc,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: 'Something goes wrong',
        });
      }
    });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something goes wrong' });
    }
  };
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
export const deleteStudentDocument = (req,res) => res.send('eliminando estudiantes')