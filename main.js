(async () => {
  const fetchJobs = async () => {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
  };

  const createJobElements = (jobs) => {
    const boxes = jobs.map((jobData) => {
      const boxNode = `
        <div class="box">
          <strong>${jobData.title}</strong>
          <p>${jobData.description}</p>
        </div>
        `;
      return boxNode;
    });
    return boxes.join('');
  };

  const renderResult = (data) => {
    const resultNode = document.getElementById('result');
    if (resultNode) {
      resultNode.innerHTML = createJobElements(data);
    }
  };

  const jobs = await fetchJobs();
  renderResult(jobs);

  //-----

  const liveSearch = () => {
    const query = document.getElementById('searchbox').value;

    fetchJobs().then((jobsData) => {
      const filteredJobs = jobsData.filter((jobData) =>
        jobData.title.includes(query),
      );
      renderResult(filteredJobs);
    });
  };

  let typingTimer;
  const TYPING_DELAY = 3000;
  const searchInput = document.getElementById('searchbox');

  searchInput.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(liveSearch, TYPING_DELAY);
  });
})();
