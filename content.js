// Listen for messages from the background script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Running...");
    if (request.action === 'extractListData') {
      // Define selectors for the lists you want to extract
      // MODIFY THESE SELECTORS TO MATCH YOUR TARGET LISTS
      const listSelectors = [
        // 'ul.items-list',      // Example: ul with class "items-list"
        // 'div.content ul',     // Example: ul inside a div with class "content"
        // 'ul#results'          // Example: ul with ID "results"
        'ul.accounts-list'
      ];
      
      const allListData = [];
      
      console.log(listSelectors);

      // Extract data from each list matching the selectors
      listSelectors.forEach(selector => {
        const lists = document.querySelectorAll(selector);
        lists.forEach((list, listIndex) => {
          const listData = extractListData(list, listIndex);
          allListData.push(...listData);
        });
      });
      
      console.log(allListData);

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
        listIndex: listIndex + 1,
        itemIndex: index + 1,
        title: item.querySelector('span.accounts-table__account-link')?.textContent.trim() || '',
        description: item.querySelector('span.accounts-table__account-number')?.textContent.trim() || '',
        balance: item.querySelector('.balance-amount--light')?.textContent.trim() || '',
        value: item.querySelector('sup.balance-currency')?.textContent.trim() || ''
      };
    });
    
  }