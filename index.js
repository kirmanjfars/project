let catagory;
let title;
let writer;
let userId;
let post;
let postid;
let commentsName;
let commentsNameID;
let comments;

$(function () {




    $('#new-button').on('click', function () {

        $('.np').append( 
            `<form>
            <div class="form1">
                <label>Title:</label>
                <input required placeholder="Enter here" id="create-input2"> </div>
            <div class="form1">
                <label>Writer:</label>
                <input required placeholder="Enter here" id="create-input3"> </div>
            <br>
            <div class="form1">
                <label>Post:</label>
                <input required placeholder="Enter here" type="text" id="create-input1">
            </div>
            <button class="addButton">
                <i class="fas fa-plus"></i>
            </button>
        </div></form>`
        )

    });

    $('#get-button').on('click', function () {
        $.ajax({
            url: 'http://localhost:3000/posts',
            contentType: 'application/json',
            success: (function (posts) {
                console.log(posts)

                
                postid = posts[1].id;
                post = posts[1].body;
                title = posts[1].title;
                userId = posts[1].userId;


                $.ajax({
                    url: 'http://localhost:3000/comments',
                    contentType: 'application/json',
                    success: (function (response) {
        
                        if (postid == response[1].postId) {
                            comments = response[1].body;
                            commentsNameID = response[1].userId;
                        }

                        $.ajax({
                            url: 'http://localhost:3000/users',
                            contentType: 'application/json',
                            success: (function (response) {
                
                                if (response[1].id == userId) {
                                    writer = response[1].name;
                                   
                                }
                                console.log(commentsNameID);
                                if (commentsNameID == response[1].id) {
                                    commentsName = response[1].name;
                                }

                                posts
                                    .map(x => {
                                        return {...x, post: x.body, writer, commentsName, comments}
                                    })
                                    .forEach(appendPost);

                
                            })
                        });
                    })
                });
        

               

            })
        });

      
        

       

        function appendPost({title, writer, post, comments, commentsName}) {
            var app = $('#app');
        if (!(title == undefined)) {
            app.append(`\
            <div class="post">\
        <h3> ` + title + `</h3>\
        <h4 class="title"> ` + writer + `</h4>\
       <p>` + post + `</p>\
       <h4>  Comments  </h4>\
       <div class="comment">\
       <h4> ` + commentsName + ` : </h4>\
       <p> ` + comments + `</p>\ </div>\ </div>`)
        }
        }


        console.log("title", title, "writer", writer, "post", post, "commentsName", commentsName, "comments", comments);
    });


    
    $('#addButton').on('click', function(event) {
        var app = $('#app');

        let title1 =  $('#create-input2');
        let writer1 =  $('#create-input2');
        let post1 =  $('#create-input2');

        app.append(`\
        <div class="post">\
    <h3> ` + title1 + `</h3>\
    <h4 class="title"> ` + writer1 + `</h4>\
   <p>` + post1 + `</p>\
   </div>`)
       
    });
    

    $('#get-button').click();
});



















// app.html('');
// console.log(response)

// response.forEach(function(el) {
//     tbodyEl.append('\
//         <tr>\
//             <td class="id">' + el.id + '</td>\
//             <td><input type="text" class="name" value="' + el.name + '"></td>\
//             <td><input type="text" class="email" value="' + el.email + '"></td>\
//             <td>\
//             <button class="update-button"><i class="far fa-edit"></i></button>\
//             <button class="delete-button"><i class="fas fa-trash-alt"></i></button>\
//             </td>\
//         </tr>\
//     ');
// });