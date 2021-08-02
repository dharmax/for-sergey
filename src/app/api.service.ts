import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {
  }

  private cachedLayouts: { [l: string]: any } = {}
  private layoutVisibility: { [l: string]: boolean } = {'1':true}

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
  }
  async getVisibleLayouts() {
    return Object.entries(this.layoutVisibility).filter( ([k,v]) => v ).map( ([k,v])=>k)
  }
}
