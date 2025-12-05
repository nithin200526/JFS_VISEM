var inventors = {
            dennis_ritchie: { name: 'Dennis Ritchie', about: 'Creator of C and co-creator of Unix. Influenced systems programming.', wiki: 'Dennis_Ritchie' },
            james_gosling: { name: 'James Gosling', about: 'Led creation of Java at Sun; made cross-platform Java popular.', wiki: 'James_Gosling' },
            guido_van_rossum: { name: 'Guido van Rossum', about: 'Author of Python; focused on readability and simplicity.', wiki: 'Guido_van_Rossum' },
            bjarne_stroustrup: { name: 'Bjarne Stroustrup', about: 'Designer of C++; added object-orientation to C.', wiki: 'Bjarne_Stroustrup' },
            john_backus: { name: 'John Backus', about: 'Led development of FORTRAN, an early high-level numeric language.', wiki: 'John_Backus' },
            anders_hejlsberg: { name: 'Anders Hejlsberg', about: 'Principal designer of C# and Turbo Pascal.', wiki: 'Anders_Hejlsberg' },
            brendan_eich: { name: 'Brendan Eich', about: 'Created JavaScript; grew into the language of the web.', wiki: 'Brendan_Eich' },
            yukihiro_matz: { name: 'Yukihiro Matsumoto', about: 'Creator of Ruby, emphasizing programmer happiness.', wiki: 'Yukihiro_Matsumoto' },
            grace_hopper: { name: 'Grace Hopper', about: 'Pioneering computer scientist who helped develop COBOL.', wiki: 'Grace_Hopper' },
            niklaus_wirth: { name: 'Niklaus Wirth', about: 'Designed Pascal and languages focused on teaching.', wiki: 'Niklaus_Wirth' }
        };

        var select = document.getElementById('inventor');
        var portrait = document.getElementById('portrait');
        var about = document.getElementById('about');

        function showPlaceholder() {
            portrait.innerHTML = '<div class="placeholder">No image</div>';
            // reset to circular by default
            portrait.style.borderRadius = '50%';
            // remove blowing effect
            portrait.classList.remove('gosling-blow');
            about.className = 'placeholder';
            about.textContent = 'Choose an inventor from the dropdown to see a portrait and a short two-line description.';
        }

        // Fetch portrait from Wikipedia REST API for the given page title
        function fetchWikipediaImage(pageTitle, onSuccess, onError) {
            var url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(pageTitle);
            fetch(url).then(function (resp) {
                if (!resp.ok) throw new Error('Network response was not ok');
                return resp.json();
            }).then(function (data) {
                // prefer original image if available, otherwise thumbnail
                var imageUrl = null;
                if (data.originalimage && data.originalimage.source) imageUrl = data.originalimage.source;
                else if (data.thumbnail && data.thumbnail.source) imageUrl = data.thumbnail.source;
                if (imageUrl) onSuccess(imageUrl);
                else onError();
            }).catch(function () { onError(); });
        }

        function showInventor(key) {
            if (!key || !inventors[key]) {
                showPlaceholder();
                return;
            }

            var person = inventors[key];
            portrait.innerHTML = ''; // clear

            // If James Gosling is selected, make portrait square and add blowing effect; otherwise circular
            if (key === 'james_gosling') {
                portrait.style.borderRadius = '6px';
                portrait.classList.add('gosling-blow');
            } else {
                portrait.style.borderRadius = '50%';
                portrait.classList.remove('gosling-blow');
            }

            // Try to fetch from Wikipedia
            fetchWikipediaImage(person.wiki, function (imageUrl) {
                var img = document.createElement('img');
                img.src = imageUrl;
                img.alt = person.name + ' portrait';
                portrait.appendChild(img);
            }, function () {
                // on error or no image, show placeholder and reset to circular
                portrait.innerHTML = '<div class="placeholder">No image</div>';
                portrait.style.borderRadius = '50%';
                portrait.classList.remove('gosling-blow');
            });

            // update about text (kept short)
            about.className = '';
            about.textContent = person.about;
        }

        // When selection changes
        select.addEventListener('change', function (e) {
            var key = e.target.value;
            if (!key) {
                showPlaceholder();
            } else {
                showInventor(key);
            }
        });

        // initial state
        showPlaceholder();