function filtrar() {
    var input = document.getElementById('buscador');
    var filter = input.value.toUpperCase();
    var div = document.getElementById('resultados');
    var items = div.getElementsByClassName('item');

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var txtValue = item.textContent || item.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    }
}