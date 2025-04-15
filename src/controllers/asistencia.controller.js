import { pool } from '../db.js';
import ExcelJS from 'exceljs';

export const createAsistencia = async (req, res) => {
  const { matricula_AlumnosAsis, id_grupoAsis, fecha, estado, justificado } =
    req.body;

  try {
    // Verificar si el alumno y grupo existen
    const [alumnoExists] = await pool.query(
      "SELECT matricula_Alumnos FROM alumnos WHERE matricula_Alumnos = ?",
      [matricula_AlumnosAsis]
    );
    const [grupoExists] = await pool.query(
      "SELECT id_grupo FROM grupos WHERE id_grupo = ?",
      [id_grupoAsis]
    );

    if (alumnoExists.length === 0 || grupoExists.length === 0) {
      return res.status(400).json({ message: "Alumno o grupo no existen" });
    }
    // Insertar la asistencia
    const [rows] = await pool.query(
      "INSERT INTO asistencia (matricula_AlumnosAsis, id_grupoAsis, fecha, estado, justificado) VALUES (?, ?, ?, ?, ?)",
      [matricula_AlumnosAsis, id_grupoAsis, fecha, estado, justificado],
      
    );
    
    res.status(201).json({
      matricula_AlumnosAsis,
      id_grupoAsis,
      fecha,
      estado,
      justificado,
    });
  } catch (error) {
    console.error(' Error al insertar asistencia:', error);
    return res
      .status(500)
      .json({ message: "Algo salió mal al registrar la asistencia" });
 }
};

  export const getAsistenciasPorGrupoYFecha = async (req, res) => {
    const { id_grupoAsis, fecha } = req.params;

    try {
        const [rows] = await pool.query(`
            SELECT 
                a.matricula_AlumnosAsis,
                al.nombre_Alumnos,
                a.estado,
                a.justificado
            FROM asistencia a
            JOIN alumnos al ON a.matricula_AlumnosAsis = al.matricula_Alumnos
            WHERE a.id_grupoAsis = ? AND a.fecha = ?
            ORDER BY al.nombre_Alumnos
        `, [id_grupoAsis, fecha]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron asistencias para este grupo en esa fecha' });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener asistencias por grupo y fecha:', error);
        return res.status(500).json({ message: 'Error al obtener asistencias' });
    }
};


  // Obtener todas las asistencias de un alumno sin filtrar por fecha
export const getTodasAsistenciasPorAlumno = async (req, res) => {
  
  const { matricula_AlumnosAsis } = req.params;

  try {
      // Consulta para obtener todas las asistencias del alumno
      const [rows] = await pool.query(
          `SELECT * FROM asistencia 
          WHERE matricula_AlumnosAsis = ?`,
          [matricula_AlumnosAsis]
      );

      // Si no se encuentran asistencias
      if (rows.length === 0) {
          return res.status(404).json({ message: 'No se encontraron asistencias para este alumno' });
      }

      // Devuelve todas las asistencias del alumno
      res.status(200).json(rows);
  } catch (error) {
      return res.status(500).json({ message: 'Algo salió mal al obtener las asistencias' });
  }
};




  export const  updateAsistencia = async (req,res) =>{
    
    const { matricula_AlumnosAsis, id_grupoAsis, fecha } = req.params;
    const { estado, justificado } = req.body;
  
    // Validación de los valores permitidos para "estado"
    const validEstados = ['Asistencia', 'Falta', 'Retardo'];
  
    try {
      // 1. Verificar si existe el registro
      const [existing] = await pool.query(
        'SELECT * FROM asistencia WHERE matricula_AlumnosAsis = ? AND id_grupoAsis = ? AND fecha = ?',
        [matricula_AlumnosAsis, id_grupoAsis, fecha]
      );
  
      if (existing.length === 0) {
        return res.status(404).json({ message: 'Registro de asistencia no encontrado' });
      }
  
      //  Validar estado 
      if (estado && !validEstados.includes(estado)) {
        return res.status(400).json({ message: 'Estado inválido. Los valores válidos son "Asistencia", "Falta" o "Retardo".' });
      }
  
      // 3. Construir la consulta de actualización dinámica
      let updateQuery = 'UPDATE asistencia SET ';
      const updateFields = [];
      const values = [];
  
      if (estado !== undefined) {
        updateFields.push('estado = ?');
        values.push(estado);
      }
  
      if (justificado !== undefined) {
        updateFields.push('justificado = ?');
        values.push(justificado);
      }
  
      if (updateFields.length === 0) {
        return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
      }
  
      updateQuery += updateFields.join(', ');
      updateQuery += ' WHERE matricula_AlumnosAsis = ? AND id_grupoAsis = ? AND fecha = ?';
      values.push(matricula_AlumnosAsis, id_grupoAsis, fecha);
  
      
      await pool.query(updateQuery, values);
  
      //  Obtener el registro actualizado
      const [updated] = await pool.query(
        'SELECT * FROM asistencia WHERE matricula_AlumnosAsis = ? AND id_grupoAsis = ? AND fecha = ?',
        [matricula_AlumnosAsis, id_grupoAsis, fecha]
      );
  
      res.json({
        message: 'Asistencia actualizada correctamente',
        asistencia: updated[0] // Solo un registro
      });
  
    } catch (error) {
      console.error(' Error al actualizar asistencia:', error);
      res.status(500).json({ message: 'Error al actualizar asistencia' });
    }
  }
  

  export const deleteAsistencia = async (req, res) => {
    
    const { matricula_AlumnosAsis, id_grupoAsis, fecha } = req.params;

    try {
        // Verificar si la asistencia existe
        const [exists] = await pool.query(
            'SELECT * FROM asistencia WHERE matricula_AlumnosAsis = ? AND id_grupoAsis = ? AND fecha = ?',
            [matricula_AlumnosAsis, id_grupoAsis, fecha]
        );

        if (exists.length === 0) {
            return res.status(404).json({ message: 'Asistencia no encontrada' });
        }

        // Eliminar la asistencia
        await pool.query(
            'DELETE FROM asistencia WHERE matricula_AlumnosAsis = ? AND id_grupoAsis = ? AND fecha = ?',
            [matricula_AlumnosAsis, id_grupoAsis, fecha]
        );

        res.status(200).json({ message: 'Asistencia eliminada con éxito' });
    } catch (error) {
        return res.status(500).json({ message: 'Algo salió mal al eliminar la asistencia' });
    }
};




