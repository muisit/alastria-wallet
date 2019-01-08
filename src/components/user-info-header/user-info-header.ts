import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserSettings } from './userSettings/user-settings';
import { ProfilePage } from '../../pages/profile/profile';

@IonicPage()
@Component({
    selector: 'user-info-header',
    templateUrl: 'user-info-header.html',
    styleUrls: ['/user-info-header.scss']
})
export class UserInfoHeader {

    public userName: string;
    public userImagePath: string;

    compact = false;
    fixed = false;

    constructor(public navController: NavController) {
        let user = sessionStorage.getItem("loginName");
        this.userName = user;
        /* TODO: Quitar para poner la imagen correcta */
        this.userImagePath = "./assets/images/avatar/0.jpg";
    }

    public changeHeader(compact: boolean): void {
        this.compact = compact;
        this.fixed = compact;
    }

    public openUserSettings(): void {
        this.navController.push(UserSettings);
    }

    profilePage() {
        // Si estoy en la pagina de Profile no la vuelvo a cargar
        let p = this.navController.getActive();
        if (p.component.name!=='ProfilePage') {
            this.navController.push(ProfilePage);
        }
    }
}
