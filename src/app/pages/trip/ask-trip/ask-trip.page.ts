import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as QRCode from 'qrcode-generator';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { googleConfig } from 'src/app/config/google.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ask-trip',
  templateUrl: './ask-trip.page.html',
  styleUrls: ['./ask-trip.page.scss'],
})
export class AskTripPage implements OnInit {
  askTripForm: FormGroup;
  qrCodeImg: string;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {
    this.askTripForm = this.formBuilder.group({
      origin: ['',[Validators.required]],
      destination: ['',[Validators.required]],
    });
  }

  ngOnInit() {
  }

  async generateQRCode() {
    const origin = await this.getAddressCoordinates(this.askTripForm.get('origin')?.value).toPromise();
    console.log(origin)
    const destination = await this.getAddressCoordinates(this.askTripForm.get('destination')?.value).toPromise();
    const payload = {
      origin: { address: this.askTripForm.get('origin')?.value, lat: origin.lat, lng: origin.lng },
      destination: { address: this.askTripForm.get('destination')?.value, lat: destination.lat, lng: destination.lng },
    };

    const jsonPayload = JSON.stringify(payload);

    const qr = QRCode(0, 'M');
    qr.addData(jsonPayload);
    qr.make();
    qr.createDataURL(10, 10);
    this.qrCodeImg = qr.createDataURL(10, 10);
  }

  getCoordinates(address: string){
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleConfig.apiKey}`;
    return this.http.get(apiUrl);
  }

  getAddressCoordinates(address: string) {
    return new Observable<{ lat: number, lng: number }>((observer) => {
      this.getCoordinates(address).subscribe(
        (data: any) => {
          const coordinates = data.results[0].geometry.location;
          observer.next({ lat: coordinates.lat, lng: coordinates.lng });
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