// Función para generar el archivo Excel
export const exportarAsistenciaExcel = async (req, res) => {
  const { id_grupoAsis } = req.params;

  try {
    // Obtener el nombre del grupo
    const [grupo] = await pool.query(
      'SELECT nombre_Grupo FROM grupos WHERE id_grupo = ?',
      [id_grupoAsis]
    );

    if (grupo.length === 0) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

    // Obtener todos los alumnos del grupo
    const [alumnos] = await pool.query(
      'SELECT matricula_Alumnos, nombre_Alumnos FROM alumnos WHERE id_grupoA = ?',
      [id_grupoAsis]
    );

    if (alumnos.length === 0) {
      return res.status(404).json({ message: 'No hay alumnos en este grupo' });
    }

    // Obtener todas las fechas únicas de asistencia para este grupo
    const [fechas] = await pool.query(
      'SELECT DISTINCT fecha FROM asistencia WHERE id_grupoAsis = ? ORDER BY fecha',
      [id_grupoAsis]
    );

    if (fechas.length === 0) {
      return res.status(404).json({ message: 'No hay asistencias registradas para este grupo' });
    }

    // Obtener el nombre del grupo
const [grupoInfo] = await pool.query('SELECT nombre_Grupo FROM grupos WHERE id_grupo = ?', [id_grupoAsis]);

if (grupoInfo.length === 0) {
  return res.status(404).json({ message: 'Grupo no encontrado' });
}

const nombreGrupo = grupoInfo[0].nombre_Grupo;

    // Crear el archivo Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Asistencias');

  // Agrega el nombre del grupo como título
const titulo = worksheet.addRow([`Grupo: ${nombreGrupo}`]);

// Aplica estilo en negrita
titulo.font = { bold: true };

worksheet.columns = [
  { header: 'Grupo', key: 'grupo', width: 15 },
  { header: 'Matrícula', key: 'matricula', width: 15 },
  { header: 'Nombre', key: 'nombre', width: 30 },
  ...fechas.map(f => ({
    header: `${f.fecha.toISOString().split('T')[0]} `,
    key: f.fecha.toISOString().split('T')[0], // usar la fecha como key para que coincida con los datos
    width: 20
  }))
];

    // Agregar el nombre del grupo en la primera columna de cada fila
    for (let alumno of alumnos) {
      const row = [grupo[0].nombre_Grupo, alumno.matricula_Alumnos, alumno.nombre_Alumnos];

      // Para cada fecha, agregar el estado de la asistencia
      for (let fecha of fechas) {
        const [asistencia] = await pool.query(
          'SELECT estado, justificado FROM asistencia WHERE matricula_AlumnosAsis = ? AND id_grupoAsis = ? AND fecha = ?',
          [alumno.matricula_Alumnos, id_grupoAsis, fecha.fecha]
        );

        let estado = 'x';  // Valor por si no hay asistencia
        if (asistencia.length > 0) {
          estado = asistencia[0].estado;

          // Si la asistencia es 'Falta' o 'Retardo' y está justificada, cambiar a 'Asistencia'
          if ((estado === 'Falta' || estado === 'Retardo') && asistencia[0].justificado) {
            estado = 'Asistencia';
          }
        }

        row.push(estado);  // Agregar el estado de la asistencia (modificado si está justificado)
      }

      worksheet.addRow(row);
    }

    // Establecer el tipo de respuesta como Excel
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Asistencias.xlsx"');

    // Enviar el archivo Excel como respuesta
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al generar el archivo Excel' });
  }
};




