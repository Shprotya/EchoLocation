import { Component, inject, OnInit, signal } from '@angular/core';
import { HistoryService, HistoryRecord } from '../../services/historyservice';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stats',
  imports: [DatePipe],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class Stats implements OnInit {
  private historyService = inject(HistoryService);
  records = signal<HistoryRecord[]>([]);

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.historyService.getAll().subscribe({
      next: records => this.records.set(records),
      error: () => console.error('Could not load history')
    });
  }

  delete(id: string): void {
    this.historyService.delete(id).subscribe({
      next: () => this.records.update(r => r.filter(x => x._id !== id))
    });
  }
}