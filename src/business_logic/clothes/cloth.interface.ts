export interface Cloth{
    name:string,
    type: ClothEnum,
    price: number,
    qte: number,
    color:ColorEnum,
    disponible: Boolean,
    bookmarked: Boolean,
    promoPrice: number,
    imagesPath: string[]
}

export enum ClothEnum {
    HAUT = "HAUT",
    BAS = "BAS",
    VESTE_MANTEAU = "VESTE_MANTEAU",
    ENSEMBLE = "ENSEMBLE",
    ACCESSOIRE = "ACCESSOIRE"
}

export enum ColorEnum{
    BLEU = "BLEU",
    GRIS = "GRIS",
    NOIR = "NOIR",
    JAUNE = "JAUNE",
    ROUGE = "ROUGE",
    BLANC = "BLANC",
    ORANGE = "ORANGE",
    VIOLET = "VIOLET",
    ROSE = "ROSE",
    VERT = "VERT",
    BEIGE = "BEIGE",
    MARRON = "MARRON",
    MULTICOLORE = "MULTICOLORE"
}