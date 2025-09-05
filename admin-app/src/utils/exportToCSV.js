export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) {
    alert("No data to export!");
    return;
  }

  // Extract headers from the first object
  const headers = Object.keys(data[0]).join(",") + "\n";

  // Convert data to CSV format
  const csvRows = data.map(row =>
    Object.values(row).map(value => `"${value}"`).join(",")
  );

  const csvContent = headers + csvRows.join("\n");

  // Create a Blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

