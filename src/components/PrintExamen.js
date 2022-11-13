export default function PreguntasExamen(arrayPreguntas) {
  return new Promise((resolve, reject) => {
    let html = "";
    arrayPreguntas.forEach((preg) => {
      const { pregunta, respuestas, id } = preg;
      html += `
        <div class="col-12">
        <b>${pregunta}</b>
        <div class="col-12 mb-3">
            <ul class="list-group">
                <div class="form-check px-0" id="lista_respuesta"> `;
      JSON.parse(respuestas).forEach((res) => {
        html += `
                  <li class="list-group-item  d-flex align-items-center justify-content-bewteen">
                    <div><input onclick="Agregar_Respuesta(this);" class="form-check-input" type="radio" name="${id}" value="${res.id}"></div>
                    <b>${res.respuesta}</b>
                  </li>`;
      });

      html += `</div>
            </ul>
        </div>
        </div>
        `;
    });
    resolve(html);
  });
}
