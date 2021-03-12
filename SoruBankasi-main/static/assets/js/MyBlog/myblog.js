

var form = document.getElementById('CreateCategoryForm')

form.addEventListener('submit',function(e){
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url : '/myblog/',
        data:{
            name: $('#CategoryName').val(),
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },success:function(status){
            if(status.status = "success"){
                swal({
                    title: "Harika!",
                    text: "Kategori Oluşturuldu",
                    icon: "success",
                    button: "Kapat",
                  });
                    var Newcategory =document.getElementById('NewCategoryDiv')
                    var CreateNewCategoryDiv = document.createElement('div')
                    CreateNewCategoryDiv.setAttribute('class','Category_Name')
                    CreateNewCategoryDiv.setAttribute('onclick','CategoryDataFilter("'+status.user+'","'+status.id+'")')
                    CreateNewCategoryDiv.innerHTML = status.name

                    Newcategory.appendChild(CreateNewCategoryDiv)
            
                  document.getElementById('CategoryName').value = ""
            }
            else{
                swal({
                    title: "hmm!",
                    text: "Kart Oluşturulamadı.\nDaha Sonra Tekrar Dene",
                    icon: "error",
                    button: "Tamam",
                  });
            
            }
        },error:function(){
            alert('error');
        }
    })
})



function CategoryDataFilter(user,id){
    $.ajax({
        type: 'POST',
        url :'/myblog/'+user+'/'+id+'/',
        data:{
            CategoryId: id,
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),

        },success:function(data){
            ParseData = JSON.parse(data)
            console.log(ParseData)

        },error:function(){

        }
    })
}