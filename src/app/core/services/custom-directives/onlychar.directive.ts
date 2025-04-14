import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlychar]'
})
export class OnlycharDirective {

  constructor(private elementRef:ElementRef) { }

  @HostListener("input",["$event"])
  onChange(event:any){
    const value = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value = value.replace(/[^A-Za-z]/g,'')
  }

}
