class DateTimeHelper {
    isDate = (fecha) => {
      return !isNaN(Date.parse(fecha));
    };
    getOnlyDate = (fecha = new Date()) => {
      return new Date(fecha.toDateString());
    };
    getEdadActual = (fechaNacimiento) => {
      if (typeof fechaNacimiento === 'string') {
        fechaNacimiento = new Date(fechaNacimiento);
      }
      const hoy = new Date();
      const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const mes = hoy.getMonth() - fechaNacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        return edad - 1;
      }
      return edad;
    };
    getDiasHastaMiCumple = (fechaNacimiento) => {
      if (typeof fechaNacimiento === 'string') {
        fechaNacimiento = new Date(fechaNacimiento);
      }
      const hoy = new Date();
      const proximoCumple = new Date(hoy.getFullYear(), fechaNacimiento.getMonth(), fechaNacimiento.getDate());
      if (hoy > proximoCumple) {
        proximoCumple.setFullYear(hoy.getFullYear() + 1);
      }
      const unDia = 1000 * 60 * 60 * 24;
      return Math.ceil((proximoCumple - hoy) / unDia);
    };
    getDiaTexto = (fecha, retornarAbreviacion = false) => {
      const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const indexDia = new Date(fecha).getDay();
      return retornarAbreviacion ? diasSemana[indexDia].substring(0, 3) : diasSemana[indexDia];
    };
    getMesTexto = (fecha, retornarAbreviacion = false) => {
      const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const indexMes = new Date(fecha).getMonth();
      return retornarAbreviacion ? meses[indexMes].substring(0, 3) : meses[indexMes];
    };
  }
  
  export default new DateTimeHelper();
  