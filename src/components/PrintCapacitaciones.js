export default function CardCapacitaciones(arrayCapacitaciones) {
  return new Promise((resolve, reject) => {
    let html = "";
    arrayCapacitaciones.forEach((cap) => {
      const { nombre, id } = cap;
      html += `
         <div class="col-10 m-2">
            <div class="tecnologies card shadow-sm rounded bg-white">
              <div class="card-body">
                <div class="row">
                  <div class="col-6 text-start">
                      <b>${nombre}</b>
                  </div>
                  <div class="col-6 text-end">
                    <button class="btn btn-primary" value="${id}" onclick="showExamen(${id});">Examen</button>
                  </div>
                </div>
              </div>
            </div>     
         </div>
          `;
    });
    resolve(html);
  });
}
