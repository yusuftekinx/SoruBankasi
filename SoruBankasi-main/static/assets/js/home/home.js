

function AltMenu(dersid, Sinavid) { // TODO Filtrelemede Modal Açılmıyor
    $.ajax({
        type: 'POST',
        url: '/listele/',
        data: {
            LessonId: dersid,
            Examid: Sinavid,
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (data) {
            parseData = JSON.parse(data)
            var MainModal = document.createElement('div')
            MainModal.setAttribute("class", 'modal fade LessonCard' + parseData[0].fields.categories)
            MainModal.setAttribute("tabindex", '-1')
            MainModal.setAttribute("role", 'dialog')
            MainModal.setAttribute("aria-labelledby", 'myLargeModalLabel')
            MainModal.setAttribute("aria-hidden", 'true')

            var ModalDialog = document.createElement('div')
            ModalDialog.setAttribute("class", 'modal-dialog')

            var ModalContent = document.createElement('div')
            ModalContent.setAttribute("class", "modal-content")

            var ModalBody = document.createElement('div')
            ModalBody.setAttribute("class", "modal-body m-2")

            var ModalTitle = document.createElement('h4')
            ModalTitle.innerHTML = "Konu Başlıkları"
            ModalBody.appendChild(ModalTitle)

            var br = document.createElement('br')
            var i = 0;
            for (i = 0; i <= parseData.length - 1; i++) {
                var SubjectName = document.createElement('a');
                SubjectName.setAttribute('href', '')
                SubjectName.innerHTML = parseData[i].fields.topicname;
                var br = document.createElement('br')

                ModalBody.appendChild(br)
                ModalBody.appendChild(SubjectName)
            }



            ModalContent.appendChild(ModalBody)
            ModalDialog.appendChild(ModalContent)
            MainModal.appendChild(ModalDialog)
            document.body.appendChild(MainModal)
        },
        error: function () {
            alert("Başarısız")
        }


    })

}





// Anasayfa dinamik kart olayı

function ExamDataAjax(type) {
    
    $.ajax({
        type: 'POST',
        url: '/indexCardEvent/',
        data: {
            ExamType: type,
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        }, success: function (ResponseData) {
            var ParseResponseData = JSON.parse(ResponseData)
            var filterDiv = document.getElementById('filter-div')
            var filterdatarow = document.getElementById('FilterDataRow')
            var AllData = document.getElementById('AllData')
            if(AllData){
                AllData.remove();
            }
            if(filterdatarow){
                filterdatarow.remove();
            }
            var Row = document.createElement('div')
            Row.setAttribute('class','row')
            Row.setAttribute('id','FilterDataRow')
            console.log(ParseResponseData)
            for(var x  = 0;x<ParseResponseData.length;x++){

                var Col = document.createElement('div')
                Col.setAttribute('class',"col-lg-3 col-sm-6 courses-col")
                Col.setAttribute('onclick',"AltMenu("+ParseResponseData[x].pk+","+ParseResponseData[x].fields.exams+")")


                var SingleCoursesDiv = document.createElement('div')
                SingleCoursesDiv.setAttribute('class','single-courses-2 mt-30')
                SingleCoursesDiv.setAttribute('data-toogle','modal')
                SingleCoursesDiv.setAttribute('data-target','.LessonCard')


                var CoursesImageDiv = document.createElement('div')
                CoursesImageDiv.setAttribute('class','courses-image')

                var CoursesImage = document.createElement('img')
                CoursesImage.setAttribute('src',"media/"+ParseResponseData[x].fields.image)

                var coursesContent  = document.createElement('div')
                coursesContent.setAttribute('class','courses-content')
                
                var CategoryName = document.createElement('a')
                CategoryName.setAttribute('href','#')
                CategoryName.setAttribute('class','category')
                switch(ParseResponseData[x].fields.exams){
                    case 1:
                        CategoryName.innerHTML = "TYT"
                        break;
                    case 2:
                        CategoryName.innerHTML = "AYT"
                        break;
                    case 3:
                        CategoryName.innerHTML = "YDT"
                        break;
                    default:
                        null
                        break;
                }


                var CoursesTitle = document.createElement('h4')
                CoursesTitle.setAttribute('class','courses-title')
                CoursesTitle.innerHTML = ParseResponseData[x].fields.ders
                CoursesTitle.setAttribute('style','color:white;')


                var DurationRating = document.createElement('div')
                DurationRating.setAttribute('class','duration-rating')

                var DurationFee = document.createElement('div')
                DurationFee.setAttribute('class','duration-free')

                var DurationText = document.createElement('p')
                DurationText.setAttribute('class','duration text-light')
                DurationText.innerHTML = "Duration <span> 4 year</span> • Fee: <span> $540</span>"


                var Rating = document.createElement('div')
                Rating.setAttribute('class','rating')
                
                var RatingText = document.createElement('span')
                RatingText.innerHTML = "Rating"


                var ul = document.createElement('ul')
                ul.setAttribute('class','star')

                for(var i = 0; i<5;i++){
                    var li = document.createElement('li')
                    var star = document.createElement('i')
                    star.setAttribute('class','fas fa-star')

                    li.appendChild(star)
                    ul.appendChild(li)
                }


                var coursesLink = document.createElement('div')
                coursesLink.setAttribute('class','courses-link')

                var linktext = document.createElement('a')
                linktext.setAttribute('class','apply')
                linktext.setAttribute('href','#')
                linktext.innerHTML = "Online Apply"

                var ReadMoreText = document.createElement('a')
                ReadMoreText.setAttribute('class','more')
                ReadMoreText.setAttribute('href','#')
                ReadMoreText.innerHTML = 'Read More <i class="fal fa-chevron-right"></i>'

                SingleCoursesDiv.appendChild(CoursesImage)
                coursesContent.appendChild(CategoryName)
                coursesContent.appendChild(CoursesTitle)
                DurationRating.appendChild(DurationFee)
                DurationFee.appendChild(DurationText)
                DurationRating.appendChild(Rating)
                Rating.appendChild(RatingText)
                Rating.appendChild(ul)
                coursesContent.appendChild(DurationRating)
                SingleCoursesDiv.appendChild(coursesContent)
                coursesLink.appendChild(linktext)
                coursesLink.appendChild(ReadMoreText)
                coursesContent.appendChild(coursesLink)
                
                Col.appendChild(SingleCoursesDiv)
                Row.appendChild(Col)
            }
            filterDiv.appendChild(Row)
        }, error: function () {
        }
    })
}

function GetExamData(ExamType) {
    switch (ExamType) {
        case 'all':
            ExamDataAjax("all")
            break;
        case 'tyt':
            ExamDataAjax("tyt")
            break;
        case 'ayt':
            ExamDataAjax("ayt")
            break;

        case 'ydt':
            ExamDataAjax("ydt")
            break;
        default:
            break;
    }
}



