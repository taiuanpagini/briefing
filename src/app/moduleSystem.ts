/*--------------
V 1.0.0 - Criado por Larner Diogo

DESCIÇÃO:
Modulo para rotas (admin) da aplicacao


COMPONENTS
***********************************************************/
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgDatepickerModule } from 'ng2-datepicker';

/***********************************************************
ROTEADOR
***********************************************************/
import { Routing } from './routingSystem';

/***********************************************************
SERVICES
***********************************************************/
import { GuardService } from './globals/guard';
import { SessionService } from './globals/session';
import { HttpService } from './globals/http';

/***********************************************************
GLOBALS - SHAREDS
***********************************************************/
import { SideBarComponent } from './shared/sidebar/sidebar';
import { NavBarComponent } from './shared/navbar/navbar';

/***********************************************************
COMPONENTS
***********************************************************/
import { DataTableComponent } from './components/data-table/index';
import { BackButtonComponent } from './components/back-button/index';

/***********************************************************
PAGES
***********************************************************/
import { isLoggedLayout } from './isLogged';
import { noLoggedLayout } from './noLogged';

import { LoginComponent } from './shared/login/login';
import { LockComponent } from './shared/lock/lock';

import { DashComponent } from './shared/dash/dash';
import { NgxEditorModule } from 'ngx-editor';
import { NgbModule, NgbCarouselConfig, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

import { SuporteTecnicoComponent } from './shared/suporte/suporte';
import { RecuperarSenhaComponent } from './shared/recuperar-senha/recuperar-senha';
import { sanitizeHtmlPipe } from './globals/sanitize-html.pipe';

import { UsuarioListComponent } from './pages/usuario/list';
import { UsuarioNewComponent } from './pages/usuario/new';
import { UsuarioEditComponent } from './pages/usuario/edit';
import { UsuarioSenhaComponent } from './pages/usuario/senha';
import { UsuarioPerfilComponent } from './pages/usuario/perfil';
import { BriefingNewComponent } from './pages/briefing/new';
import { BriefingListComponent } from './pages/briefing/list';
import { BriefingEditComponent } from './pages/briefing/edit';
import { BriefingViewComponent } from './pages/briefing/view';

@NgModule({
    declarations: [

        /*COMPONENTS*/
        DataTableComponent,
        BackButtonComponent,
        
        /*GLOBALS - SHAREDS*/
        SideBarComponent,
        NavBarComponent,

        isLoggedLayout,
        noLoggedLayout,
        LoginComponent,
        RecuperarSenhaComponent,
        LockComponent,
        DashComponent,
        
        /*PAGES*/        
        UsuarioListComponent,
        UsuarioNewComponent,
        UsuarioEditComponent,
        UsuarioPerfilComponent,
        UsuarioSenhaComponent,
        BriefingListComponent,
        BriefingNewComponent,
        BriefingEditComponent,
        BriefingViewComponent,
        SuporteTecnicoComponent,

        sanitizeHtmlPipe
    ],
    imports: [
        HttpClientModule,
        HttpModule,
        FormsModule,
        CommonModule,
        ChartsModule,
        NgxPaginationModule,
        NgxMaskModule.forRoot(),
        CurrencyMaskModule,
        NgDatepickerModule,
        OrderModule,
        NgxEditorModule,
        NgbModule,
        TooltipModule.forRoot(),
        RouterModule.forChild(Routing)
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    providers: [
        GuardService,
        SessionService,
        HttpService,
        CurrencyPipe,
        DatePipe,
        NgbCarouselConfig,
        NgbAccordionConfig
    ],
    exports: [
        sanitizeHtmlPipe
    ],
})
export class Module { }
