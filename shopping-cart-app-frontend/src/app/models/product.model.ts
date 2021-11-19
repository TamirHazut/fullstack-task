import {v4 as uuidv4} from 'uuid';

export class Product {
    public id: string = uuidv4();
    public name: string = '';
    public price: number = 0;
    public imagePath: string = '';

    constructor(id: string, name: string, price: number, imagePath: string) {
        this.setName(name);
        this.setPrice(price);
        this.setImagePath(imagePath);
    }

    private setID(id: string) : void {
        this.id = id;
    }

    getID() : string {
        return this.id;
    }

    setName(name: string) : void {
        this.name = name;
    }

    getName() : string {
        return this.name;
    }

    setPrice(price: number) : void {
        this.price = price;
    }

    getPrice() : number {
        return this.price;
    }

    setImagePath(imagePath: string) : void {
        this.imagePath = imagePath;
    }

    getImagePath() : string {
        return this.imagePath;
    }
}