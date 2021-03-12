var form = document.querySelector('#LoginForm')
form.addEventListener('submit',function(e){
    e.preventDefault();

    $.ajax({
        type: 'POST',
        url : '/login/',
        data: {
            Username: $('#Username').val(),
            Password: $('#Password').val(),
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },success:function(status){
            if(status.status == "LoginNotSuccess"){
                swal("Başarısız", "Bilgileri Kontrol Et!", "error");
            }

        },error:function(){
            swal("Başarısız", "Sunucu Hatası!", "error");
        }
    })
})