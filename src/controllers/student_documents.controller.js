import {pool} from '../db.js'
import path from 'path';
import multer from 'multer';

function normalizeString(input) {
  return input
    .normalize('NFD') // Normaliza caracteres a sus formas de base y diacríticos
    .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
    .replace(/\s+/g, '-'); // Reemplaza espacios en blanco con guiones
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadDocuments/');
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const timestamp = Date.now();
    const normalizedFileName = normalizeString(originalname);
    const finalFileName = `${timestamp}-${normalizedFileName}`;
    cb(null, finalFileName);
  },
});

const upload = multer({ storage: storage });

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
      { name: 'cv', maxCount: 1 },
      { name: 'constanciaCreditos', maxCount: 1 },
      { name: 'constanciaAfiliacion', maxCount: 1 },
      { name: 'creditoIngles', maxCount: 1 },
      { name: 'servicioSocial', maxCount: 1 },
      { name: 'creditosComplementarios', maxCount: 1 },
      { name: 'constanciaAutorizacion', maxCount: 1 },
      { name: 'anexo1', maxCount: 1 },
      { name: 'anexo3', maxCount: 1 },
      // ... Agrega más campos aquí si es necesario
    ])(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: 'Error al cargar el archivo.', message: err.message });
      } else if (err) {
        return res.status(500).json({ message: 'Algo salió mal.', message: err.message });
      }
  
      try {
        console.log('req.body:', req.body);
        const { student_id, document_type_id, alias, document_desc } = req.body;

        const uploadedFiles = {}; // Objeto para almacenar los nombres de archivo

        if (req.files) {
          for (const fieldName in req.files) {
            if (req.files[fieldName]) {
              const document_file_name = req.files[fieldName][0].filename;
              uploadedFiles[fieldName] = document_file_name;
            }
          }
        }
  
        let document_file_name = null;

        // Asignar el nombre de archivo dependiendo del campo
        if (uploadedFiles['cartaPresentacion']) {
          document_file_name = uploadedFiles['cartaPresentacion'];
        } else if (uploadedFiles['cartaAceptacion']) {
          document_file_name = uploadedFiles['cartaAceptacion'];
        } else if (uploadedFiles['cv']) {
          document_file_name = uploadedFiles['cv'];
        } else if (uploadedFiles['constanciaCreditos']) {
          document_file_name = uploadedFiles['constanciaCreditos'];
        } else if (uploadedFiles['constanciaAfiliacion']) {
          document_file_name = uploadedFiles['constanciaAfiliacion'];
        } else if (uploadedFiles['creditoIngles']) {
          document_file_name = uploadedFiles['creditoIngles'];
        } else if (uploadedFiles['servicioSocial']) {
          document_file_name = uploadedFiles['servicioSocial'];
        } else if (uploadedFiles['creditosComplementarios']) {
          document_file_name = uploadedFiles['creditosComplementarios'];
        } else if (uploadedFiles['constanciaAutorizacion']) {
          document_file_name = uploadedFiles['constanciaAutorizacion'];
        } else if (uploadedFiles['anexo1']) {
          document_file_name = uploadedFiles['anexo1'];
        } else if (uploadedFiles['anexo3']) {
          document_file_name = uploadedFiles['anexo3'];
        }

        if (document_file_name) {
          await pool.query(
            'INSERT INTO student_documents (student_id, document_type_id, document_file_name, alias, document_desc) VALUES (?, ?, ?, ?, ?)',
            [student_id, document_type_id, document_file_name, alias, document_desc]
          );
        }

        res.send({
          student_id,
          document_type_id,
          document_file_name, // Nombre de archivo subido
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