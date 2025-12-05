document.addEventListener('DOMContentLoaded', function() {
    // Course data with prices
    const courses = [
        { name: 'Web Development', price: 5000 },
        { name: 'Data Structures', price: 4500 },
        { name: 'Database Management', price: 4000 },
        { name: 'Machine Learning', price: 6000 },
        { name: 'Cloud Computing', price: 5500 },
        { name: 'CP', price: 4800 },
        { name: 'JFS', price: 5300 }
    ];

    // Render course list
    const subjectList = document.querySelector('.subject-list');
    courses.forEach((course, index) => {
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        courseItem.innerHTML = `
            <input type="checkbox" id="course${index}" name="course" value="${course.name}" data-price="${course.price}">
            <label for="course${index}">
                <span class="course-name">${course.name}</span>
                <span class="course-price">(${course.price}/-)</span>
            </label>
        `;
        subjectList.appendChild(courseItem);
    });

    // Get all checkboxes and form elements
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="course"]');
    const totalFeesSpan = document.getElementById('totalFees');
    const form = document.getElementById('regForm');
    const studentNameInput = document.querySelector('input[name="studentName"]');

    // Function to calculate total fees
    function calculateTotalFees() {
        let total = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseInt(checkbox.getAttribute('data-price'));
            }
        });
        totalFeesSpan.textContent = total + '/-';
        return total;
    }

    // Add event listeners to checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotalFees);
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const studentName = studentNameInput.value.trim();
        const selectedCourses = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        const totalFees = calculateTotalFees();

        // Validation
        if (!studentName) {
            alert('Please enter your name');
            return;
        }

        if (selectedCourses.length === 0) {
            alert('Please select at least one course');
            return;
        }

        // Display success message below the form (instead of alert)
        const resultDiv = document.getElementById('registrationResult');
        const timestamp = new Date().toLocaleString();
        const resultHtml = `
            <div class="result success">
                <h3>Registration Successful</h3>
                <p><strong>Student Name:</strong> ${studentName}</p>
                <p><strong>Courses:</strong> ${selectedCourses.join(', ')}</p>
                <p><strong>Total Fees:</strong> ${totalFees}/-</p>
                <p class="small">Registered at: ${timestamp}</p>
            </div>
        `;

        resultDiv.innerHTML = resultHtml;
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Reset form
        form.reset();
        calculateTotalFees();
        validateForm();
    });

    // Optional: Enable/disable submit button based on form validity
    function validateForm() {
        const studentName = studentNameInput.value.trim();
        const hasSelectedCourse = Array.from(checkboxes).some(checkbox => checkbox.checked);
        const submitButton = form.querySelector('button[type="submit"]');
        
        submitButton.disabled = !studentName || !hasSelectedCourse;
    }

    studentNameInput.addEventListener('input', validateForm);
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateForm);
    });

    // Initial validation
    validateForm();
});
