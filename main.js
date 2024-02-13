function generateTicket() {
    var personName = document.getElementById('personName').value;
    var imageFile = document.getElementById('imageUpload').files[0];

    if (personName && imageFile) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var ticketContainer = document.getElementById('ticket-body');
            ticketContainer.innerHTML = '';

            var ticket = document.createElement('div');
            ticket.classList.add('ticket');

            var ticketImage = document.createElement('img');
            ticketImage.src = e.target.result;

            var ticketName = document.createElement('p');
            ticketName.textContent = personName;

            ticket.appendChild(ticketImage);
            ticket.appendChild(ticketName);
            ticketContainer.appendChild(ticket);

            // Show buttons
            document.getElementById('downloadButton').style.display = 'inline-block';
            document.getElementById('shareButton').style.display = 'inline-block';
        }

        reader.readAsDataURL(imageFile);
    } else {
        alert('Please enter your name and upload an image.');
    }
}

function downloadTicket() {
    var ticketContainer = document.getElementById('card');
    html2canvas(ticketContainer, {
        onrendered: function(canvas) {
            var ticketDataURL = canvas.toDataURL('image/png');

            var downloadLink = document.createElement('a');
            downloadLink.href = ticketDataURL;
            downloadLink.download = 'event_ticket.png';
            downloadLink.click();
        }
    });
}

function shareOnLinkedIn() {
    var ticketContainer = document.getElementById('ticketContainer');
    var ticketImage = ticketContainer.querySelector('img');

    // Construct the share URL with the ticket image and any additional message
    var shareURL = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(ticketImage.src);

    // Open the share dialog in a new window
    window.open(shareURL, '_blank');
}
