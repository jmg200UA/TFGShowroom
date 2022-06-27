import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"


@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css',
              "../../../../../node_modules/keen-slider/keen-slider.min.css"]
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>

  slider: KeenSliderInstance = null

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      rtl: true,
      slides: {
        perView: 3,
        spacing: 10,
      },
    })
  }


}
