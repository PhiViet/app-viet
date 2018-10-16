import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtermessage',
    pure: false
})

export class MesagePipe implements PipeTransform {
    transform(users: any, name: string): any {
        let userFilter = users.filter(user => {
            return user.name === name;
        });
        return userFilter;
    }
}