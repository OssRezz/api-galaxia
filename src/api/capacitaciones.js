export const FetchCapacitaciones = () => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`https://www.galaxiaseguridadltda.com.co/galaxiacliente/public/api/sanctum/capacitaciones`, requestOptions)
      .then((response) => response.json())
      .then((data) => resolve(data.capacitaciones))
      .catch((error) => reject(error));
  });
};

export const ExamenByCapacitacion = (capacitaciones, user) => {
  return new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    myHeaders.append("headers", "Content-Type: application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(
      `https://www.galaxiaseguridadltda.com.co/galaxiacliente/public/api/sanctum/examen/${capacitaciones}?user_id=${user}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const Examen = (capacitaciones, user, intento, preguntas) => {
  return new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    myHeaders.append("headers", "Content-Type: application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
    };
    fetch(
      `https://www.galaxiaseguridadltda.com.co/galaxiacliente/public/api/sanctum/examen?user_id=${user}&capacitacion_id=${capacitaciones}&intento=${intento}&preguntas=${preguntas}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export default FetchCapacitaciones;
