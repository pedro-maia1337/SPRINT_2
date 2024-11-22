document.addEventListener('DOMContentLoaded', () => {
    // URL do JSON Server
    const apiUrl = 'http://localhost:3001/tutoriais';
  
    // Selecionar o contêiner da grade de vídeos
    const videoContainer = document.querySelector('.row');
  
    // Função para criar os elementos do vídeo
    function createVideoCard(video) {
      // Criar o contêiner da coluna
      const colDiv = document.createElement('div');
      colDiv.className = 'col-md-4 mb-4';
  
      // Estrutura do vídeo
      colDiv.innerHTML = `
        <div class="video-thumbnail">
          <img src="https://via.placeholder.com/300x200" alt="Vídeo" class="img-fluid">
        </div>
        <p class="video-title">${video.titulo}</p>
        <p class="video-details">${video.descricao}</p>
      `;
  
      return colDiv;
    }
  
    // Função para buscar dados da API e renderizar
    async function fetchVideos() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }
  
        const videos = await response.json();
  
        // Renderizar os vídeos no DOM
        videos.forEach(video => {
          const videoCard = createVideoCard(video);
          videoContainer.appendChild(videoCard);
        });
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  
    // Chamar a função para buscar e renderizar vídeos
    fetchVideos();
  });
  