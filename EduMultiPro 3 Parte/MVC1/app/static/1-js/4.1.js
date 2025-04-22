document.addEventListener("DOMContentLoaded", function() {
    const cursoSelect = document.querySelector('select[name="curso_id"]');
    const jornadaSelect = document.querySelector('select[name="jornada_id"]');
    const form = document.querySelector('form');

    form.addEventListener('submit', function(e) {
        const cursoSeleccionado = cursoSelect.value;
        const jornadaSeleccionada = jornadaSelect.value;

        if (cursoSeleccionado && !jornadaSeleccionada) {
            e.preventDefault();
            alert("Si seleccionas un curso, también debes seleccionar una jornada.");
        }
    });
});