import { LightningElement,api,track,wire } from 'lwc';
import getItemList from '@salesforce/apex/ItemList.hoge';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Quantity_FIELD from '@salesforce/schema/ItemList__c.Quantity__c';
import Price_FIELD from '@salesforce/schema/ItemList__c.Price__c';
import ID_FIELD from '@salesforce/schema/ItemList__c.Id';
import updateItemLists from '@salesforce/apex/ItemList.updateItemLists';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';


//import helper from './helper';

//export default class ParentItem extends LightningElement {}

const columns = [
    { label: '商品名', fieldName: 'Name' },
    { label: '数量', fieldName: 'Quantity__c',type: 'number', editable: true },
    { label: '価格', fieldName: 'Price__c',type: 'currency', editable: true },
];

export default class BasicDatatable extends LightningElement {
    @api recordId;
    @track data = [];
    @wire(getItemList, { recordId: '$recordId' })
    itemlist;
    columns = columns;
    rowOffset = 0;
    draftValues = [];

    handleSave(event) {

        const fields = {};
        fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
        fields[Quantity_FIELD.fieldApiName] = event.detail.draftValues[0].Quantity__c;
        fields[Price_FIELD.fieldApiName] = event.detail.draftValues[0].Price__c;

        const recordInput = {fields};

        updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'ItemList updated',
                    variant: 'success'
                })
            );
            // Display fresh data in the datatable
            return refreshApex(this.itemlist).then(() => {

                // Clear all draft values in the datatable
                this.draftValues = [];

            });
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
    // async handleSave(event) {
    //     const updatedFields = event.detail.draftValues;
        
    //     // Prepare the record IDs for getRecordNotifyChange()
    //     const notifyChangeIds = updatedFields.map(row => { return { "recordId": row.Id } });
    
    //    // Pass edited fields to the updateContacts Apex controller
    //     await updateItemLists({data: updatedFields})
    //     .then(result => {
    //         console.log(JSON.stringify("Apex update result: "+ result));
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Success',
    //                 message: 'ItemList updated',
    //                 variant: 'success'
    //             })
    //         );
    
    //     // Refresh LDS cache and wires
    //     getRecordNotifyChange(notifyChangeIds);
    
    //     // Display fresh data in the datatable
    //     refreshApex(this.itemlist).then(() => {
    //         // Clear all draft values in the datatable
    //         this.draftValues = [];
    //     });
    
        
    //     }).catch(error => {
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Error updating or refreshing records',
    //                 message: error.body.message,
    //                 variant: 'error'
    //             })
    //         );
    //     });
    // }

    async connectedCallback() {

        getItemList({OppId:this.recordId})
        .then(result => {
            this.data = result;
        })
        .catch(error => {

        });
    }
}
