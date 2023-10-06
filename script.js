const itemsPerPage = 10;
let currentPage = 1;
let data = [];

const dataContainer = document.getElementById('data-container');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const pageNumberContainer = document.getElementById('page-numbers');

async function fetchData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json');
        const jsonData = await response.json();
        data = jsonData;
        displayPage(currentPage);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayPage(pageNumber) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = data.slice(startIndex, endIndex);

    dataContainer.innerHTML = '';

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.textContent = 'ID';
    const th2 = document.createElement('th');
    th2.textContent = 'Name';
    const th3 = document.createElement('th');
    th3.textContent = 'Email';

    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    headerRow.appendChild(th3);

    thead.appendChild(headerRow);
    table.appendChild(thead);
    table.appendChild(tbody);

    pageData.forEach(person => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        cell1.textContent = person.id;
        const cell2 = document.createElement('td');
        cell2.textContent = person.name;
        const cell3 = document.createElement('td');
        cell3.textContent = person.email;

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);

        tbody.appendChild(row);
    });

    dataContainer.appendChild(table);

    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    pageNumberContainer.textContent = `${currentPage} / ${totalPages}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
    }
});

nextButton.addEventListener('click', () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
    }
});

fetchData();
