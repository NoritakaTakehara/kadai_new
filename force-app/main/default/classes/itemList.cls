public with sharing class itemList {
    public itemList() {

    }

    @AuraEnabled
    public static List<ItemList__c> hoge(ID OppId){
        
        return [SELECT Id FROM ItemList__c WHERE OppId__c = :Oppid];

    }
}
