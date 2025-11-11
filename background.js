browser.browserAction.onClicked.addListener((tab) => {
    browser.tabs.executeScript({
      file: 'content.js'
    }).then(() => {
      // Change the message to 'extractListData'
      return browser.tabs.sendMessage(tab.id, { action: 'extractListData' });
    }).then(response => {
      if (response && response.data) {
        let combinedData = response.data;
        
        // Convert to CSV and save
        const csvContent = convertToCSV(combinedData);
        saveAsCSV(csvContent, 'combined_rbc_data_' + Math.floor(Date.now() / 1000) + '.csv');
        writeTextFile(combinedData, 'data.txt');


        // var txtFile = new File('data.txt');
        // txtFile.writeln(outcombinedDataput);
        // txtFile.close();
        
        
        // var encodedUri = encodeURI(combinedData);
        // window.open(encodedUri);





      }
    }).catch(error => {
      console.error('Error:', error);
    });
  });


  
// Helper function to convert array of objects to CSV
function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const rows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape quotes and handle undefined/null values
        return `"${value ? value.toString().replace(/"/g, '""') : ''}"`;
      }).join(',')
    );
    
    return [headers.join(','), ...rows].join('\n');
  }
  
  // Helper function to save CSV content to a file
  function saveAsCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    browser.downloads.download({
      url: url,
      filename: filename,
      saveAs: true
    });
  }