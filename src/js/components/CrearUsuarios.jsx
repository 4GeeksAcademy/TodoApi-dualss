import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';

const CrearUsuarios = () => {

    const APIurl = 'https://playground.4geeks.com/todo';
    const [user, setUser] = useState('');

    const createUser = async () => {
        if (user.trim() === '') {

            return;
        }

        const envio = await fetch(APIurl + "/users/" + user,
            { method: "POST" }
        );
        setUser('');
    }
    const DelUser = async () => {
        if (user.trim() === '') {
            return;
        }
        const enviodel = await fetch(APIurl + "/users/" + user,
            { method: "DELETE" }
        );
        setUser('');
    }

    return (
        <div className="container pt-3">
            <h2>Control de Usuarios</h2>
            <input
                type="text"
                placeholder="Nombre del nuevo usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />

            <Button className="m-2" variant="contained" onClick={createUser}>Crear Usuario</Button>
            <Button variant="outlined" onClick={DelUser}>Eliminar Usuario</Button>
        </div>
    );
}
export default CrearUsuarios;