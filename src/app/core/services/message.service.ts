import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

messageToast(icon: SweetAlertIcon, msj: string, time: number, position: SweetAlertPosition){
  const Toast = Swal.mixin({
    toast: true,
    position: position,
    timer: time,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter',Swal.stopTimer)
      toast.addEventListener('mouseleave',Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: icon,
    title: msj
  })
}


}
