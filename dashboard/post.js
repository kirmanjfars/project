$(function() {
    // GET/READ
    let postId=1; 
    let category; 
    let user;
    $('#get-button').on('click', function() {
        $.ajax({
            url: 'http://localhost:3000/posts',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.forEach(function(product) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + product.id + '</td>\
                            <td><input type="text" class="title" value="' + product.title + '"></td>\
                            <td><input type="text" class="body" value="' + product.body + '"></td>\
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

        var titletxt = $('#create-input1');
        var category = $('#create-input2');
        var user = $('#create-input3');
        var post = $('#create-input4');
        postId++;
        $.ajax({
            url: 'http://localhost:3000/posts',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
            id: postId,
            title: titletxt.val(),
            body: post.val(),
            userId: user.val(),
            categoryId: category.val() }),
            success: function(response) {
                console.log(response);

                titletxt.val('');
                category.val('');
                user.val('');
                post.val('');
                $('#get-button').click();
            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newTitle = rowEl.find('.title').val();
        var newBody = rowEl.find('.body').val();
        console.log(newTitle); 
        console.log(newBody); 


        $.ajax({
            url: 'http://localhost:3000/posts/'+ id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ title: newTitle, body: newBody, id: id  }),
            success: function(response) {
                
                $('#get-button').click();
            }
        });
    });

     // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        postId--;
        console.log(rowEl.html);
        $.ajax({
            url: 'http://localhost:3000/posts/'+ id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
               // $('#get-button').click();
                rowEl.remove();
            }
        });
    });
    $('#get-button').click();
   
})

