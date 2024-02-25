"use strict";

(function (){


    function ValidateConfirmPassword(confirmPasswordFieldId, passwordFieldId, errorMessage) {
        let messageArea = $("#messageArea").hide();

        $(confirmPasswordFieldId).on("blur", function() {
            let confirmPassword = $(this).val();
            let password = $(passwordFieldId).val();

            if (confirmPassword !== password) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(errorMessage).show();
            } else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function RegisterFormValidation(){
        ValidateField("#firstName",/^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,"Please enter a valid First Name");
        ValidateField("#lastName",/^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,"Please enter a valid Last Name");
        ValidateField("#contactNumber",/^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,"Please enter a valid Contact Number");
        ValidateField("#emailAddress",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,"Please enter a valid Email Address");
        ValidateField("#password",/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Please enter a valid Password [Use at least 8 Character, Upper Case, Lower Case, Number and a special Character]");
        ValidateConfirmPassword("#confirmPassword", "#password", "Passwords do not match.");
    }

    /**
     * This function validates input from text field
     * @param input_filed_id
     * @param regular_expression
     * @param error_message
     *
     */
    function ValidateField(input_filed_id, regular_expression, error_message){

        let messageArea = $("#messageArea").hide();

        $(input_filed_id).on("blur", function(){
            let inputFieldText = $(this).val();
            if(!regular_expression.test(inputFieldText)){
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                messageArea.removeAttr("class").hide();
            }
        })

    }
    function CheckLogin(){
        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#"> <i class="fas fa-sign-out-alt"></i>Logout</a>`)
        }

        $("#logout").on("click",function (){
            sessionStorage.clear();
            location.href = "login.html"
        });
    }

    // A function to create the thumbnails and the click event
    function createThumbnails() {
        const galleryContainer = document.querySelector('.gallery');
        // The image data
        const imageData = [
            'images/gallery/gallery1.jpg',
            'images/gallery/gallery2.jpg',
            'images/gallery/gallery3.jpg',
            'images/gallery/gallery4.jpg',
            'images/gallery/gallery5.jpg',
            'images/gallery/gallery6.jpg',

        ];
        imageData.forEach(function(imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.classList.add('thumbnail');
            img.addEventListener('click', function() {
                openLightbox(imageUrl);
            });
            galleryContainer.appendChild(img);
        });
    }

    // A function created for the lightbox feature to display the image
    function openLightbox(imageUrl) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        lightboxImg.src = imageUrl;
        lightbox.style.display = 'block';

    }
    function DisplayGalleryPage() {
        console.log("Called DisplayGalleryPage()");


        $("#messageArea").text("Welcome !");
        // closes the lightbox when the action of click event listener
        document.querySelector('.close').addEventListener('click', function() {
            const lightbox = document.getElementById('lightbox');
            lightbox.style.display = 'none';
        });

        createThumbnails();

    }

    // A function created to get the display details from the JSON
    function displayEvents(events) {
        const eventsContainer = $('#events-container');
        eventsContainer.empty();
        events.forEach(function(event) {
            const eventHtml = `
                <div class="blog-article">
                    <h3>${event.title}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p>${event.description}</p>
                </div>
            `;
            eventsContainer.append(eventHtml);
        });
    }

    // a function to make the AJX request and call function to display the events.
    function DisplayEventsPage(){
        console.log("Called DisplayEventsPage()");
        // makes assumption of the JSON data
        $.ajax({
            url: 'data/event.json',
            type: 'GET',
            dataType: 'json',
            success: function(events) {
                displayEvents(events);
            },
            error: function(xhr, status, error) {
                console.error('Failed to fetch event data:', status, error);
            }
        });

    }
    function Loadheader(html_data) {
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("area-current", "page")
        addCareersLink();
        changeBlogToNews();
        CheckLogin()
    }



    function AjaxRequest(method,url,callback){

        let xhr = new XMLHttpRequest();
        xhr.open(method,url);
        xhr.addEventListener("readystatechange",() => {
            if(xhr.readyState === 4 && xhr.status === 200){

                if(typeof callback == "function"){
                    callback(xhr.responseText)
                }else{
                    console.error("ERROR: callback not a function");
                }

            }

        });
        xhr.send();
    }

    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");

    }

    function DisplayPortfolioPage(){
        console.log("Called DisplayPortfolioPage()");

        const projectContainer = document.getElementById('projectContainer');
        const loadMoreBtn = document.getElementById('loadMoreBtn');

        const projects = [
            { title: 'Code Hub', description: 'Join our intensive coding bootcamp designed for beginners and enthusiasts. ' +
                    'Learn programming languages, web development, and software engineering fundamentals. ' +
                    'Engage in hands-on projects and collaborate with mentors.',
                image: 'project1.jpg' },

            { title: 'Art Fest', description: 'Immerse yourself in creativity at our annual Harmony Arts Festival. ' +
                    'Explore diverse art forms, attend workshops, and witness live performances. ' +
                    'From visual arts to performing arts, Art Fest celebrates the vibrant artistic ' +
                    'spirit of our community.', image: 'project2.jpg' },

            { title: 'Tech Talks', description: 'Stay updated on the latest in technology with our Tech Talks series. ' +
                    'Industry experts and thought leaders share insights on emerging trends,' +
                    ' innovations, and future technologies. Attend informative sessions and ' +
                    'network with tech enthusiasts.', image: 'project3.jpg' },

        ];

        const projectsPerPage = 1;
        let projectsShown = 0;

        // a function created to display the project card
        function createProjectCard(project) {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');

            card.innerHTML = `
            <div class="card">
                <img src="images/project/${project.image}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                </div>
            </div>`;

            projectContainer.appendChild(card);
        }

        // a function created to display more projects
        function loadMoreProjects() {
            const remainingProjects = projects.slice(projectsShown, projectsShown + projectsPerPage);
            remainingProjects.forEach(createProjectCard);
            projectsShown += projectsPerPage;
            if (projectsShown >= projects.length) {
                loadMoreBtn.style.display = 'none';
            }
        }
        loadMoreProjects();

        // the event listener to display the load more button created.
        loadMoreBtn.addEventListener('click', loadMoreProjects);

    }

    //function to set the map and the position
    function DisplayTeamPage(){
        console.log("Called DisplayTeamPage()");

        // defines the map center
        const mapCenter = {lat: 43.87131933896338, lng: -78.8997333740529};


        const map = new google.maps.Map(document.getElementById('map'), {
            center: mapCenter,
            zoom: 15
        });

        const marker = new google.maps.Marker({
            position: mapCenter,
            map: map,
            title: 'Marker Title'
        });

    }

    function DisplayServicePage(){
        console.log("Called DisplayServicePage()");

    }

    function DisplayBlogPage(){
        console.log("Called DisplayBlogPage()");
        $("#searchButton").on("click",function () {
            const searchInput = document.getElementById('searchInput');
            const searchResultsElement = document.getElementById('searchResults');
            const searchText = searchInput.value.trim().toLowerCase();

            if (searchText === '') {
                searchResultsElement.innerHTML = '';
                return;
            }

            searchResultsElement.innerHTML = '';

            const fragment = document.createDocumentFragment();

            const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            while (textNodes.nextNode()) {
                const node = textNodes.currentNode;
                const nodeText = node.textContent.trim().toLowerCase();
                if (nodeText.includes(searchText)) {
                    const result = document.createElement('p');
                    result.textContent = nodeText;
                    fragment.appendChild(result);
                }
            }
            searchResultsElement.appendChild(fragment);
        });

    }
    function DisplayCareersPage(){
        console.log("Called DisplayCareersPage()");

    }

    function DisplayLoginPage(){
        console.log("Called DisplayLoginPage()");
        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click",function () {

            let success = false;
            let newUser = new core.User();

            $.get( "./data/users.json", function(data){

                for(const user of data.users){
                    console.log(user);
                    if(username.value === user.Username && password.value === user.Password){

                        success = true;
                        newUser.fromJSON(user);
                        break;

                    }

                }
                if (success){

                    sessionStorage.setItem("user",newUser.serialize());
                    messageArea.removeAttr("class").hide()
                    location.href = "gallery.html";


                }else{

                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert-danger")
                        .text("Error : Invalid Login Credentials")
                        .show()

                }


            });


        });


        $("#cancelButton").on("click",function () {
            document.forms[0].reset();
            location.href ="index.html";

        });

    }

    // a function created for the register page which handles the submissions.
    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()");

        RegisterFormValidation()

        $("#submitButton").on("click", function(event) {
            event.preventDefault();
            let formData = {
                DisplayName: $("#firstName").val() + " " + $("#lastName").val(),
                Username: $('#emailAddress').val(),
                Password: $('#password').val(),

            };

            $.ajax({
                type: 'POST',
                url: 'register.php',
                data: formData,
                success: function(response) {
                    console.log(response);
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        });


    }

    function DisplayContactUSPage(){
        console.log("Called DisplayContactUSPage()");
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (validateForm()) {
                displayDataInModal();

                setTimeout(redirectHome, 5000);
            }
        });

        function validateForm() {
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            if (!fullName.value || !emailAddress.value || !subject.value || !message.value) {
                alert('Please fill in all fields.');
                return false;
            }

            return true;
        }

        function displayDataInModal() {
            // taking the values form the forms.
            const name = document.getElementById('fullName').value;
            const email = document.getElementById('emailAddress').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            const modalContent = `
            <div class="modal fade" id="contactModal" tabindex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="contactModalLabel">Thank You</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Your message has been submitted successfully.</p>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Subject:</strong> ${subject}</p>
                            <p><strong>Message:</strong> ${message}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

            document.body.insertAdjacentHTML('beforeend', modalContent);

            const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
            contactModal.show();
        }

        // a function which helps to redirect to the homepage.
        function redirectHome() {
            window.location.href = 'index.html';
        }

        $('#feedbackForm').submit(function(event) {
            event.preventDefault();
            let formData = $(this).serializeArray();
            let feedbackData = {};
            formData.forEach(function(input) {
                feedbackData[input.name] = input.value;
            });
            let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
            feedbacks.push(feedbackData);
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
            $('#feedbackForm')[0].reset();
        });

    }


    function addCareersLink() {
        const careersNavItem = document.createElement('li');
        careersNavItem.classList.add('nav-item');
        const careersLink = document.createElement('a');
        careersLink.classList.add('nav-link');
        careersLink.textContent = 'Careers';
        careersLink.href = 'careers.html';
        careersNavItem.appendChild(careersLink);
        const navbarNav = document.querySelector('.navbar-nav');
        navbarNav.appendChild(careersNavItem);
        if (window.location.href.includes('careers.html')) {
            careersNavItem.classList.add('active');
        }

    }

    // a function which changes the Blog name into NEws in the nav bar
    function changeBlogToNews() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            if (link.textContent.includes('Blog')) {
                link.innerHTML = '<i class="fas fa-newspaper"></i> News';
            }
        });
    }

    function Start (){
        console.log("App Started");
        AjaxRequest("GET","header.html",Loadheader);

        switch (document.title){
            case "Harmony Hub":
                DisplayHomePage()
                break;
            case "Portfolio":
                DisplayPortfolioPage()
                break;
            case "Team":
                DisplayTeamPage()
                break;
            case "Our Services":
                DisplayServicePage()
                break;
            case "Blog":
                DisplayBlogPage()
                break;
            case "Contact US":
                DisplayContactUSPage()
                break;
            case "Careers":
                DisplayCareersPage()
                break;
            case "Events":
                DisplayEventsPage()
                break;
            case "Gallery":
                DisplayGalleryPage()
                break;
            case "Login":
                DisplayLoginPage()
                break;
            case "Register":
                DisplayRegisterPage()
                break;


        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        const footerNav = document.getElementById('footerNav');
        footerNav.classList.add('footer-nav');
        const links = [
            { text: 'Privacy Policy', href: 'privacy.html' },
            { text: 'Terms of Service', href: 'terms.html' },
            { text: 'Contact', href: 'contact.html' },
        ];

        links.forEach((link, index) => {
            const anchor = document.createElement('a');
            anchor.textContent = link.text;
            anchor.style.marginRight = '10px';
            anchor.style.color = "#343434";
            anchor.href = link.href;
            anchor.classList.add('nav-link');
            footerNav.appendChild(anchor);
        });


    });

    window.addEventListener("load",Start);

})()