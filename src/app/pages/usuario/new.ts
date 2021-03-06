/*--------------
V 1.0.0 - Criado por Larner Diogo

DESCIÇÃO:
Component administração de categorias da aplicação


COMPONENTS
***********************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**********************************************************
SERVICES
***********************************************************/
import { GlobalService } from '../../globals/global';
import { HttpService } from '../../globals/http';
import { AlertService } from '../../globals/alert';
import { StorageService } from './../../globals/storage';
import { SuccessErrorsServices } from '../../globals/sucess.errors';
import { SessionService } from '../../globals/session';

declare var $: any;
@Component({
  selector: 'app-usuario-new',
  templateUrl: './new.html'
})
export class UsuarioNewComponent implements OnInit {

  selectComboUsuarios: any;
  selectComboTipos = [
    "Admin",
    "Cliente"
  ]

  constructor(
    private Router: Router,
    private SuccessErrorsServices: SuccessErrorsServices,
    public GlobalService: GlobalService,
    public HttpService: HttpService,
    public AlertService: AlertService,
    public StorageService: StorageService,
    public SessionService: SessionService
  ) {}

  ngOnInit() {
    this.GlobalService.setTituloPage();

    //CARREGANDO DADOS INICIAIS
    this.selectComboTipos;

    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 150);
  }

  /************
  COMBO
  *************/
  // comboUsuarios() {

  //   this.AlertService.alertLoadingShow();
  //   this.GlobalService.inProcessForm = true;
  //   let headerConfig = {
  //     stsValue: "A",
  //     deleteValue: "N"
  //   }
  //   this.HttpService.JSON_GET(`/mysql/data/usuarios/nome/asc/*/id,nome/*`, headerConfig)
  //     .then(
  //     (res) => {
  //       this.selectComboUsuarios = res.json().data;
  //       setTimeout(() => {
  //         $('.selectpicker').selectpicker('refresh');
  //       }, 150);

  //       //CARREGANDO WEBSERVICE APOS CATEGORIAS
  //       this.webService();
  //     },
  //     (error) => {
  //       this.GlobalService.inProcessForm = false;
  //       this.AlertService.alertError(JSON.parse(error._body));
  //     })

  // }

  /************
  WEBSERVICE
  *************/
  // webService() {

  //   this.HttpService.JSON_GET(`/sync/now`, '')
  //     .then(
  //     (res) => {

  //       this.AlertService.alertLoadingClose();
  //       this.GlobalService.inProcessForm = false;

  //        //NOTIFICACAO
  //       if(res.json().data){ this.SessionService.alertNotify('Nova notificação', res.json().data, 'info') }

  //       setTimeout(() => {
  //         $('.selectpicker').selectpicker('refresh');
  //       }, 150);
  //     },
  //     (error) => {
  //       this.GlobalService.inProcessForm = false;
  //       this.AlertService.alertError(JSON.parse(error._body));
  //     })

  // }

  /************
  POST
  *************/
  postItem(form) {

    if (form.status === 'INVALID') {
      return this.AlertService.alertInfo(this.SuccessErrorsServices.showError(1001));

    }else{

      //ENVIADO DADOS
      this.GlobalService.inProcessForm = true;
      this.AlertService.alertLoadingShow();

      let headerConfig = {
        stsValue: "A",
        deleteValue: "N"
      }
      this.HttpService.JSON_POST(`/auth/user/usuarios/email/senha/nome`, headerConfig, form.value)//CADASTRO DE USUARIOS
      //this.HttpService.JSON_POST(`/mysql/data/distribuidor/nome`, headerConfig, form.value)//CADASTROS GERAIS
        .then(
        (res) => {
          
          Promise.resolve(this.AlertService.alertInfo(res.json().msg))
          .then(() => { this.Router.navigate(['/usuario/lista']); })

          this.GlobalService.inProcessForm = false;
          form.reset();

        },
        (error) => {
          this.GlobalService.inProcessForm = false;
          this.AlertService.alertError(JSON.parse(error._body));
        })

    }

  }

}
