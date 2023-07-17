class Libro{
    constructor(numero,cantidad,titulo,Autor,Editorial){
        this.numero=numero;
        this.cantidad=cantidad;
        this.titulo=titulo;
        this.Autor=Autor;
        this.Editorial=Editorial
    }
    getnumero(){
        return this.numero
    }
    getcantidad(){
        return this.cantidad
    }
    getitulo(){
        return this.titulo
    }
    getAutor(){
        return this.Autor
    }
    getEditorial(){
        return this.Editorial
    }
}
export default Libro;