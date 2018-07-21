import { element } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort'
})

export class SortPipe implements PipeTransform {
    transform(array: Array<any>): any {

        let temp = [];
        array.forEach(element => {
            temp.push(Number(element.img));
        });
        temp.sort((a, b) => a - b);
        return temp;
    }
}