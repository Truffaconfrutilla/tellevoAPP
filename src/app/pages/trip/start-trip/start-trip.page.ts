import { Component, ElementRef, ViewChild, OnInit  } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/library';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { googleConfig } from 'src/app/config/google.config';

@Component({
  selector: 'app-start-trip',
  templateUrl: './start-trip.page.html',
  styleUrls: ['./start-trip.page.scss'],
})

export class StartTripPage implements OnInit {
  @ViewChild('videoElement') videoElement: ElementRef<HTMLVideoElement>;
  private codeReader: BrowserMultiFormatReader;
  public hasPermission = false;
  public permissionDenied = false;
  private scanning = false;
  private apiUrl = 'https://maps.googleapis.com/maps/api/directions/json';

  constructor(private http: HttpClient) { 
    this.codeReader = new BrowserMultiFormatReader();
  }

  ngOnInit() {
    this.checkCameraPermission();
  }

  async checkCameraPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.hasPermission = true;
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('Error checking camera permission:', error);
      this.hasPermission = false;
    }
  }

  async requestCameraPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.hasPermission = true;
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      this.hasPermission = false;
    }
  }

  async initiateQrCodeScanning() {
    if (!this.hasPermission || this.permissionDenied || this.scanning) {
      // Prompt the user to grant camera permission
      this.requestCameraPermission();
      return;
    }

    this.scanning = true;

    try {
      const video = this.videoElement.nativeElement;
      if (video.paused) {
      while (this.scanning) {
        try {
          const qrCodeResult = await this.scanQrCode(video);
          console.log('QR Code Result:', qrCodeResult);

          // Parse the QR code result as needed
          const parsedPayload = JSON.parse(qrCodeResult);
          console.log('Parsed Payload:', parsedPayload);
          const payload = {
            origin: {
              address: parsedPayload.origin.address,
              lat: parsedPayload.origin.lat,
              lng: parsedPayload.origin.lng,
            },
            destination: {
              address: parsedPayload.destination.address,
              lat: parsedPayload.destination.lat,
              lng: parsedPayload.destination.lng,
            },
          };
          console.log('Payload:', payload);
          this.scanning = false;
          this.getDirections(payload.origin.address, payload.destination.address)
        } catch (scanError) {
        }
        await this.delay(200);
      }
    }
    } catch (error) {
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  ngOnDestroy() {
    this.scanning = false;
  }
  
  scanQrCode(videoElement: HTMLVideoElement): Promise<string> {
    return new Promise((resolve, reject) => {
      this.codeReader
        .decodeFromVideoDevice(undefined, videoElement, (result, error) => {
          if (result) {
            resolve(result.getText());
          } else {
            reject(error);
          }
        });
    });
  }

  getDirections(origin: string, destination: string): Observable<any> {
    const params = {
      origin: origin,
      destination: destination,
      mode: 'driving',
      key: googleConfig.apiKey
    };

    return this.http.get(this.apiUrl, { params: params });
  }

}
