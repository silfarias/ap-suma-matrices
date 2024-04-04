function crearMatrices() {

    const filas = parseInt(document.getElementById('filas').value);
    const columnas = parseInt(document.getElementById('columnas').value);

    const matriz1Div = document.getElementById('matriz1');
    const matriz2Div = document.getElementById('matriz2');

    let matriz1HTML = '';
    let matriz2HTML = '';

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            matriz1HTML += `<input type="number" id="m1-${i}-${j}" required>`;
            matriz2HTML += `<input type="number" id="m2-${i}-${j}" required>`;
        }
        matriz1HTML += '<br>';
        matriz2HTML += '<br>';
    }

    matriz1Div.innerHTML = matriz1HTML;
    matriz2Div.innerHTML = matriz2HTML;
    
}

function sumarMatrices() {
    const filas = parseInt(document.getElementById('filas').value);
    const columnas = parseInt(document.getElementById('columnas').value);

    const matriz1 = [];
    const matriz2 = [];

    for (let i = 0; i < filas; i++) {
        matriz1.push([]);
        matriz2.push([]);
        for (let j = 0; j < columnas; j++) {
            const valor1 = parseFloat(document.getElementById(`m1-${i}-${j}`).value);
            const valor2 = parseFloat(document.getElementById(`m2-${i}-${j}`).value);
            if (isNaN(valor1) || isNaN(valor2)) {
                alert('Por favor, ingrese un valor numerico.');
                return;
            }
            matriz1[i].push(valor1);
            matriz2[i].push(valor2);
        }
    }

    fetch('http://localhost:3000/sumar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matriz1, matriz2 })
    })
    .then(response => response.json())
    .then(data => {
        mostrarMatriz(data.resultado);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function mostrarMatriz(matriz) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    const tabla = document.createElement('table');
    matriz.forEach(fila => {
        const filaTr = document.createElement('tr');
        fila.forEach(valor => {
            const celdaTd = document.createElement('td');
            celdaTd.textContent = valor;
            filaTr.appendChild(celdaTd);
        });
        tabla.appendChild(filaTr);
    });
    resultadoDiv.appendChild(tabla);

}