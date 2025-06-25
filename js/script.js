$('#search-button').on('click', function () {
// $.getJSON(' http://www.omdbapi.com/?i=tt3896198&apikey=bac51001')

    $.ajax({
        url: ' http://www.omdbapi.com',
        type: 'get',
        datatype: 'json',
        data: {
            'apikey': 'bac51001',
            's':$('#search-input').val()
        },
        success: function (result) {
            console.log(result)
        }
        
    });
});