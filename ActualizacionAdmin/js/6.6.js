// boton de salir 
    document.querySelectorAll('.Salir').forEach(boton => {
        boton.addEventListener('click', function () {
            window.location.href = '../admin/6-notas.html';
        });
    });

// boton de ordenar nombres 
document.addEventListener("DOMContentLoaded", function () {
    const selectOrden = document.getElementById("orden");
    const tbody = document.querySelector("#tablaNotas tbody");
    
    selectOrden.addEventListener("change", function () {
        let filas = Array.from(tbody.querySelectorAll("tr"));
        
        filas.sort((a, b) => {
            let nombreA = a.querySelector("td h2").textContent.trim();
            let nombreB = b.querySelector("td h2").textContent.trim();
            
            if (selectOrden.selectedIndex === 1) {
                return nombreA.localeCompare(nombreB); // Ordenar por nombres
            } else if (selectOrden.selectedIndex === 2) {
                let apellidoA = nombreA.split(" ").slice(-1)[0];
                let apellidoB = nombreB.split(" ").slice(-1)[0];
                return apellidoA.localeCompare(apellidoB); // Ordenar por apellidos
            }
            return 0;
        });
        
        filas.forEach(fila => tbody.appendChild(fila));
    });
});


