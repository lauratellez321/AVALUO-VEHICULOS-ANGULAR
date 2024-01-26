import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/service/vehicle.service';

type typeVehicle = 'car' | 'motocycle' | 'truck';

interface Vehicle {
  TipoVeiculo: number;
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  SiglaCombustivel: string;
}

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {
  selectedOptionVehicle!: typeVehicle;
  selectedOptionBrand!: string;
  selectedOptionModel!: string;
  selectedOptionYear!: string;
  listVehicleBrand!: any[];
  listVehicleModel!: any[];
  listVehicleYear!: any[];
  listVehicleGeneral!: Vehicle;

  constructor(private readonly vehicleService: VehicleService) {}

  ngOnInit() {
    this.listVehicleGeneral = {
      TipoVeiculo: 0,
      Valor: '',
      Marca: '',
      Modelo: '',
      AnoModelo: 0,
      Combustivel: '',
      CodigoFipe: '',
      MesReferencia: '',
      SiglaCombustivel: '',
    };
  }

  getDataVehicle(vehicle: typeVehicle) {
    this.listVehicleBrand = [];
    this.vehicleService.getVehicle(vehicle).subscribe((data) => {
      Object.values(data).forEach((value) => {
        this.listVehicleBrand.push(value);
      });
    });
  }

  getDataBrandByVehicle(vehicle: typeVehicle, brand: string) {
    this.listVehicleModel = [];
    this.vehicleService
      .getBrandByVehicle(vehicle, brand)
      .subscribe((data: any) => {
        if (data.modelos && Array.isArray(data.modelos)) {
          this.listVehicleModel = data.modelos;
        }
      });
  }

  getDataModelByBrand(vehicle: typeVehicle, brand: string, model: string) {
    this.listVehicleYear = [];
    this.vehicleService
      .getModelByBrand(vehicle, brand, model)
      .subscribe((data) => {
        Object.values(data).forEach((value) => {
          this.listVehicleYear.push(value);
        });
      });
  }

  getDataGeneralByYear(
    vehicle: typeVehicle,
    brand: string,
    model: string,
    year: string
  ) {
    this.vehicleService
      .getValueByModel(vehicle, brand, model, year)
      .subscribe((data: any) => {
        this.listVehicleGeneral = data;
      });
  }

  onSelectionChangeVehicle() {
    this.getDataVehicle(this.selectedOptionVehicle);
  }
  onSelectionChangeBrand() {
    this.getDataBrandByVehicle(
      this.selectedOptionVehicle,
      this.selectedOptionBrand
    );
  }
  onSelectionChangeModel() {
    this.getDataModelByBrand(
      this.selectedOptionVehicle,
      this.selectedOptionBrand,
      this.selectedOptionModel
    );
  }

  onSelectionChangeYear() {
    this.getDataGeneralByYear(
      this.selectedOptionVehicle,
      this.selectedOptionBrand,
      this.selectedOptionModel,
      this.selectedOptionYear
    );
  }
}
