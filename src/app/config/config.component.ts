import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  allLayout = ['1', '2', '3', '4'];
  private visibleLayouts: string[] = []

  constructor(private api: ApiService) {
  }

  async ngOnInit() {
    await this.readLayoutVisibility();
  }

  private async readLayoutVisibility() {
    this.visibleLayouts = await this.api.getVisibleLayouts()
  }

  getLayoutVisibility(layout: string) {
    return this.visibleLayouts.includes(layout)
  }

  async changeLayoutVisibility(layout: any) {
    await this.api.setLayoutVisibility(layout, !this.getLayoutVisibility(layout))
    await this.readLayoutVisibility()
  }
}
