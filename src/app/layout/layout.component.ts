import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ApiService} from '../api.service';


let dragged: HTMLElement | null = null

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  private _layoutName: string = '';
  elements = ['1', '2', '3', '4', '5'];

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {
  }


  get layoutName(): string {
    this._layoutName = this.route.snapshot.paramMap.get('number') || ''
    return this._layoutName;
  }

  ngOnInit(): void {
    this.layoutName
  }

  ngAfterViewInit(): void {

    this.setupElements()
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd)
        this.setupElements()
    })

    const container = document.getElementsByClassName('elements-container')[0] as HTMLElement
    container.addEventListener('dragover', e => e.preventDefault(), false)
    container.addEventListener('drop', (e: DragEvent) => {
      e.preventDefault()
      const target = e.target as HTMLElement
      if (target.classList.contains('element'))
        this.relocateElement(target);
    }, false)

  }

  private relocateElement(target: HTMLElement) {
    if (!dragged)
      return
    // @ts-ignore
    const t = target.pos
    // @ts-ignore
    target.pos = dragged.pos
    // @ts-ignore
    target.style.gridRow = '' + target.pos
    dragged.style.gridRow = '' + t
    // @ts-ignore
    dragged.pos = t
    this.savePositions()
  }

  private async setupElements() {

    const config = (await this.api.loadLayoutConfig(this.layoutName))
      || await this.resetLayout()

    for (let [name, pos] of Object.entries(config.positions)) {
      const e = document.getElementsByClassName('element ' + name)[0] as HTMLElement
      if (!e) // if we don't have an element that is mentioned in the config
        continue

      e.setAttribute('draggable', 'true')
      e.addEventListener('dragstart', function (e: DragEvent) {
        dragged = e.target as HTMLElement
      }, false)

      e.style.gridRow = '' + pos
      e.style.gridColumn = '1'
      // @ts-ignore
      e.pos = pos // keeping it as simple raw number to simplify handling
    }
  }

  private async savePositions() {
    const conf = {
      positions: {}
    };
    for (let eName of this.elements) {
      const e = document.getElementsByClassName('element ' + eName)[0] as HTMLElement
      // @ts-ignore
      conf.positions[eName] = e.pos
    }
    await this.api.writeLayoutConfig(this.layoutName, conf)
  }

  public async resetAndRefresh() {
    await this.resetLayout()
    location.reload()
  }

  private async resetLayout() {
    const conf = {
      positions: (() => this.elements.reduce((a, c, i) => {
        // @ts-ignore
        a[c] = i + 1
        return a
      }, {}))()
    }
    await this.api.writeLayoutConfig(this.layoutName, conf)
    return conf
  }

}

