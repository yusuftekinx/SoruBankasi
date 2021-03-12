


$('#CreateBlogCardForm').submit(function(e){
    e.preventDefault();

    var CardTitle = $('#CardTitle').val();

    $.ajax({
        type: 'POST',
        url : '/AddBlogCard/',
        data:{
            title : CardTitle,
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },
        success:function(status){
            if(status.msg){
                swal({
                    title: "Harika!",
                    text: "Kart Oluşturuldu",
                    icon: "success",
                    button: "Tamam",
                  });
            }

        },error:function(){

        }
    })
})