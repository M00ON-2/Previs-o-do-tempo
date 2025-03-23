// Substitua com sua chave de API real
const apiKey = '479d45286c35507fd8d2767ccd0758d3';
const city = 'Sao Paulo';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// Traduções das condições do clima
const traducoes = {
    "clear sky": "Céu Limpo",
    "few clouds": "Poucas Nuvens",
    "scattered clouds": "Nuvens Dispersas",
    "broken clouds": "Nuvens Quebradas",
    "overcast clouds": "Nublado",
    "shower rain": "Pancadas de Chuva",
    "rain": "Chuva",
    "thunderstorm": "Chuva com Trovoadas",
    "snow": "Neve",
    "mist": "Névoa"
};

// Função para traduzir a condição do clima
function traduzirCondicao(condicao) {
    return traducoes[condicao] || condicao; // Se não houver tradução, mantém o original
}

// Função para buscar dados de clima
function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

            // Atualiza os elementos no HTML com os dados recebidos
            document.getElementById('temp').textContent = temperature.toFixed(1);
            document.getElementById('condition').textContent = traduzirCondicao(weatherDescription);
            document.getElementById('humidity').textContent = humidity;
            document.getElementById('windspeed').textContent = windSpeed;
            document.getElementById('icon').src = iconUrl;
        })
        .catch(error => console.error('Erro ao obter dados:', error));
}

// Chama a função para buscar dados assim que a página carregar
fetchData();

// Atualiza os dados a cada 10 minutos (600000ms)
setInterval(fetchData, 600000);
