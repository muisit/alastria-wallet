import { Component } from '@angular/core';

import { SecuredStorageService } from '../../services/securedStorage.service';
import { Router } from '@angular/router';
import { MessageManagerService } from 'src/app/services/messageManager-service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { parseCredentials } from 'src/utils';

@Component({
    selector: 'tabsPage',
    templateUrl: 'tabsPage.html',
    styleUrls: ['/tabsPage.scss']
})
export class TabsPage {

    login: any = {};
    tabs: any = {};
    isLoged: boolean;


    constructor(
        private messageManagerService: MessageManagerService,
        private deeplinks: Deeplinks,
        private router: Router,
        private securedStrg: SecuredStorageService,
    ) {
            this.securedStrg.hasKey('loginType').then(
                () => {
                    this.isLoged = true;
                }
            ).catch(
                () => {
                    this.isLoged = false;
                    this.router.navigateByUrl('/home');
                }
            );

            this.setTabsParams();

            const token = this.router.getCurrentNavigation().extras.state.token;
            this.checkTokenAndPrepare(token);

            this.deeplinks.route({
                '/': TabsPage,
                '/login': TabsPage,
                '/createCredentials': TabsPage,
                '/createPresentations': TabsPage
            }).subscribe(
                (match: any) => {
                    const path = (match &&  match.$link) ? match.$link.path : null;
                    this.controlDeeplink(path, match.$args);
                },
                (noMatch: any) => {
                    console.log('No Match ', noMatch);
                }
            );
    }

    checkTokenAndPrepare(token: any) {
        if (token) {
            this.messageManagerService.prepareDataAndInit(token, true);
            this.router.getCurrentNavigation().extras.state.token = null;
        }
    }

        private controlDeeplink(path: string, args: any) {
        switch (path) {
            case '/createCredentials':
                const credentials = parseCredentials(args.credentials);

                this.checkTokenAndPrepare(credentials);

                break;

            case '/login':
            case '/createPresentations':
                this.checkTokenAndPrepare(args.alastriaToken);

                break;

            default:

                break;
        }
    }

    setTabsParams() {
        this.tabs.data = [
            { page: 'Index', icon: 'home', title: 'Inicio' },
            { page: 'Activity', icon: 'act', title: 'Actividad' },
            { page: 'Camera', icon: 'leerQr', title: 'Leer Qr' },
            { page: 'Notification', icon: 'bell', title: 'Avisos' },
            { page: 'Options', icon: 'more', title: 'Mas' }
        ];
    }

}
