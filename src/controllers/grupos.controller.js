import { pool } from '../db.js';
//te da todos los grupos disponibles
export const getGrupo = async (req,res) =>{ 
    try {
        const [rows] = await pool.query('SELECT * FROM grupos')
        res.json(rows)  

    } catch (error) {
        return res.status(500).json({
           
            message:'Algo salió mal'

        })
    }
}


// seleccionar un grupo especifico
export const getUnGrupo = async (req,res) =>{
    try {
        const [rows] = await pool.query('SELECT * FROM grupos WHERE id_grupo = ?',[req.params.id_grupo])
    if (rows.length <= 0 ) return res.status(404).json({

        message: 'Grupo no encontrado'
    })

   res.json(rows[0])

    } catch (error) {
        return res.status(500).json({
          message: 'Algo salió mal'
        })
    }

}

 //crear un nuevo grupo
export const createGrupo = async (req, res) => {
    const { nombre_Grupo, carrera_Grupo, turno_Grupo } = req.body;

    try {
        // Verificar cuántos grupos existen actualmente
        const [existingGroups] = await pool.query('SELECT COUNT(*) AS count FROM grupos');
        const totalGroups = existingGroups[0].count;

        if (totalGroups >= 5) {
            return res.status(400).json({ message: 'No se pueden crear más de 5 grupos' });
        }

        // Insertar nuevo grupo si el límite no se ha alcanzado
        const [rows] = await pool.query(
            'INSERT INTO grupos (nombre_Grupo, carrera_Grupo, turno_Grupo) VALUES (?, ?, ?)',
            [nombre_Grupo, carrera_Grupo, turno_Grupo]
        );

        res.send({
            id: rows.insertId,
            nombre_Grupo,
            carrera_Grupo,
            turno_Grupo,
        });

    } catch (error) {
        return res.status(500).json({ message: 'Algo salió mal' });
    }
};

//borrar un grupo
export const deleteGrupo = async (req, res) => {
    const { id_grupo } = req.params;
  
    try {
      // 1. Eliminar asistencias relacionadas al grupo
      await pool.query(
        'DELETE FROM asistencia WHERE id_grupoAsis = ? OR matricula_AlumnosAsis IN (SELECT matricula_Alumnos FROM alumnos WHERE id_grupoA = ?)',
        [id_grupo, id_grupo]
      );
  
      // 2. Eliminar alumnos relacionados al grupo
      await pool.query('DELETE FROM alumnos WHERE id_grupoA = ?', [id_grupo]);
  
      // 3. Eliminar el grupo
      const [result] = await pool.query('DELETE FROM grupos WHERE id_grupo = ?', [id_grupo]);
  
      if (result.affectedRows <= 0) {
        return res.status(404).json({ message: 'Grupo no encontrado' });
      }
  
      res.sendStatus(204); // No Content
      console.log('Grupo eliminado');
    } catch (error) {
      console.error('Error al eliminar grupo:', error);
      return res.status(500).json({ message: 'Algo salió mal al eliminar el grupo' });
    }
  };
  

//modificar un dato de un grupo
export const updateGrupo = async (req,res) =>{ 
    const {id_grupo} = req.params
    const {nombre_Grupo,carrera_Grupo,turno_Grupo} = req.body   
  try {
  const [result] = await pool.query('UPDATE grupos SET nombre_Grupo = IFNULL(?,nombre_Grupo),carrera_Grupo = IFNULL(?,carrera_Grupo) ,turno_Grupo = IFNULL(?,turno_Grupo) WHERE id_grupo = ? ', [nombre_Grupo,carrera_Grupo,turno_Grupo,id_grupo]);
  console.log(result);
  if (result.affectedRows === 0) return res.status(404).json({

     message: 'Grupo no encontrado'
  })

  const [rows] = await pool.query('SELECT * FROM grupos WHERE id_grupo = ? ', [id_grupo])
  
  res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
        
        message: 'Algo salió mal'

      })
  }
}
