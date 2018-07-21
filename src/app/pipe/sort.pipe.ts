import { element } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort'
})

export class SortPipe implements PipeTransform {
    transform(array: Array<any>): any {

        let temp = [];
        array.forEach(element => {
            console.log(element.img);
            temp.push(Number(element.img));
        });
        console.log(temp);
        temp.sort((a, b) => a - b);
        // temp.sort((a, b) => b -a);

        console.log(temp);

        return temp;
    }
}

/**
 *  transform(array: Array<any>, args: string): Array<any> {
        // Do YOUR LOGIC HERE, like this code below

        array.sort((a: any, b: any) => {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
 */