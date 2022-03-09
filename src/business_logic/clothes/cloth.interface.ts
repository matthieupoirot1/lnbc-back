export interface Cloth{
    name:string,
    type: string,
    price: number,
    qte: number,
    color: string[] ,
    disponible: Boolean,
    bookmarked: Boolean,
    promoPrice: number,
    imagesPath: string[],
    description: string,
    sizeStock:{
        [key: string]: number
    }
}