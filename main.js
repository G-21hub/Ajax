const getDataBtn = document.getElementById('get-data-btn');
const dataTable = document.getElementById('data-table');
const postCountSelect = document.getElementById('post-count');
const sortColumnSelect = document.getElementById('sort-column');
const sortDirectionSelect = document.getElementById('sort-direction');

getDataBtn.addEventListener('click', () => {
  const postCount = postCountSelect.value;
  const sortColumn = sortColumnSelect.value;
  const sortDirection = sortDirectionSelect.value;
  const apiUrl = `https://jsonplaceholder.typicode.com/posts?_limit=${postCount}&_sort=${sortColumn}&_order=${sortDirection}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      dataTable.getElementsByTagName('tbody')[0].innerHTML = '';

      data.forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${post.id}</td>
          <td>${post.title}</td>
          <td>${post.body}</td>
        `;
        dataTable.getElementsByTagName('tbody')[0].appendChild(row);
      });

       const headers = dataTable.getElementsByTagName('th');
      for (const header of headers) {
        header.addEventListener('click', () => {
          sortTable(header.getAttribute('data-column'));
        });
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again later.');
    });
});

function sortTable(column) {
  const rows = dataTable.getElementsByTagName('tr');
  const header = dataTable.querySelector(`[data-column="${column}"]`);
  const isAsc = header.classList.contains('sort-asc');


  const headers = dataTable.getElementsByTagName('th');
  for (const header of headers) {
    header.classList.remove('sort-asc', 'sort-desc');
  }
}
