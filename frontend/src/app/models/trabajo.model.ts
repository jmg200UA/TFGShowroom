import { environment } from '../../environments/environment';

const base_url: string = environment.base_url;

export class Trabajo {

    constructor( // opcionales
                 public imagen: string,
                 // obligatorios
                 public titulo?: string,
                 public autor?,
                 public resumen?: string,
                 public area?: string,
                 public carrera?: Date,
                 public director?: string,
                 public tipo?: string,
                 ) {}

    get imagenUrl(): string {
        // Devolvemos la imagen en forma de peticilon a la API
        const token = localStorage.getItem('token') || '';
        if (!this.imagen) {
            return `${base_url}/upload/fotoperfil/no-imagen.jpg?token=${token}`;
        }
        return `${base_url}/upload/fotoperfil/${this.imagen}?token=${token}`;
    }
}
