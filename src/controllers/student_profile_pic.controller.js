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
    cb(null, 'uploadProfilePics/');
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

export const getStudentProfilePics = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM student_profile_pics')
        res.json(rows)
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
export const getStudentProfilePic = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM student_profile_pics WHERE profile_pic_id = ?', [req.params.id])

        if(rows.length<=0)return res.status(404).json({
            message:'Student Profile Pic not found'
        })
        res.json(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}

export const postStudentProfilePic = async (req, res) => {
  try {
    // Utiliza upload.fields() para manejar tanto campos como archivos
    upload.fields([
      { name: 'fotoPerfil', maxCount: 1 }
      // ... Agrega más campos aquí si es necesario
    ])(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: 'Error al cargar el archivo.', message: err.message });
      } else if (err) {
        return res.status(500).json({ message: 'Algo salió mal.', message: err.message });
      }
  
      try {
        console.log('req.body:', req.body);
        const { student_id, alias} = req.body;
        const studentIdNumber = parseInt(student_id, 10);

        const uploadedFiles = {}; // Objeto para almacenar los nombres de archivo

        if (req.files) {
          for (const fieldName in req.files) {
            if (req.files[fieldName]) {
              const profile_pic_file_name = req.files[fieldName][0].filename;
              uploadedFiles[fieldName] = profile_pic_file_name;
            }
          }
        }
  
        let profile_pic_file_name = null;

        // Asignar el nombre de archivo dependiendo del campo
        profile_pic_file_name = uploadedFiles['fotoPerfil'];

        let existingStudent = [];
        let retries = 0;
        const maxRetries = 10;

        // Esperar hasta que el student_id exista en la tabla student_info
        while (existingStudent.length === 0 && retries < maxRetries) {
          existingStudent = await pool.query('SELECT * FROM student_info WHERE student_id = ?', [studentIdNumber]);
          if (existingStudent.length === 0) {
            console.log(`El student_id aún no existe en la tabla student_info. Esperando... Intento ${retries + 1}/${maxRetries}`);
            retries++;
            await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo antes de la siguiente consulta
          } else {
            // Verifica que student_id exista en student_info antes de insertar en student_profile_pics
            // const isStudentExist = existingStudent.length > 0 && existingStudent[0].student_id === studentIdNumber;
            // console.log('EEEEExistingStudentn que es:', isStudentExist);
            // if (isStudentExist) {
              if (profile_pic_file_name) {
                try {
                  await pool.query(
                    'INSERT INTO student_profile_pics (student_id, profile_pic_file_name, alias) VALUES (?, ?, ?)',
                    [studentIdNumber, profile_pic_file_name, alias]
                  );
                } catch (error) {
                  console.error('Error al insertar en la base de datos:', error);
                }
              } else {
                console.log('Nombre de archivo demasiado largo o no se encontró en los archivos subidos.');
              }
            // } else {
            //   console.log(`El student_id ${studentIdNumber} no existe en la tabla student_info.`);
            // }
        }
      }

        res.send({
          studentIdNumber,
          profile_pic_file_name, // Nombre de archivo subido
          alias,
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

export const putStudentProfilePic = async (req,res) => {
    const {id}=req.params
        const {student_id, profile_pic_file_name, alias} = req.body

        console.log(id)
    try{

        const [result] = await pool.query('UPDATE student_profile_pics SET student_id = IFNULL(?,student_id), profile_pic_file_name = IFNULL(?,profile_pic_file_name), alias = IFNULL(?,alias) WHERE profile_pict_id = ?',
        [student_id, profile_pic_file_name, alias, id])

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
export const deleteStudentProfilePic = (req,res) => res.send('eliminando estudiantes')