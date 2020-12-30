import { LightningElement,api,track } from 'lwc';
import getParentItemList from '@salesforce/apex/ItemList.hoge';
//import helper from './helper';

//export default class ParentItem extends LightningElement {}

const columns = [
    { label: '商品名', fieldName: 'Name' },
    { label: '数量', fieldName: 'Quantity__c',type: 'number', editable: true },
    { label: '価格', fieldName: 'Price__c',type: 'currency', editable: true },
    { label: 'Id', fieldName: 'Id' },
];

export default class BasicDatatable extends LightningElement {
    @api recordId;
    @track data = [];
    columns = columns;
    rowOffset = 0;

    // eslint-disable-next-line @lwc/lwc/no-async-await
    async connectedCallback() {

        getParentItemList({OppId:this.recordId})
        .then(result => {
            this.data = result;
        })
        .catch(error => {

        });
    }
}
