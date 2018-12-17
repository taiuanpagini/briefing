/*--------------
V 1.0.0 - Criado por Larner Diogo

DESCIÇÃO:
Component Clientes da aplicação


COMPONENTS
***********************************************************/
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**********************************************************
SERVICES
***********************************************************/
import { GlobalService } from '../../globals/global';
import { HttpService } from '../../globals/http';
import { AlertService } from '../../globals/alert';
import { StorageService } from './../../globals/storage';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

declare var $: any;
@Component({
  selector: 'app-briefing-view',
  templateUrl: './view.html'
})
export class BriefingViewComponent implements OnInit {

  itemCarregado: any = null;
  itens: any;
  headers: any;
  model: any;
  dadosUser: any;

  constructor(
    private Router: Router,
    public GlobalService: GlobalService,
    public HttpService: HttpService,
    public AlertService: AlertService,
    public StorageService: StorageService,
    public ActivatedRoute: ActivatedRoute
  ) {
  }

  /************
  GET CLIENTE
  *************/
  getItem() {
    this.ActivatedRoute.params.subscribe(params => {


      // this.HttpService.JSON_GET(`/data/item/briefing/${params.id}/*/titulo`, headerConfig)
      let headerConfig = {
        stsValue: "A",
        deleteValue: "N"
      }
      this.HttpService.JSON_GET(`/data/item/briefing/${params.id}/*/*/*/S`, false)
        .then(
          (res) => {

            // console.log(res.json());
            this.AlertService.alertLoadingClose();
            if (res.json().length === 0) {
              this.GlobalService.notItens = true;
            } else {
              this.itemCarregado = res.json().data;
              console.log(this.itemCarregado);
              setTimeout(() => {
                $('.selectpicker').selectpicker('refresh');
              }, 150);
            }
          },
          (error) => {
            this.GlobalService.notItens = true;
            this.AlertService.alertError(JSON.parse(error._body));
          })
    })
  }

  /************
  ATIVAR
  *************/
  ativarItem() {
    // console.log(event);
    this.ActivatedRoute.params.subscribe(params => {
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
            this.HttpService.JSON_PUT(`/data/status/activate/briefing/${params.id}`, headerConfig, this.model, true)
              .then(
                (res) => {
                  this.getItem();
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
    })
  }

  tipoBriefing() {
    if (this.itemCarregado.digital == 1) {
      return "Digital"
    } else if (this.itemCarregado.imp_simples == 1) {
      return "Impresso Simples"
    } else if (this.itemCarregado.imp_institucional == 1) {
      return "Impresso Institucional"
    } else if (this.itemCarregado.video == 1) {
      return "Vídeo"
    } else if (this.itemCarregado.imagem == 1) {
      return "Imagem"
    } else if (this.itemCarregado.midia == 1) {
      return "Mídia Out of Home"
    }
  }

  // @ViewChild('content') content: ElementRef;
  // public downloadPDF() {
  //   let doc = new jsPDF();

  //   let specialElementHandlers = {
  //     '#editor': function(element, rederer) {
  //       return true;
  //     }
  //   };

  //   let content = this.content.nativeElement;

  //   doc.fromHTML(content.innerHTML, 15, 15);

  //   doc.save(this.itemCarregado.id+'_'+this.itemCarregado.titulo+'_'+this.itemCarregado.nome_usuario+'.pdf');

  //   // doc.text(content.innerHTML, 10, 10);
  //   // doc.output("dataurlnewwindow");
  // }

  public downloadPDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 188;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 10;
      pdf.setFontSize(40);
      pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight)
      pdf.save(this.itemCarregado.id + '_' + this.itemCarregado.titulo + '_' + this.itemCarregado.nome_usuario + '.pdf');
    });
  }

  ngOnInit() {
    this.GlobalService.setTituloPage();

    //DADOS USUÁRIO SESSÃO
    this.getItem();
    return this.dadosUser = JSON.parse(this.StorageService.getItem('dataUser'));
  }

}
