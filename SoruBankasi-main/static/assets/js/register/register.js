var form = document.querySelector('#RegisterForm')
form.addEventListener('submit',function(e){
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url : '/register/',
        data:{
            Username: $('#Username').val(),
            Email: $('#Email').val(),
            Password: $('#Password').val(),
            PasswordConfirm: $('#PasswordConfirmed').val(),
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },
        success:function(status){
            if(status.status == 'success'){
                swal("Harika!", "Hesabını Oluşturduk", "success");
                document.querySelector('Username').value = ""
                document.querySelector('Email').value = ""
                document.querySelector('Password').value = ""
                document.querySelector('PasswordConfirmed').value = ""
            }
            else if(status.status == 'PasswordError'){
                swal("Hata!", "Şifreler Uyuşmuyor", "error");
            }
            else if(status.status == 'UsernameError'){
                swal("Hata!", "Kullanıcı adı zaten kullanılıyor.", "error");
            }
            else{
                swal("Hata!", "Bizden kaynaklı bir hata sebebi ile işlem gerçekleştirilemedi.", "error");
            }
        },error:function(){
            swal("Başarısız", "Sunucu Hatası!", "error");
        }
    })
})