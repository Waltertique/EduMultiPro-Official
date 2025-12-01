document.getElementById("crearPlanilla").addEventListener("click", function() {
    document.getElementById("modal").style.display = "block";
    document.getElementById("formPlanilla").reset();
    document.getElementById("editIndex").value = "";
  });

  document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
  });

  document.getElementById("formPlanilla").addEventListener("submit", function(event) {
    event.preventDefault();
    let id = document.getElementById("idPlanilla").value;
    let nombre = document.getElementById("nombrePlanilla").value;
    let curso = document.getElementById("cursoPlanilla").value;
    let jornada = document.getElementById("jornadaPlanilla").value;
    let periodo = document.getElementById("periodoPlanilla").value;
    let editIndex = document.getElementById("editIndex").value;

    let table = document.getElementById("tablaUsuarios").getElementsByTagName('tbody')[0];
    
    if (editIndex === "") {
      let newRow = table.insertRow();
      newRow.innerHTML = `
        <td>${id}</td>
        <td>${nombre}</td>
        <td>${curso}</td>
        <td>${jornada}</td>
        <td>${periodo}</td>
        <td><button class="abrir"><i class="fa-solid fa-folder-open"></i></button></td>
        <td><button class="btn-icon modificar"><i class="fa-solid fa-gear"></i></button></td>
        <td><button class="btn-icon eliminar"><i class="fa-solid fa-trash"></i></button></td>
      `;
    } else {
      let row = table.rows[editIndex];
      row.cells[0].innerText = id;
      row.cells[1].innerText = nombre;
      row.cells[2].innerText = curso;
      row.cells[3].innerText = jornada;
      row.cells[4].innerText = periodo;
    }

    document.getElementById("modal").style.display = "none";
    document.getElementById("formPlanilla").reset();
  });

  document.getElementById("tablaUsuarios").addEventListener("click", function(event) {
    let target = event.target.closest("button");
    if (!target) return;  // Si se hace click en algo que no es botón, salir
    let row = target.closest("tr");
    let rowIndex = row.rowIndex - 1;
    
    if (target.classList.contains("eliminar")) {
      if (confirm("¿Estás seguro de eliminar esta planilla?")) {
        row.remove();
      }
    }
    
    if (target.classList.contains("modificar")) {
      document.getElementById("modal").style.display = "block";
      document.getElementById("idPlanilla").value = row.cells[0].innerText;
      document.getElementById("nombrePlanilla").value = row.cells[1].innerText;
      document.getElementById("cursoPlanilla").value = row.cells[2].innerText;
      document.getElementById("jornadaPlanilla").value = row.cells[3].innerText;
      document.getElementById("periodoPlanilla").value = row.cells[4].innerText;
      document.getElementById("editIndex").value = rowIndex;
    }
    
    if (target.classList.contains("abrir")) {
      // Ejemplo: Mostrar la información de la planilla en un alert.
      let detalles = "Detalles de la planilla:\n" +
                     "ID: " + row.cells[0].innerText + "\n" +
                     "Nombre: " + row.cells[1].innerText + "\n" +
                     "Curso: " + row.cells[2].innerText + "\n" +
                     "Jornada: " + row.cells[3].innerText + "\n" +
                     "Periodo: " + row.cells[4].innerText;
      alert(detalles);
    }
  });