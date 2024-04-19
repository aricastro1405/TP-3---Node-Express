class Alumno {
    constructor(username = "", dni = "", edad = 0) {
        this.username = username;
        this.dni = dni;
        this.edad = edad;
    }

    toString() {
        return `Nombre de usuario: ${this.username}, DNI: ${this.dni}, Edad: ${this.edad}`;
    }
}

export default Alumno;