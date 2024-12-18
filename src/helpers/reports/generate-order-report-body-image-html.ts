import moment from 'moment';
import { iProduct } from '../../interfaces';

export function generateBodyImageHtml(username: string, clientName: string, address: string, deliveryDate: Date, products: iProduct[], shouldGenerateFooter: boolean) {
  let body = `
        ${generateHeader(username)}
        ${clientName || address || deliveryDate ? generateClientInfo(clientName, address, deliveryDate) : ''}
        ${generateProductsTable(products)}
        ${generateSummary(products)}
        ${shouldGenerateFooter ? generateFooter() : `<b style="font-size: 42px">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>`}
      `;

  return body;
}

function generateHeader(username: string) {
  return `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
            <b style="font-size: 42px">${username.toUpperCase()}</b>
            <b style="font-size: 42px">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>
        </div>
    `;
}

function generateClientInfo(clientName: string, address: string, deliveryDate: Date) {
  return `          
        <div style="display: flex; flex-direction: column;" >
            ${
              deliveryDate
                ? `<div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" > <b style="font-size: 42px">AGENDADO PARA: </b> <b style="font-size: 42px">${deliveryDate.toLocaleDateString(
                    'pt-br',
                  )}</b> </div>`
                : ''
            }
            ${
              clientName
                ? `<div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" > <b style="font-size: 42px">CLIENTE: </b> <b style="font-size: 42px">${clientName.toUpperCase()}</b> </div>`
                : ''
            }
            ${
              address
                ? `<div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" > <b style="font-size: 42px">ENDEREÇO: </b> <b style="font-size: 42px">${address.toUpperCase()}</b> </div>`
                : ''
            }
            <b style="font-size: 42px">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>
        </div>
    `;
}

function generateProductsTable(products: iProduct[]) {
  let header = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
            <b style="font-size: 42px">${'PEDIDO'}</b>
            <b style="font-size: 42px">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>
          </div>
          <div style="display: flex; flex-direction: row; align-items: center; width: 100%" >
            <div style="width: 10%; display: flex; align-items: center; justify-content: flex-start;">
                <b style="font-size: 42px">QTD</b>
            </div>
            <div style="width: 45%; display: flex; align-items: center; justify-content: center;">
                <b style="font-size: 42px">DESCRIÇÃO</b>
            </div>
            <div style="width: 20%;  display: flex; align-items: center; justify-content: center;">
                <b style="font-size: 42px">P.UNIT</b>
            </div>
            <div style="width: 25%;  display: flex; align-items: center; justify-content: flex-end;">
                <b style="font-size: 42px">SUBTOTAL</b>
            </div>
          </div>
        `;

  let productsRow = ``;

  for (const product of products) {
    productsRow += `
            <div style="display: flex; flex-direction: row; align-items: center; width: 100%" >
                <div style=" display: flex; width: 10%; align-items: center; justify-content: flex-start;">
                    <b style="font-size: 42px">${product.quantity}</b>
                </div>
                <div style=" display: flex; width: 45%; align-items: center; justify-content: center;">
                    <b style="font-size: 42px">${product.description}</b>
                </div>
                <div style=" display: flex; width: 20%; align-items: center; justify-content: center;">
                    <b style="font-size: 42px">R$ ${product.price?.toFixed(2)}</b>
                </div>
                <div style=" display: flex; width: 25%; align-items: center; justify-content: flex-end;">
                    <b style="font-size: 42px">R$ ${(product.quantity! * product.price!).toFixed(2)}</b>
                </div>
            </div>
            `;
  }

  return header.concat(productsRow);
}

function generateSummary(products: iProduct[]) {
  let totalItems = 0;
  let total = 0;

  for (const product of products) {
    totalItems += product.quantity!;
    total += product.quantity! * product.price!;
  }

  return `
        <b style="font-size: 42px">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
            <b style="font-size: 42px">RESUMO DO PEDIDO</b>
            <b style="font-size: 42px">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>
          </div>
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" >
            <b style="font-size: 42px">QUANT. ITENS</b>
            <b style="font-size: 42px">TOTAL</b>
          </div>
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" >
            <b style="font-size: 42px">${totalItems}</b>
            <b style="font-size: 42px">R$ ${total.toFixed(2)}</b>
          </div>
  `;
}

function generateFooter() {
  const date = moment();
  return `
    <b style="font-size: 42px">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 55px">
          <b style="font-size: 55px">***ESTE NÃO É UM TICKET FISCAL***</b>
          <b style="font-size: 42px; text-align: center; margin-top: 55px">Ticket gerado em  ${date.toDate().toLocaleString('pt-br')}.</b>
      </div>
      `;
}
