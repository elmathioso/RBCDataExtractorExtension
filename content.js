// Listen for messages from the background script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractListData') {

      const listSelectors = [

        // The class of each unnumbered list.
        // RBC uses repeating unnumbered lists to present day-to-day
        // banking, 
        'ul.accounts-list'
      ];
      
      const allListData = [];
      

      // Extract data from each list matching the selectors
      listSelectors.forEach(selector => {
        const lists = document.querySelectorAll(selector);
        lists.forEach((list, listIndex) => {
          const listData = extractListData(list, listIndex);
          allListData.push(...listData);
        });
      });

      // Send the extracted data back to the background script
      sendResponse({ data: allListData });
    }
    return true; // Required for async sendResponse
  });
  
  // Helper function to extract data from a single list
  function extractListData(list, listIndex) {
    const listItems = Array.from(list.querySelectorAll('li'));
    if (listItems.length === 0) return [];
   
    return listItems.map((item, index) => {
      return {
        
        // The full text. I (lazily) just parse it later. Go Python. #teampandas
        title: item.querySelector('span.accounts-table__account-link')?.textContent.trim() || '',

        // The account ID as identifier
        description: item.querySelector('span.accounts-table__account-number')?.textContent.trim() || '',

        // The balance itself
        balance: item.querySelector('.balance-amount--light')?.textContent.trim() || '',

        // Currency
        value: item.querySelector('sup.balance-currency')?.textContent.trim() || ''
      };
    });
    
  }