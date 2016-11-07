(function() {
    'use strict';

    let movies = [];

    $('#searchButton').click(searchMovie)

    function searchMovie(e) {
        e.preventDefault();
        let title = $('#search')[0].value;
        $('#search')[0].value = '';
        if (title === '') {
            alert('please type a movie name');
        } else {
            const request = `http://www.omdbapi.com/?t=${title}&y=&plot=short&r=json`
            let xhr = new XMLHttpRequest();
            xhr.open('GET', request, true);
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.response);
                        if (response.Title === undefined) {
                            alert('invalid movie name')
                        } else {
                            movies.push(response);
                            renderMovies();
                        }
                    } else {
                        console.error(xhr.statusText);
                    }
                }
            };
            xhr.onerror = function(e) {
                console.error(xhr.statusText);
            };
            xhr.send(null);
        }
    }

    function renderMovies() {
        $('#listings').empty();

        for (var movie of movies) {
            var $col = $('<div class="col s6">');
            var $card = $('<div class="card hoverable">');
            var $content = $('<div class="card-content center">');
            var $title = $('<h6 class="card-title truncate">');

            $title.attr({
                'data-position': 'top',
                'data-tooltip': movie.Title
            });

            $title.tooltip({
                delay: 50,
            });
            $title.text(movie.Title);

            var $poster = $('<img class="poster">');

            $poster.attr({
                src: movie.Poster,
                alt: `${movie.Poster} Poster`
            });

            $content.append($title, $poster);
            $card.append($content);

            var $action = $('<div class="card-action center">');
            var $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

            $plot.attr('href', `#${movie.id}`);
            $plot.text('Plot Synopsis');

            $action.append($plot);
            $card.append($action);

            var $modal = $(`<div id="${movie.id}" class="modal">`);
            var $modalContent = $('<div class="modal-content">');
            var $modalHeader = $('<h4>').text(movie.Title);
            var $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
            var $modalText = $('<p>').text(movie.Plot);

            $modalContent.append($modalHeader, $movieYear, $modalText);
            $modal.append($modalContent);

            $col.append($card, $modal);

            $('#listings').append($col);

            $('.modal-trigger').leanModal();
        }
    };
})();
