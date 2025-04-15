import { pool } from '../db.js';

export const getAlumnos = async (req,res) =>{ 
  try {
          const [rows] = await pool.query('SELECT * FROM alumnos')
          res.json(rows)  
  
      } catch (error) {
          return res.status(500).json({
             message:'Algo salió mal'
  
          })
      }
    
}

export const getUnAlumno = async (req,res) =>{

    try {
        const [rows] = await pool.query('SELECT * FROM alumnos WHERE matricula_alumnos = ?',[req.params.matricula_Alumnos])
    if (rows.length <= 0 ) return res.status(404).json({

        message: 'Alumno no encontrado'
    })

   res.json(rows[0])

    } catch (error) {
        return res.status(500).json({
          message: 'Algo salió mal'
        })
    }

}
export const getAlumnosPorGrupo = async (req, res) => {
    const { id_grupoA } = req.params; //  id_grupoA se pasa como parámetro en la URL

    try {
        // Consultar todos los alumnos del grupo con id_grupoA
        const [rows] = await pool.query('SELECT * FROM alumnos WHERE id_grupoA = ?', [id_grupoA]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron alumnos en este grupo' });
        }

        // Devolver los alumnos encontrados
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los alumnos:', error);
        return res.status(500).json({ message: 'Algo salió mal', error: error.message });
    }
};





export const createAlumnos = async (req, res) => {
    const { matricula_Alumnos, nombre_Alumnos, id_grupoA } = req.body;

    try {
        // Verificar si el grupo existe
        const [groupExists] = await pool.query('SELECT id_grupo FROM grupos WHERE id_grupo = ?', [id_grupoA]);
        if (groupExists.length === 0) {
            return res.status(400).json({ message: 'El grupo seleccionado no existe' });
        }

        // Verificar cuántos alumnos hay en el grupo
        const [currentCount] = await pool.query(
            'SELECT COUNT(*) AS count FROM alumnos WHERE id_grupoA = ?',
            [id_grupoA]
        );

        // Si el grupo tiene 60 o más alumnos, no permitir la inserción
        if (currentCount[0].count >= 60) {
            return res.status(400).json({ message: 'El grupo ya tiene el máximo de 60 alumnos' });
        }

        // Insertar el nuevo alumno en la tabla alumnos
        const [rows] = await pool.query(
            'INSERT INTO alumnos (matricula_Alumnos, nombre_Alumnos, id_grupoA) VALUES (?, ?, ?)',
            [matricula_Alumnos, nombre_Alumnos, id_grupoA]
        );

        res.status(201).json({
            matricula_Alumnos,
            nombre_Alumnos,
            id_grupoA
        });

    } catch (error) {
        console.error('Error en la creación del alumno:', error);
        return res.status(500).json({ message: 'Algo salió mal', error: error.message });
    }
};




export const updateAlumnos = async (req,res) =>{ 
    const {matricula_Alumnos} = req.params
    const { nombre_Alumnos, id_grupoA} = req.body   
  try {
  const [result] = await pool.query('UPDATE alumnos SET nombre_Alumnos = IFNULL(?,nombre_Alumnos),id_grupoA = IFNULL(?,id_grupoA)  WHERE matricula_Alumnos = ? ', [nombre_Alumnos,id_grupoA,matricula_Alumnos]);
  console.log(result);
  if (result.affectedRows === 0) return res.status(404).json({

     message: 'Alumno no encontrado'
  })

  const [rows] = await pool.query('SELECT * FROM alumnos WHERE matricula_Alumnos = ? ', [matricula_Alumnos])
  
  res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
        message: 'Algo salió mal'
      })
  }

}



export const deleteAlumnos = async (req,res) =>{ 
    try {
        const [result] = await pool.query('DELETE FROM alumnos WHERE matricula_Alumnos = ?', [req.params.matricula_Alumnos])
     
     if (result.affectedRows <=0 ) return res.status(404).json({
         message: 'Alumno no encontrado'
         
     })
    
    
     res.sendStatus(204)
     } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
          })
     }
}