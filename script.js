
    const apiKey = 'U2YPBPZZWLAV7G7FG8ZJRATHS';
    
    // Get the form and input elements
    const form = document.querySelector('.searchBar');
    const input = document.querySelector('.searchBox');

    // Add an event listener to the form for submission
    form.addEventListener('submit', function (event) {
    
        event.preventDefault();

       
        const location = input.value.trim();

      
        if (location) {       
            fetchData(location);
        } else {
           alert('Location is Empty');
        }
    });

 
    function fetchData(location) {
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const parent = document.getElementById('mainTable');
                parent.innerHTML="";
                console.log(data.days); // this is an object
                console.log(typeof(data.days));
                
                const table = createTable(data.days);
                parent.appendChild(table);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }



    //Code for creating table dynamically : 
  function createTable(weatherData) {
    //here weatherData is an array of  objects
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
   

    const headingRow = createHeadingRow();
    table.appendChild(headingRow);
    
    
    for (const data of weatherData) {
      const dataRow = createDataRow(data);
      table.appendChild(dataRow);
    }

    return table;
  }

  function createHeadingRow() {
    const row = document.createElement("tr");
    const headings = ["Date", "Min Temperature (°C)", "Max Temperature (°C)"];

    for (const heading of headings) {
      const cell = createCell(heading, true);
      row.appendChild(cell);
    }

    return row;
  }

  function createDataRow(data) {
    //Here data is an object  containing the properties to be displayed in a single row
    const row = document.createElement("tr");
    const cells = [data.datetime, data.tempmin, data.tempmax];

    for (let i = 0; i < cells.length; i++) {
      const cell = createCell(cells[i]);
      if (i > 0) {
        cell.innerText += " °C";
      }
      row.appendChild(cell);
    }

    return row;
  }

  function createCell(txt, isHeading = false) {
    const cell = document.createElement(isHeading ? "th" : "td");
    cell.innerText = txt;
    cell.style.border = "1px solid black";
    cell.style.padding = "8px";
    return cell;
  }
  
