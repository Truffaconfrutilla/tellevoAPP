export interface User {
    id?:string, // ID del Usuario
    name:string, // Nombre del Usuario
    email:string, // Correo del Usuario
    location:string, // Sede del Usuario, se autocompleta
    partner:boolean, // Índica si el Usuario es Socio Conductor
    plate?:string, // Índica la Patente del vehículo del Socio, solo si partner es verdadero
    licence?:string, // Índica la Licencia de conducción del Socio, solo si partner es verdadero
    administrator:boolean, // Índica si el Usuario es administador del Sistema
    password:string //Contraseña del Usuario
}