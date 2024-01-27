import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

type typeVehicle = 'car' | 'motocycle' | 'truck' | 'none';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private readonly httpClient: HttpClient) {}

  getVehicle(vehicle: typeVehicle) {
    const url =
      environment.api.urlBase +
      environment.api.typeVehicle[vehicle] +
      environment.api.brand;
    return this.httpClient.get(url);
  }
  getBrandByVehicle(vehicle: typeVehicle, brand: string) {
    const url =
      environment.api.urlBase +
      environment.api.typeVehicle[vehicle] +
      environment.api.brand +
      brand +
      '/' +
      environment.api.model;

    return this.httpClient.get(url);
  }

  getModelByBrand(vehicle: typeVehicle, brand: string, model: string) {
    const url =
      environment.api.urlBase +
      environment.api.typeVehicle[vehicle] +
      environment.api.brand +
      brand +
      '/' +
      environment.api.model +
      model +
      '/' +
      environment.api.years;

    return this.httpClient.get(url);
  }

  getValueByModel(
    vehicle: typeVehicle,
    brand: string,
    model: string,
    year: string
  ) {
    const url =
      environment.api.urlBase +
      environment.api.typeVehicle[vehicle] +
      environment.api.brand +
      brand +
      '/' +
      environment.api.model +
      model +
      '/' +
      environment.api.years +
      year +
      '/';

    return this.httpClient.get(url);
  }
}
