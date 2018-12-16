/*--------------
V 1.0.0 - Criado por Larner Diogo

DESCIÇÃO:
Roteamento (admin) da aplicacao


COMPONENTS
***********************************************************/
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**********************************************************
GUARDS
***********************************************************/
import { GuardService } from './globals/guard';

/**********************************************************
PAGES
***********************************************************/
import { isLoggedLayout } from './isLogged';
import { noLoggedLayout } from './noLogged';

import { LoginComponent } from './shared/login/login';
import { LockComponent } from './shared/lock/lock';

import { DashComponent } from './shared/dash/dash';

import { SuporteTecnicoComponent } from './shared/suporte/suporte';
import { RecuperarSenhaComponent } from './shared/recuperar-senha/recuperar-senha';

import { UsuarioListComponent } from './pages/usuario/list';
import { UsuarioNewComponent } from './pages/usuario/new';
import { UsuarioEditComponent } from './pages/usuario/edit';
import { UsuarioPerfilComponent } from './pages/usuario/perfil';
import { UsuarioSenhaComponent } from './pages/usuario/senha';
import { BriefingListComponent } from './pages/briefing/list';
import { BriefingNewComponent } from './pages/briefing/new';
import { BriefingEditComponent } from './pages/briefing/edit';
import { BriefingViewComponent } from './pages/briefing/view';

export const Routing: Routes = [

  //ROTA PROTEGIDA
  {
    path: '',
    canActivate: [GuardService],
    component: isLoggedLayout,
    children: [

      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

      /*DASHBOARD*/
      {
        path: '',
        component: DashComponent,
        data: {
          title: 'Dashboard'
        }
      },

      /*MODELO USUARIOS*/
      {
        path: 'usuario/lista',
        component: UsuarioListComponent,
        data: {
          title: 'Gerenciar itens'
        }
      },
      {
        path: 'usuario/novo',
        component: UsuarioNewComponent,
        data: {
          title: 'Adicionar item'
        }
      },
      {
        path: 'usuario/:id',
        component: UsuarioEditComponent,
        data: {
          title: 'Editar item'
        }
      },
      {
        path: 'usuario/:id/editar-perfil',
        component: UsuarioPerfilComponent,
        data: {
          title: 'Editar item'
        }
      },
      {
        path: 'usuario/:id/alterar-senha',
        component: UsuarioSenhaComponent,
        data: {
          title: 'Editar item'
        }
      },
      {
        path: 'briefing/lista',
        component: BriefingListComponent,
        data: {
          title: 'Gerenciar itens'
        }
      },
      {
        path: 'briefing/novo',
        component: BriefingNewComponent,
        data: {
          title: 'Adicionar item'
        }
      },
      {
        path: 'briefing/:id',
        component: BriefingEditComponent,
        data: {
          title: 'Editar item'
        }
      },
      {
        path: 'briefing/:id/visualizar',
        component: BriefingViewComponent,
        data: {
          title: 'Visualizar item'
        }
      },

      /*SUPORTE TECNICO*/
      {
        path: 'suporte',
        component: SuporteTecnicoComponent,
        data: {
          title: 'Suporte Técnico'
        }
      },

    ]
  },

  //ROTA GERAL
  {
    path: '',
    component: noLoggedLayout,
    children: [

      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Acesso restrito'
        }
      },

      {
        path: 'recuperar-senha',
        component: RecuperarSenhaComponent,
        data: {
          title: 'Acesso restrito'
        }
      },

      /*LOCK*/
      {
        path: 'lock',
        component: LockComponent,
        data: {
          title: 'Sessão Bloqueada'
        }
      },

    ]
  },

];
