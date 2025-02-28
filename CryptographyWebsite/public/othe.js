document.getElementById('rev').addEventListener('submit', function (event) {
    event.preventDefault();
    const rev = document.getElementById('review').value;
    const err = document.getElementById('error');
    err.innerText="";
    if (rev.includes("DELETE") || rev.includes("POST") || rev.includes(">") || rev.includes("<")) {
        err.innerText = "Error: You have possible malicious code in the review, please refrain from using <, >, DELETE, and POST";
        return;
    }
    if (rev == '' || rev==null) {
        err.innerText = "Please type in something before submiting";
        return;
    }
  });



  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rev');
    const errorElement = document.getElementById('error');
    const reviewTextarea = document.getElementById('review'); 

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); n

        const formData = new FormData(form); 
        const reviewData = {
            review: formData.get('review') 
        };

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData) 
            });

            if (!response.ok) {
                throw new Error('Error submitting review');
            }

            const result = await response.text();
            console.log(result);
            errorElement.textContent = ''; 

            
            reviewTextarea.value = ''; 
            errorElement.textContent = 'Review submitted successfully'; 
        } catch (error) {
            console.error('Error:', error);
            errorElement.textContent = 'Error submitting review'; 
        }
    });
});
