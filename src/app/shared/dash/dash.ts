/*--------------
V 1.0.0 - Criado por Larner Diogo

DESCIÇÃO:
Component compartilhado Dashboard (tela inicial) da aplicacao


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
import { StorageService } from '../../globals/storage';
import { NgbModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;
@Component({
  selector: 'app-dash',
  templateUrl: './dash.html'
})
export class DashComponent implements OnInit {

  dadosUser: any;
  images: any;

  dataHoje: Date = new Date();

  //CARDS
  usuariosAtivos: any = [];

  //CARDS
  dataCards: any = [];

  //GRAFICO PEDIDOS
  dataPedidos: any = [];
  labelPedidos: any = [];

  //GRAFICO FATURAMENTO
  dataFaturamento: any = [];
  labelFaturamento: any = [];

  //GRAFICO CAIXA
  dataCaixa: any = [];
  labelCaixa: any = [];

  //GRAFICO VENCIMENTOS
  dataVencimentos: any = [];
  labelVencimentos: any = [];


  itensAdmin: any;
  itensCliente: any;
  headers: any;
  model: any;

  constructor(
    private Router: Router,
    public GlobalService: GlobalService,
    public HttpService: HttpService,
    public AlertService: AlertService,
    public StorageService: StorageService,
  ) { 
    //CARREGANDO ITENS INICIAIS
    this.getItensCliente();
    this.getItensAdmin();
  }

  ngOnInit() {
    this.GlobalService.setTituloPage();

    //CARREGANDO ITENS INICIAIS
    this.GlobalService.getSaudacao();
    this.dadosUser = JSON.parse(this.StorageService.getItem('dataUser'));
  }

  /************
  GET CLIENTE
  *************/
  getItensCliente() {
    let dadosUser = JSON.parse(this.StorageService.getItem('dataUser'));
    this.AlertService.alertLoadingShow();

    let headerConfig = {
      stsValue: "A",
      deleteValue: "N"
    }
    this.HttpService.JSON_GET(`/data/briefing/id/desc/id_usuario=${dadosUser.i},briefing.sts=u/id,hashID,sts,titulo,nome_usuario as 'Empresa',digital as Digital,imp_simples as 'Impresso Simples',imp_institucional as 'Impresso Institucional',video as Video,imagem as Imagem,midia as 'Midia Out of Home',prazo_inicio,prazo_fim/*`, headerConfig)
      .then(
        (res) => {
          this.AlertService.alertLoadingClose();
          if (res.json().length === 0) {
            this.itensCliente = [];
            this.GlobalService.notItens = true;
          } else {
            this.itensCliente = res.json().data;
            this.GlobalService.notItens = false;
            this.headers = Object.keys(this.itensCliente[0]);
          }
        },
        (error) => {
          this.GlobalService.notItens = true;
          this.itensCliente = [];
          this.AlertService.alertError(JSON.parse(error._body));
        })

  }

  /************
  GET ADMIN
  *************/
  getItensAdmin() {
    let dadosUser = JSON.parse(this.StorageService.getItem('dataUser'));
    this.AlertService.alertLoadingShow();

    let headerConfig = {
      stsValue: "A",
      deleteValue: "N"
    }
    this.HttpService.JSON_GET(`/data/briefing/id/desc/briefing.sts=u/id,hashID,sts,titulo,nome_usuario as 'Empresa',digital as Digital,imp_simples as 'Impresso Simples',imp_institucional as 'Impresso Institucional',video as Video,imagem as Imagem,midia as 'Midia Out of Home',prazo_inicio,prazo_fim/*`, headerConfig)
      .then(
        (res) => {
          this.AlertService.alertLoadingClose();
          if (res.json().length === 0) {
            this.itensAdmin = [];
            this.GlobalService.notItens = true;
          } else {
            this.itensAdmin = res.json().data;
            this.GlobalService.notItens = false;
            this.headers = Object.keys(this.itensAdmin[0]);
          }
        },
        (error) => {
          this.GlobalService.notItens = true;
          this.itensAdmin = [];
          this.AlertService.alertError(JSON.parse(error._body));
        })

  }

  /************
  EDIT
  *************/
  editItemCliente(event) {
    this.Router.navigate([`/briefing/${event.id}`]);
  }
  editItemAdmin(event) {
    this.Router.navigate([`/briefing/${event.id}`]);
  }

  /************
  VIEW
  *************/
  viewItemCliente(event) {
    this.Router.navigate([`/briefing/${event.id}/visualizar`]);
  }
  viewItemAdmin(event) {
    this.Router.navigate([`/briefing/${event.id}/visualizar`]);
  }

  /************
  DETELE
  *************/
  deleteItemCliente(event) {
    return Promise.resolve(
      this.AlertService.alertConfirm('Excluir item?', 'Tem certeza que deseja excluir o item?')
    )
      .then(res => {

        if (res == true) {

          this.AlertService.alertLoadingShow();
          this.HttpService.JSON_DELETE(`/data/item/briefing/${event.id}/*/nome/S`, true, true)
            .then(
              (res) => {
                this.getItensCliente();
                return true;
              },
              (error) => {
                this.AlertService.alertError(JSON.parse(error._body));
                return false;
              })

        } else {
          return false;
        }
      })
  }
  deleteItemAdmin(event) {
    return Promise.resolve(
      this.AlertService.alertConfirm('Excluir item?', 'Tem certeza que deseja excluir o item?')
    )
      .then(res => {

        if (res == true) {

          this.AlertService.alertLoadingShow();
          this.HttpService.JSON_DELETE(`/data/item/briefing/${event.id}/*/nome/S`, true, true)
            .then(
              (res) => {
                this.getItensAdmin();
                return true;
              },
              (error) => {
                this.AlertService.alertError(JSON.parse(error._body));
                return false;
              })

        } else {
          return false;
        }
      })
  }

  /************
  DESATIVAR
  *************/
  desativarItemCliente(event) {
    console.log(event);
    return Promise.resolve(
      this.AlertService.alertConfirm('Desativar briefing?', 'Tem certeza que deseja desativar o briefing?')
    )
      .then(res => {

        if (res == true) {
          this.AlertService.alertLoadingShow();
          let headerConfig = {
            stsValue: "A",
            deleteValue: "N"
          }
          this.HttpService.JSON_DELETE(`/data/item/briefing/${event.id}/*/titulo/N`, true, headerConfig)
            .then(
              (res) => {
                this.getItensCliente();
                return true;
              },
              (error) => {
                this.AlertService.alertError(JSON.parse(error._body));
                return false;
              })

        } else {
          return false;
        }
      })
  }
  desativarItemAdmin(event) {
    console.log(event);
    return Promise.resolve(
      this.AlertService.alertConfirm('Desativar briefing?', 'Tem certeza que deseja desativar o briefing?')
    )
      .then(res => {

        if (res == true) {
          this.AlertService.alertLoadingShow();
          let headerConfig = {
            stsValue: "A",
            deleteValue: "N"
          }
          this.HttpService.JSON_DELETE(`/data/item/briefing/${event.id}/*/titulo/N`, true, headerConfig)
            .then(
              (res) => {
                this.getItensAdmin();
                return true;
              },
              (error) => {
                this.AlertService.alertError(JSON.parse(error._body));
                return false;
              })

        } else {
          return false;
        }
      })
  }

  /************
  ATIVAR
  *************/
  ativarItemCliente(event) {
    // console.log(event);

    this.model = {
      sts: "A",
      deleted: "N"
    }
    return Promise.resolve(
      this.AlertService.alertConfirm('Ativar briefing?', 'Tem certeza que deseja ativar o briefing?')
    )
      .then(res => {

        if (res == true) {
          this.AlertService.alertLoadingShow();
          let headerConfig = {
            stsValue: "A",
            deleteValue: "N"
          }
          this.HttpService.JSON_PUT(`/data/status/activate/briefing/${event.id}`, headerConfig, this.model, true)
            .then(
              (res) => {
                this.getItensCliente();
                return true;
              },
              (error) => {
                this.AlertService.alertError(JSON.parse(error._body));
                return false;
              })

        } else {
          return false;
        }
      })
  }
  ativarItemAdmin(event) {
    // console.log(event);

    this.model = {
      sts: "A",
      deleted: "N"
    }
    return Promise.resolve(
      this.AlertService.alertConfirm('Ativar briefing?', 'Tem certeza que deseja ativar o briefing?')
    )
      .then(res => {

        if (res == true) {
          this.AlertService.alertLoadingShow();
          let headerConfig = {
            stsValue: "A",
            deleteValue: "N"
          }
          this.HttpService.JSON_PUT(`/data/status/activate/briefing/${event.id}`, headerConfig, this.model, true)
            .then(
              (res) => {
                this.getItensAdmin();
                return true;
              },
              (error) => {
                this.AlertService.alertError(JSON.parse(error._body));
                return false;
              })

        } else {
          return false;
        }
      })
  }

}
