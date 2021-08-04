import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  layouts = new Subject()

  private cachedLayouts: { [l: string]: any } = {}
  private layoutVisibility: { [l: string]: boolean } = {'1': true}

  constructor() {
    this.getVisibleLayouts().then(ls => this.layouts.next(ls))
  }

  async loadLayoutConfig(layoutName: string) {
    return this.cachedLayouts[layoutName]
  }

  async writeLayoutConfig(layoutName: string, conf: any) {
    this.cachedLayouts[layoutName] = conf
  }

  async getLayoutVisibility(layout: any) {
    return this.layoutVisibility[layout]
  }

  async setLayoutVisibility(layout: any, b: boolean) {
    this.layoutVisibility[layout] = b

    this.layouts.next(await this.getVisibleLayouts())
  }

  async getVisibleLayouts() {
    return Object.entries(this.layoutVisibility).filter(([k, v]) => v).map(([k, v]) => k)
  }
}
