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

removeDevice(id) {
  return this.http.delete(`/api/device/${id}`);
}

checkSpyConnections(data) {
  return this.http.post('/api/device/check-spy-connections', data);
}

}
