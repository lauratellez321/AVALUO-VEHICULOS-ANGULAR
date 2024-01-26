import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {
  selectedOptionVehicle!: 'car' | 'motocycle' | 'truck';
  listVehicleBrand!: any[];
  selectedOptionBrand!: string;
  selectedOptionModel!: string;
  selectedOptionYear!: string;
  constructor(private readonly vehicleService: VehicleService) {}

  ngOnInit() {
    console.log(this.listVehicleBrand);
  }

  getDataVehicle(vehicle: 'car' | 'motocycle' | 'truck') {
    this.listVehicleBrand = [];
    this.vehicleService.getVehiculo(vehicle).subscribe((data) => {
      Object.values(data).forEach((value) => {
        this.listVehicleBrand.push(value);
      });
    });
  }

  onSelectionChangeVehicle() {
    this.getDataVehicle(this.selectedOptionVehicle);
    console.log(this.listVehicleBrand);
  }
  onSelectionChangeBrand() {
    console.log('Opción seleccionada:', this.selectedOptionBrand);
  }
  onSelectionChangeModel() {
    console.log('Opción seleccionada:', this.selectedOptionModel);
  }
  onSelectionChangeYear() {
    console.log('Opción seleccionada:', this.selectedOptionYear);
  }
}
