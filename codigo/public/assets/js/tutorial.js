document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'http://localhost:3001/tutoriais'; // URL do JSON Server
  const videoContainer = document.querySelector('.row');
  const searchForm = document.querySelector('form'); // Formulário de pesquisa
  const searchInput = document.getElementById("searchInput"); // Campo de busca
  const durationButton = document.getElementById("filterByDuration"); // Botão de filtro por duração
  const allButton = document.getElementById("showAll"); // Botão para exibir todos os vídeos

  function createVideoCard(video) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4 mb-4';

    // URL da thumbnail do YouTube
    const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

    colDiv.innerHTML = `
      <div class="video-thumbnail">
        <a href="${video.url}" target="_blank"><img src="${thumbnailUrl}" alt="Vídeo" class="img-fluid"></a>
      </div>
      <a href="${video.url}" class="url-title" target="_blank""><p class="video-title">${video.titulo}</p></a>
      <p class="video-details">${video.descricao}</p>
    `;

    return colDiv;
  }

  async function fetchVideos(searchQuery = "", filterByDuration = false) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.statusText}`);
      }

      const videos = await response.json();

      // Limpa o container de vídeos antes de exibir os resultados
      videoContainer.innerHTML = "";

      let filteredVideos = videos;

      // Filtrar vídeos por busca
      if (searchQuery) {
        filteredVideos = filteredVideos.filter(video =>
          video.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (video.youtubeId && video.youtubeId.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      // Filtrar vídeos por maior duração
      if (filterByDuration) {
        filteredVideos.sort((a, b) => b.duracao - a.duracao); // Ordena por duração decrescente
      }

      // Renderiza os vídeos filtrados
      filteredVideos.forEach(video => {
        const videoCard = createVideoCard(video);
        videoContainer.appendChild(videoCard);
      });

      if (filteredVideos.length === 0) {
        videoContainer.innerHTML = "<p class='text-center'>Nenhum vídeo encontrado.</p>";
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  // Evento de submissão do formulário de pesquisa
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchQuery = searchInput.value.trim();
    fetchVideos(searchQuery); // Atualiza os vídeos com base na busca
  });

  // Evento de clique no botão "Filtrar por Duração"
  durationButton.addEventListener('click', () => {
    fetchVideos("", true); // Filtra por maior duração
  });

  // Evento de clique no botão "Todos"
  allButton.addEventListener('click', () => {
    fetchVideos(); // Exibe todos os vídeos sem filtros ou buscas
  });

  // Busca inicial (sem filtro)
  fetchVideos();
});
