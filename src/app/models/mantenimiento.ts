export interface PersonalInterface {
    id: number,
    codigoCorporativo: string,
    nombres: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    dni: string,
    correo: string,
    fechaIngreso: string,
    fechaNacimiento: string,
    idProyecto: number,
    idPerfil: number,
    estado: number
}


export class PersonalClass{
    public id: number;
    public codigoCorporativo: string;
    public nombres: string;
    public apellidoPaterno: string;
    public apellidoMaterno: string;
    public dni: string;
    public correo: string;
    public fechaIngreso: string;
    public fechaNacimiento: string;
    public idProyecto: EntidadClass;
    public idPerfil: EntidadClass;
    public estado: number;
    /*entidadClass*/
    public idTabla:number;
    public idCorrelativo:number;
    public valorTexto1:string;
    public valorTexto2:string;
    public valorNumerico1:number;
    public fechaCreacionBd:string;
    public fechaActualizacionBd:string;
    public idUsuarioCreacion:number;

    /*constructor(id?:number,codigoCorporativo?:string,nombres?:string,apellidoPaterno?:string,apellidoMaterno?:string,dni?:string,correo?:string,fechaIngreso?:string,fechaNacimiento?:string,idProyecto?:EntidadClass,idPerfil?:EntidadClass,estado?:number){
        this.id = id;
        this.codigoCorporativo = codigoCorporativo;
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.dni = dni;
        this.correo = correo;
        this.fechaIngreso = fechaIngreso;
        this.fechaNacimiento = fechaNacimiento;
        this.idProyecto = idProyecto;
        this.idPerfil = idPerfil;
        this.estado = estado;
    }*/
}


export class EntidadClass extends PersonalClass{
    id:number;
    idTabla:number;
    idCorrelativo:number;
    valorTexto1:string;
    valorTexto2:string;
    valorNumerico1:number;
    fechaCreacionBd:string;
    fechaActualizacionBd:string;
    idUsuarioCreacion:number;
    estado:number;
    /*constructor(id?:number,idTabla?:number,idCorrelativo?:number,valorTexto1?:string,valorTexto2?:string,valorNumerico1?:number,fechaCreacionBd?:string,fechaActualizacionBd?:string,idUsuarioCreacion?:number,estado?:number) {
        this.id = id;
        this.idTabla = idTabla;
        this.idCorrelativo = idCorrelativo;
        this.valorTexto1 = valorTexto1;
        this.valorTexto2 = valorTexto2;
        this.valorNumerico1 = valorNumerico1;
        this.fechaCreacionBd = fechaCreacionBd;
        this.fechaActualizacionBd = fechaActualizacionBd;
        this.idUsuarioCreacion = idUsuarioCreacion;
        this.estado = estado;
    }*/
}




export interface BusquedaF {
    list:Array<any>
}

export interface escalar {
    mapValue:number
}