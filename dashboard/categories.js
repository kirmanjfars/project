$(function() {
    // GET/READ
    let categoryId =1;
    $('#get-button').on('click', function() {
        $.ajax({
            url: 'http://localhost:3000/categories',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.forEach(function(el) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + el.id + '</td>\
                            <td><input type="text" class="name" value="' + el.name + '"></td>\
                            <td>\
                            <button class="update-button"><i class="far fa-edit"></i></button>\
                            <button class="delete-button"><i class="fas fa-trash-alt"></i></button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createInput1 = $('#create-input1');
        categoryId++;
        $.ajax({
            url: 'http://localhost:3000/categories',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
            name: createInput1.val(),
            id: categoryId}),
            success: function(response) {
                console.log(response);

                createInput1.val('');
                $('#get-button').click();
            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();
        

        $.ajax({
            url: 'http://localhost:3000/categories/'+ id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ name: newName, id: id  }),
            success: function(response) {
                
                $('#get-button').click();
            }
        });
    });

     // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        console.log(rowEl.html);
        $.ajax({
            url: 'http://localhost:3000/categories/'+ id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response[0]);
                $('#get-button').click();
            }
        });
    });
    $('#get-button').click();
})

