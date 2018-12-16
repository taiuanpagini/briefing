/*--------------
V 1.0.0 - Criado por Larner Diogo - PADRONIZADO

DESCIÇÃO:
Servico global de conexão


COMPONENTS
***********************************************************/
import { Injectable } from '@angular/core';

/***********************************************************
SERVICES
***********************************************************/

declare var $: any;
@Injectable()
export class ConnectService {

    configConnect = {
        
        dbConfig:{
            host: "duaspolegadas.com",
            user: "duaspole_briefing",
            password: "@A123mudar",
            database: "duaspole_briefing",
        },
        
        ftpConfig:{
            host: "duaspolegadas.com",
            user: "duaspole",
            password: "Xt3yw76Ph4",

        },
        
        mailConfig: {
            connect: {
                host: "smtp.gmail.com",
                user: "taiuan.pagini@gmail.com",
                password: "030312Tm",
                ssl: true
            },
            extras: {
                fromName: "Atendimento Personalizado Via Site",
                fromEmail: "contato@resortdolago.com.br",
                toName: "Atendimento Personalizado Via Site",
                toEmail: "comercial.hotel@resortdolago.com.br"
            } 
        },
        
        tokenTable: "usuarios",
        tokenFieldName: "token",
        token: null,

        idFieldName: "hashID",

        stsFieldName: "sts",
        stsValue: "A",

        createFieldName: 'created',
        updateFieldName: 'updated',

        deleteFieldName: "deleted",
        deleteValue: "N"
    }

    constructor() { }

}