import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/service/vehicle.service';

type typeVehicle = 'car' | 'motocycle' | 'truck' | 'none';

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
  disableSelectBrand = true;
  disableSelectModel = true;
  disablSelectYear = true;
  selectedOptionVehicle!: typeVehicle;
  selectedOptionBrand!: string;
  selectedOptionModel!: string;
  selectedOptionYear!: string;
  listVehicleBrand!: any[];
  listVehicleModel!: any[];
  listVehicleYear!: any[];
  listVehicleGeneral!: Vehicle;
  listVehicleGeneralVoid = {
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
  taxesByFuel = {
    Gasolina: 0.05,
    Diesel: 0.025,
    Electric: 0.01,
  };
  typeFuel = 0;
  valueCop!: number;
  taxesFull!: number;

  constructor(private readonly vehicleService: VehicleService) {}

  ngOnInit() {
    this.listVehicleGeneral = this.listVehicleGeneralVoid;
  }

  getDataVehicle(vehicle: typeVehicle) {
    this.listVehicleBrand = [];
    this.selectedOptionBrand = '';
    this.selectedOptionModel = '';
    this.selectedOptionYear = '';

    this.vehicleService.getVehicle(vehicle).subscribe((data) => {
      Object.values(data).forEach((value) => {
        this.listVehicleBrand.push(value);
      });
    });
    this.disableSelectBrand = false;
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
    this.disableSelectModel = false;
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
    this.disablSelectYear = false;
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
        if (
          (this.listVehicleGeneral.Combustivel &&
            this.listVehicleGeneral.Combustivel == 'Gasolina') ||
          this.listVehicleGeneral.Combustivel == 'Diesel' ||
          this.listVehicleGeneral.Combustivel == 'Electric'
        ) {
          const newValue = this.parseCurrency(this.listVehicleGeneral.Valor);
          this.valueCop = this.convertRSaCOP(newValue);
          this.typeFuel = this.taxesByFuel[this.listVehicleGeneral.Combustivel];
          this.taxesFull = this.getTaxes(
            this.valueCop,
            this.listVehicleGeneral.Combustivel
          );
        }
      });
  }

  getTaxes(valor: number, fuel: 'Diesel' | 'Gasolina' | 'Electric'): number {
    const taxRate = this.taxesByFuel[fuel];
    const taxAmount = valor * taxRate;
    return parseFloat(taxAmount.toFixed(2));
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

  clearSelection() {
    this.listVehicleBrand = [];
    this.listVehicleModel = [];
    this.listVehicleYear = [];
    this.selectedOptionVehicle = 'none';
    this.selectedOptionBrand = '';
    this.selectedOptionModel = '';
    this.selectedOptionYear = '';
    this.listVehicleGeneral = this.listVehicleGeneralVoid;
    this.disableSelectModel = true;
    this.disableSelectBrand = true;
    this.disablSelectYear = true;
  }

  convertRSaCOP(rs: number): number {
    const exchangeRate = 801.44;
    const value = rs * exchangeRate;
    return parseFloat(value.toFixed(2));
  }

  parseCurrency(text: string): number {
    let numericString = text.replace(/[^0-9.,]/g, '');
    numericString = numericString.replace(/\./g, '');
    numericString = numericString.replace(/,/g, '.');
    return parseFloat(numericString);
  }
}
