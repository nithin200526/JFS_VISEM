var inventors = {
            dennis_ritchie: { name: 'Dennis Ritchie', about: 'Creator of C and co-creator of Unix. Influenced systems programming.' },
            james_gosling: { name: 'James Gosling', about: 'Led creation of Java at Sun; made cross-platform Java popular.' },
            guido_van_rossum: { name: 'Guido van Rossum', about: 'Author of Python; focused on readability and simplicity.' },
            bjarne_stroustrup: { name: 'Bjarne Stroustrup', about: 'Designer of C++; added object-orientation to C.' },
            john_backus: { name: 'John Backus', about: 'Led development of FORTRAN, an early high-level numeric language.' },
            anders_hejlsberg: { name: 'Anders Hejlsberg', about: 'Principal designer of C# and Turbo Pascal.' },
            brendan_eich: { name: 'Brendan Eich', about: 'Created JavaScript; grew into the language of the web.' },
            yukihiro_matz: { name: 'Yukihiro Matsumoto', about: 'Creator of Ruby, emphasizing programmer happiness.' },
            grace_hopper: { name: 'Grace Hopper', about: 'Pioneering computer scientist who helped develop COBOL.' },
            niklaus_wirth: { name: 'Niklaus Wirth', about: 'Designed Pascal and languages focused on teaching.' }
        };

        // For each inventor we store their Wikipedia page title (used to fetch images)
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

            // Try to fetch from Wikipedia
            fetchWikipediaImage(person.wiki, function (imageUrl) {
                var img = document.createElement('img');
                img.src = imageUrl;
                img.alt = person.name + ' portrait';
                portrait.appendChild(img);
            }, function () {
                // on error or no image, show placeholder
                portrait.innerHTML = '<div class="placeholder">No image</div>';
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