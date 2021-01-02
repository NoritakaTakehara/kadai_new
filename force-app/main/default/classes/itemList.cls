public with sharing class itemList {
    public itemList() {

    }

    @AuraEnabled(cacheable=true)
    public static List<ItemList__c> hoge(ID OppId){
        
        return [SELECT Id,Name,Quantity__c,Price__c FROM ItemList__c WHERE OppId__c = :OppId];

    }

    @AuraEnabled
    public static string updateItemLists(Object data) {
        List<ItemList__c> itemListsForUpdate = (List<ItemList__c>) JSON.deserialize(
            JSON.serialize(data),
            List<ItemList__c>.class
        );
        try {
            update itemListsForUpdate;
            return 'Success: itemLists updated successfully';
        }
        catch (Exception e) {
            return 'The following exception has occurred: ' + e.getMessage();
        }}

}
