import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private readonly httpClient: HttpClient) {}

  getVehiculo(vehicle: 'car' | 'motocycle' | 'truck') {
    const url =
      environment.api.urlBase +
      environment.api.typeVehicle[vehicle] +
      environment.api.brand;
    return this.httpClient.get(url);
  }
}
