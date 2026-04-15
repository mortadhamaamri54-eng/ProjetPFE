export type BudgetStatus=
    | "BROUILLON"
    |  "SOUMIS"
    |  "VALIDE"
    |   "REJETE";
    
export interface Budget{
    id :number,
    type:string,
    total:number,
    statut: BudgetStatus,
    dateCreation:Date,
    directionId:number;
}