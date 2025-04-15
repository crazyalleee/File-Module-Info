document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');

    // Handle dragover event
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Prevent default to allow drop
        dropZone.style.borderColor = '#a29bfe';
        dropZone.style.backgroundColor = '#f8f9fa';
    });

    // Handle dragleave event
    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#6c5ce7';
        dropZone.style.backgroundColor = 'white';
    });

    // Handle drop event
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#6c5ce7';
        dropZone.style.backgroundColor = 'white';
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // Handle click on upload area
    dropZone.addEventListener('click', () => {
        fileInput.click(); // Trigger file input click
    });

    // Handle file selection through input
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    /**
     * Process and display information for selected files
     * @param {FileList} files - The list of files to process
     */
    function handleFiles(files) {
        fileInfo.innerHTML = ''; // Clear previous file info
        
        Array.from(files).forEach(file => {
            // Create a card element for each file
            const fileCard = document.createElement('div');
            fileCard.className = 'file-card';
            
            // Format the date and file size
            const lastModified = new Date(file.lastModified).toLocaleString();
            const size = formatFileSize(file.size);
            
            // Create the card content
            fileCard.innerHTML = `
                <h3>📄 ${file.name}</h3>
                <p>📁 Type: ${file.type || 'Unknown'}</p>
                <p>📊 Size: ${size}</p>
                <p>🕒 Last Modified: ${lastModified}</p>
            `;
            
            fileInfo.appendChild(fileCard);
        });
    }

    /**
     * Convert bytes to human-readable file size
     * @param {number} bytes - The file size in bytes
     * @returns {string} Formatted file size with appropriate unit
     */
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
});