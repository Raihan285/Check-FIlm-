function searchMovie () {
  $('#movie-list').html('');
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'bac51001',
            's': $('#search-input').val()
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;
                console.log(movies);

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-4 d-flex justify-content-center mb-4">
                        <div class="card mb-3" style="width: 18rem;">
                        <img src="${data.Poster}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${data.Title}</h5>
                            <p class="card-text">${data.Year}</p>
                            <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` + data.imdbID + `">See More</a>
                        </div>
                        </div>
                    </div>
                    `);

                });

                $('#search-input').val();
                
            } else {
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error + `</h1>
                    </div>`);
            }
        }
    });  
};

$('#search-button').on('click', function () {
    searchMovie();
});


$('#search-input').on('keyup', function (e) {
    if (e.which == 13) {
        searchMovie();
    }
});


$('#movie-list').on('click', '.see-detail', function () {
    
    
    $.ajax({
          url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'bac51001',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response === "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                            <img src="${movie.Poster}" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>` + movie.Title + `</h3></li>
                                    <li class="list-group-item">Released : ` + movie.Released + `</li>
                                    <li class="list-group-item">Genre : ` + movie.Genre + `</li>
                                    <li class="list-group-item">Director : ` + movie.Director + `</li>
                                    <li class="list-group-item">Actors : ` + movie.Actors + `</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    `)
            }
        }
    })
});