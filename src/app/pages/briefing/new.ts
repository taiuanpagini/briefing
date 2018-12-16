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
import { DatepickerOptions } from 'ng2-datepicker';
import * as ptLocale from 'date-fns/locale/pt';

declare var $: any;
@Component({
  selector: 'app-briefing-new',
  templateUrl: './new.html'
})
export class BriefingNewComponent implements OnInit {

  selectComboUsuarios: any;
  dadosUser: any;

  options: DatepickerOptions = {
    minYear: 2018,
    displayFormat: 'DD[/]MM[/]YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'ddd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: ptLocale,
    minDate: new Date(),
    barTitleIfEmpty: 'Selecione uma data'
  };

  markedDigital = false;
  theCheckboxDigital = false;
  markedImpSimples = false;
  theCheckboxImpSimples = false;
  markedImpInstitucional = false;
  theCheckboxImpInstitucional = false;
  markedVideo = false;
  theCheckboxVideo = false;
  markedImagem = false;
  theCheckboxImagem = false;
  markedMidia = false;
  theCheckboxMidia = false;

  constructor(
    private Router: Router,
    private SuccessErrorsServices: SuccessErrorsServices,
    public GlobalService: GlobalService,
    public HttpService: HttpService,
    public AlertService: AlertService,
    public StorageService: StorageService,
    public SessionService: SessionService
  ) { }

  ngOnInit() {
    this.GlobalService.setTituloPage();

    //CARREGANDO DADOS INICIAIS
    // this.comboUsuarios();

    $(".selectpicker").selectpicker();
  }

  /************
  POST
  *************/
  postItem(form) {

    if (form.status === 'INVALID') {
      return this.AlertService.alertInfo(this.SuccessErrorsServices.showError(1001));

    } else {

      //ENVIADO DADOS
      this.GlobalService.inProcessForm = true;
      this.AlertService.alertLoadingShow();

      //DADOS USUÁRIO SESSÃO
      this.dadosUser = JSON.parse(this.StorageService.getItem('dataUser'));

      // console.log(form.value);
      let headerConfig = {
        stsValue: "A",
        deleteValue: "N"
      }
      form.value['id_usuario'] = this.dadosUser.i;
      form.value['nome_usuario'] = this.dadosUser.n;
      this.HttpService.JSON_POST(`/data/briefing/titulo`, headerConfig, form.value)//CADASTRO DE BRIEFINGS
        .then(
          (res) => {
            // this.HttpService.JSON_DELETE(`/mysql/data/item/briefing/${res.json().data[0].hashID}/*/titulo/N`, true, headerConfig)
            form.value['sts'] = 'u';
            this.HttpService.JSON_PUT(`/data/status/deactivate/briefing/${res.json().data[0].hashID}`, headerConfig, form.value, true)
              .then(
                (res) => {
                  Promise.resolve(this.AlertService.alertInfo("O Briefing foi cadastrado com sucesso!"))
                    .then(() => {
                      this.Router.navigate(['/briefing/lista']);
                    }
                    )

                  this.GlobalService.inProcessForm = false;
                  form.reset();
                },
                (error) => {
                  this.AlertService.alertError(JSON.parse(error._body));
                  return false;
                })

            this.GlobalService.inProcessForm = false;
            form.reset();

          },
          (error) => {
            this.GlobalService.inProcessForm = false;
            this.AlertService.alertError(JSON.parse(error._body));
          })

    }

  }

  toggleVisibilityDigital(e) {
    this.markedDigital = e.target.checked;
  }

  toggleVisibilityImpSimples(e) {
    this.markedImpSimples = e.target.checked;
  }

  toggleVisibilityImpInstitucional(e) {
    this.markedImpInstitucional = e.target.checked;
  }

  toggleVisibilityVideo(e) {
    this.markedVideo = e.target.checked;
  }

  toggleVisibilityImagem(e) {
    this.markedImagem = e.target.checked;
  }

  toggleVisibilityMidia(e) {
    this.markedMidia = e.target.checked;
  }

}
