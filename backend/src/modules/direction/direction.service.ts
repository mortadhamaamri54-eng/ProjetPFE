import {Direction}from "./direction.model"
let directions:Direction[]=[
    {id: 1, nom: "Informatique", description: "Direction IT"},
    {id: 2, nom: "Finance", description: "Direction Financière"},
    {id: 3, nom: "Ressources Humaines", description: "Direction RH"}
];
export const getAllDirections=():Direction[]=>{
    return directions;
};
export const getDirectionById=(id:number):Direction|undefined=>{
    return directions.find(d=>d.id=== id);
};
export const createDirection=(nom:string,description?:string):Direction=>{
    const newDirection:Direction={
        id:directions.length+1,
        nom,
        description
    };
    directions.push(newDirection);
    return newDirection;
};
export const updateDirection=(
    id:number,
    nom:string,
    description?:string
):Direction | null =>{
    const direction=directions.find(d=>d.id=== id);
    if(!direction)return null;
    direction.nom=nom;
    direction.description=description;
    return direction;
};
export const deleteDirection=(id:number):boolean=>{
    const index=directions.findIndex(d=>d.id===id);
    if(index===-1)return false;
    directions.splice(index,1);
    return true;
};