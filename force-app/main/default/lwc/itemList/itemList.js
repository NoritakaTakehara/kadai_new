import { LightningElement,api,track } from 'lwc';
import getParentItemList from '@salesforce/apex/ItemList.hoge';
//import helper from './helper';

//export default class ParentItem extends LightningElement {}

const columns = [
    { label: 'Name', fieldName: 'Name' },
    // { label: 'Website', fieldName: 'website', type: 'url' },
    // { label: 'Phone', fieldName: 'phone', type: 'phone' },
    // { label: 'Balance', fieldName: 'amount', type: 'currency' },
    // { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
];

export default class BasicDatatable extends LightningElement {
    @api recordId;
    @track data = [
        {id: '12345678',Name:'タピオカ'},
        {id: '123456789',Name:'タピオカ'}
    ];
    columns = columns;

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
