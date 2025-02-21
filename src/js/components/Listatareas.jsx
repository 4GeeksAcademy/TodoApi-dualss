import React, { useState } from "react";
import { Button, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import List from '@mui/material/List';



const ListaTareas = () => {
    const APIurl = 'https://playground.4geeks.com/todo';
    const [user, setUser] = useState('');
    const [ListaDeTareas, setListaDeTareas] = useState('');

    const TakeData = async () => {
        if (user.trim() === '') {
            return
        }
        const Tareas = await fetch(APIurl + '/users/' + user)
        const DatosUser = await Tareas.json();
        if(Tareas.ok){
        setListaDeTareas(DatosUser.todos);
        } else {
            alert("Hubo un error, quizas el usuario no existe")
            setUser('');
        }
    };

    const DelTarea = async(id) =>{
        const response = await fetch(APIurl+ '/todos/' + id,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
            // Actualizar la lista de tareas, removiendo la tarea eliminada
            setListaDeTareas(ListaDeTareas.filter(tarea => tarea.id !== id));
        } else {
            console.log("Hubo un error al eliminar la tarea");
        }
    };
    

    return (
        <div className="container pt-3">
            <h2>Dime de quien quieres las tareas</h2>
            <input
                type="text"
                placeholder="Nombre de usuario para sacar tareas"
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />
            <Button className="m-2" variant="contained" onClick={TakeData}>DALE</Button>
            <div>
                <List>
                    {ListaDeTareas.length > 0 ? (
                        ListaDeTareas.map((tarea) => (
                            <ListItem key={tarea.id}>
                                <ListItemText primary={tarea.label} />
                                <ListItemIcon>
                                    <TaskAltIcon onClick={() => DelTarea(tarea.id)} />
                                </ListItemIcon>
                            </ListItem>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText className="text-center">No hay tareas pendientes</ListItemText>
                        </ListItem>
                    )}
                </List>
            </div>
        </div>
    )

}

export default ListaTareas;