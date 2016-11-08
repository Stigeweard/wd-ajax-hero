(function() {
    'use strict';

    let movies = [];

    $('#searchButton').click(searchMovie)

    function searchMovie(e) {
        e.preventDefault();
        let title = $('#search').val();
        $('#search').val('')
        if (title === '') {
            alert('please type a movie name');
        } else {
            const request = `http://www.omdbapi.com/?s=${title}`;

            // // vanilla ajax
            // let xhr = new XMLHttpRequest();
            // xhr.open('GET', request, true);
            // xhr.onload = function(e) {
            //     if (xhr.readyState === 4) {
            //         if (xhr.status === 200) {
            //             const response = JSON.parse(xhr.response);
            //
            //             for (var i = 0; i < response.Search.length; i++) {
            //                 if (response.Search[i].Title === undefined) {
            //                     alert('invalid movie name')
            //                 } else {
            //                     movies.push(response.Search[i]);
            //                 }
            //             }
            //             renderMovies();
            //
            //         } else {
            //             console.error(xhr.statusText);
            //         }
            //     }
            // };
            // xhr.onerror = function(e) {
            //     console.error(xhr.statusText);
            // };
            // xhr.send(null);

            // // jquery ajax (apparently already parses data on success)
            $.ajax({
                url: request,
                method: 'GET',
                success: function(data) {
                    const response = data;
                    for (let i = 0; i < response.Search.length; i++) {

                        ajaxMovie(response.Search[i]);

                        if (response.Search[i].Title === undefined) {
                            alert('invalid movie name')
                        } else {
                            movies.push(response.Search[i]);
                        }
                    }
                },
                error: function() {
                    // terrible error message
                    alert('error!')
                }
            })
        }
    }

    function ajaxMovie(movie) {
        $.ajax({
            url: `http://www.omdbapi.com/?t=${movie.Title}`,
            method: 'GET',
            success: function(data) {
                movie['Plot'] = data['Plot']
                renderMovies()
            },
            error: function() {
                // terrible error message
                alert('error!')
            }
        })
    }

    function renderMovies() {
        $('#listings').empty();

        for (let movie of movies) {
            const $col = $('<div class="col s6">');
            const $card = $('<div class="card hoverable">');
            const $content = $('<div class="card-content center">');
            const $title = $('<h6 class="card-title truncate">');

            $title.attr({
                'data-position': 'top',
                'data-tooltip': movie.Title
            });

            $title.tooltip({
                delay: 50,
            });
            $title.text(movie.Title);

            const $poster = $('<img class="poster">');

            $poster.attr({
                src: movie.Poster,
                alt: `${movie.Poster} Poster`
            });

            $content.append($title, $poster);
            $card.append($content);

            const $action = $('<div class="card-action center">');
            const $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

            $plot.attr('href', `#${movie.imdbID}`);
            $plot.text('Plot Synopsis');

            $action.append($plot);
            $card.append($action);

            const $modal = $(`<div id="${movie.imdbID}" class="modal">`);
            const $modalContent = $('<div class="modal-content">');
            const $modalHeader = $('<h4>').text(movie.Title);
            const $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
            const $modalText = $('<p>').text(movie.Plot);
            $modalContent.append($modalHeader, $movieYear, $modalText);
            $modal.append($modalContent);

            $col.append($card, $modal);

            $('#listings').append($col);

            $('.modal-trigger').leanModal();
        }
    };


})();

// module.exports = {
//     render: renderMovies,
//     search: searchMovie
// };
