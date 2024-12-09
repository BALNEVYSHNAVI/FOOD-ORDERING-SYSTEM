// Function to format ISO string to dd-MM-yyyy
function formatDate(isoString: string): string {
    const date = new Date(isoString);
  
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if day < 10
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if month < 10
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }