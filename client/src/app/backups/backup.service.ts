import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackupService {

constructor(private http: HttpClient) { }

getAllBackups(): Observable<any> {
  return this.http.get('/api/backup');
}

postBackup(backup) {
  return this.http.post('/api/backup', backup);
}

openTetrisUrl(data) {
  return this.http.post('/api/backup/open-tetris-url', data);
}

openCleanerUrl (data) {
  return this.http.post('/api/backup/open-cleaner-url', data);
}

}
