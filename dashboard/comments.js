$(function() {
    // GET/READ
    let commentId=1;
    $('#get-button').on('click', function() {
        $.ajax({
            url: 'http://localhost:3000/comments',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');
                tbodyEl.html('');
                response.forEach(function(product) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + product.id + '</td>\
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
        commentId++;
        var comment = $('#create-input1');
        var postI = $('#create-input2');
        var userI = $('#create-input3');
       
        $.ajax({
            url: 'http://localhost:3000/comments',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({id: commentId,
            body: comment.val(),
            postId: postI.val(),
            userId: userI.val()}),
            success: function(response) {
                console.log(response);
                comment.val('');
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
            url: 'http://localhost:3000/comments/'+ id,
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
        console.log(rowEl.html);
        $.ajax({
            url: 'http://localhost:3000/comments/'+ id,
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

