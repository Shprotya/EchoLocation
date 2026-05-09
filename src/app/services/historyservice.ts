import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface HistoryRecord {
  _id?: string;
  country: string;
  trackName: string;
  artist: string;
  exploredAt?: string;
}

@Injectable({ providedIn: 'root' })
export class HistoryService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/api/history`;

  getAll(): Observable<HistoryRecord[]> {
    return this.http.get<HistoryRecord[]>(this.baseUrl);
  }

  add(record: Omit<HistoryRecord, '_id' | 'exploredAt'>): Observable<unknown> {
    return this.http.post(this.baseUrl, record);
  }

  delete(id: string): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}