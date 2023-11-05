export interface trip{
    id:number, // Índica el ID de Viaje realizado
    idDriver:string, // Índica el ID del Socio Conductor que realizó el viaje
    idPassenger:any[], // Índica el ID del Pasajero que contrató el viaje
    tripTotal:number // Monto total del viaje realizado
}