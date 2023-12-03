import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MapComponent } from 'src/app/components/map/map.component';
import { TrackService } from 'src/app/core/services/track.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.page.html',
  styleUrls: ['./google-maps.page.scss'],
  standalone: true,
  imports: [IonicModule,MapComponent,CommonModule,ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {

  mapform: FormGroup;
  isSubmitted = false;
  openModal = false;

  constructor(private track: TrackService) {}

  openLocationModal() {
    this.openModal = true;
    this.formData();
  }

  formData() {
    this.mapform = new FormGroup({
      lat: new FormControl(null, {validators: [Validators.required]}),
      lng: new FormControl(null, {validators: [Validators.required]}),
    });
  }

  async onSubmit() {
    if(!this.mapform.valid) return;
    try {
      this.isSubmitted = true;
      // update location
      const source = {
        lat: this.mapform.value.lat,
        lng: this.mapform.value.lng
      };
      console.log(source);
      await this.track.updateSourceLocation(source);
      this.isSubmitted = false;
      this.openModal = false;
    } catch(e) {
      this.isSubmitted = false;
      console.log(e);
    }
  }

}
