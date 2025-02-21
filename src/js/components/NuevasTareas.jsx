import React, { useState, useEffect } from "react";
import { Button, Alert, Stack } from '@mui/material';

const NuevasTareas = () => {
    const APIurl = 'https://playground.4geeks.com/todo';
    const [user, setUser] = useState('');
    const [tarea, setTarea] = useState('');
    const [alertaEnvio, setAlertaEnvio] = useState({ open: false, severity: '', message: '' });
   

    const addTask = async (unaTarea) =>{
        if(tarea.trim() === '' || user.trim() ===''){ //Para que no haga nada si la tarea o el user esta vacio
            return;
        }
        const tareaInfo = { label: unaTarea, is_done: false}
        const nuevaTarea = await fetch(APIurl + "/todos/" + user,
            {method: 'POST',
                body: JSON.stringify(tareaInfo),
                headers: {'Content-Type': 'application/json'},
            });
            if(nuevaTarea.ok){
                setAlertaEnvio({
                    open: true,
                    severity: 'success',
                    message: 'Tarea enviada con éxito',
                });
                setTarea('');
                
             } else{
                setAlertaEnvio({
                    open: true,
                    severity: 'warning',
                    message: 'Error al agregar la tarea',
                });
                }
        
    };
    const envioFormulario = async(event) => {
        event.preventDefault();
        await addTask(tarea.trim());
    };
    
    return (
            <div className="container pt-3">
            <h2>TAREAS PARA UN USUARIO</h2>
            {alertaEnvio.open && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity={alertaEnvio.severity}>
                        {alertaEnvio.message}
                    </Alert>
                </Stack>
            )}
            <form onSubmit={envioFormulario}>
                <label>Nombre de usuario:</label>
                <input className="m-2"type="text"
                    placeholder="Nombre del usuario"
                    value={user}
                    onChange={(e) => setUser(e.target.value)} ></input>
                <label>Nueva tarea:</label>
                <input className="m-2" type="text" placeholder="Tarea nueva" value={tarea} onChange={(t) => setTarea(t.target.value)}/>
                <Button variant="contained" type="submit">Enviar tarea</Button>
            </form>
            </div>
    );

}
export default NuevasTareas;