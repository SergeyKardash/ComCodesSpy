import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

constructor(private http: HttpClient) { }

getAllDevices(): Observable<Device[]> {
  return this.http.get<Device[]>('/api/device');
}

}
