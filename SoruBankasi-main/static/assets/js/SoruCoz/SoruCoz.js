


var ExamSelect = document.getElementById('SinavTuru')
var NewSelect = document.getElementById('NewSelect')
var NewSelect2 = document.getElementById('NewSelect2')

function SınavSecimi(){
    $.ajax({
        type: 'POST',
        url : '/solveQuestion/',
        data:{
            type: 'Exam',
            ExamType:ExamSelect.value,
            ExamTypeId: $('#SinavTuru').children(":selected").attr("id"),
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },success:function(data){
            ParseData = JSON.parse(data)
            var LessonSelect = document.getElementById('DersTuru')
            if(LessonSelect){
                LessonSelect.remove();
            }
            var select = document.createElement('select')
            select.setAttribute('class','form-control')
            select.setAttribute('id','DersTuru')
            select.setAttribute('onchange','DersSecimi();')
            var staticOption =  document.createElement('option')
            staticOption.innerHTML = "Ders Seç"
            select.appendChild(staticOption)
            
            for(var x = 0;x<ParseData.length; x++){
                var option = document.createElement('option')
                option.value = ParseData[x].fields.ders
                option.innerHTML = ParseData[x].fields.ders
                option.id = ParseData[x].pk
                select.appendChild(option)
            }
            NewSelect.append(select)

        },
        error:function(){

        }
    })
}





function DersSecimi(){
    $.ajax({
        type: 'POST',
        url: '/solveQuestion/',
        data:{
            type: 'lesson',
            lesson : document.getElementById('DersTuru').value,
            lessonId : $('#DersTuru').children(':selected').attr("id"),
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },success:function(data){
            ParseData = JSON.parse(data)
            var TopicSelect = document.getElementById('KonuTuru')
            if(TopicSelect){
                TopicSelect.remove();
            }
            var select = document.createElement('select')
            select.setAttribute('class','form-control')
            select.setAttribute('id','KonuTuru')
            var staticOption2 = document.createElement('option')
            staticOption2.innerHTML = "Konu Seç"
            select.appendChild(staticOption2)
            for(var x = 0;x<ParseData.length; x++){
                var option = document.createElement('option')
                option.value = ParseData[x].fields.topicname
                option.innerHTML = ParseData[x].fields.topicname
                option.id = ParseData[x].pk
                select.appendChild(option)
            }
            NewSelect2.append(select)

        },error:function(){

        }
    })
}


var TestOlustur = document.getElementById('TestOlustur')
var YeniTest = $('#YeniTest');
var SubmitButton = document.getElementById('SubmitButton')

TestOlustur.addEventListener('submit',function(e){
    e.preventDefault()
    
    var Exam =document.getElementById('SinavTuru').value;
    var Lesson = document.getElementById('DersTuru').value;
    var Topic =document.getElementById('KonuTuru').value;

    if(Exam == "Sınav Türü Seç" || Lesson == "Ders Seç" || Topic == "Konu Seç"){
        swal({
            title: "Hmm!",
            text: "Eksik bilgileri doldurun",
            icon: "error",
            button: "Tamam",
          });
    }
    else{
        SubmitButton.innerHTML = "<div class = 'spinner-border spinner-border-sm' role = 'status'><span class = 'sr-only'>Loading ...</span></div>"
        $.ajax({
            type: 'POST',
            url : '/solveQuestion/',
            data:{
                Exam:Exam,
                Lesson:Lesson,
                Topic:Topic,
                TestLength:$('#TestUzunluk').children(':selected').attr('value'),
                type:'CreateExam',
                'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
            },success:function(data){
                SubmitButton.innerHTML = "Uygula"
                ParseQuestionData = JSON.parse(data)
                if(ParseQuestionData.length > 0){
                    YeniTest.fadeIn(300);

                    var TestIcerigiDiv = document.getElementById('TestIcerigi')
                    var sidebarDiv = document.getElementById('sidebarDiv')
                    if(TestIcerigiDiv){
                        TestIcerigiDiv.remove()
                    }
                    if(sidebarDiv){
                        sidebarDiv.remove()
                    }



                    var TestIcerigi = document.createElement('div')
                    TestIcerigi.setAttribute('id','TestIcerigi')

                    for(var x = 1; x<=ParseQuestionData.length;x++){
                        var Card = document.createElement('div')
                        Card.setAttribute('class','card mt-4')
                        Card.id = "soru"+x
                        var CardHeader = document.createElement('div')
                        
                        var QuestionNumber = document.createElement('span')
                        QuestionNumber.setAttribute('class','float-left')
                        QuestionNumber.innerHTML = x+"-"

                        var QuestionImage = document.createElement('img')
                        QuestionImage.setAttribute('src','#')

                        CardHeader.setAttribute('class','card-header')


                        var CardBody = document.createElement('div')
                        CardBody.setAttribute('class','card-body')


                        var QuestionText = document.createElement('i')
                        QuestionText.innerHTML = ParseQuestionData[x].fields.SoruMetni
                        QuestionText.setAttribute('class','float-start')
                        
                        var RadioGroup = document.createElement('div')
                        RadioGroup.setAttribute('class','btn-group-vertical')

                        var label1 = document.createElement('label')
                        label1.setAttribute('for','btnradio1')
                        label1.innerHTML = ParseQuestionData[x].fields.A
                        var radioA = document.createElement('input')
                        radioA.setAttribute('type',"radio")
                        radioA.setAttribute('class','btn-check')
                        radioA.setAttribute('name','btnradio')
                        radioA.setAttribute('id','btnradio1')


                        var label2 = document.createElement('label')
                        label2.setAttribute('for','btnradio2')
                        label2.innerHTML = ParseQuestionData[x].fields.B
                        var radioB = document.createElement('input')
                        radioB.setAttribute('type',"radio")
                        radioB.setAttribute('class','btn-check')
                        radioB.setAttribute('name','btnradio')
                        radioA.setAttribute('id','btnradio2')


                        var label3 = document.createElement('label')
                        label3.setAttribute('for','btnradio3')
                        label3.innerHTML = ParseQuestionData[x].fields.C
                        var radioC = document.createElement('input')
                        radioC.setAttribute('type',"radio")
                        radioC.setAttribute('class','btn-check')
                        radioC.setAttribute('name','btnradio')
                        radioA.setAttribute('id','btnradio3')


                        var label4 = document.createElement('label')
                        label4.setAttribute('for','btnradio4')
                        label4.innerHTML = ParseQuestionData[x].fields.D
                        var radioD = document.createElement('input')
                        radioD.setAttribute('type',"radio")
                        radioD.setAttribute('class','btn-check')
                        radioD.setAttribute('name','btnradio')
                        radioA.setAttribute('id','btnradio4')

                        

                        var label5 = document.createElement('label')
                        label5.setAttribute('for','btnradio5')
                        label5.innerHTML = ParseQuestionData[x].fields.E
                        var radioE = document.createElement('input')
                        radioE.setAttribute('type',"radio")
                        radioE.setAttribute('class','btn-check')
                        radioE.setAttribute('name','btnradio')
                        radioA.setAttribute('id','btnradio5')


                        var label6 = document.createElement('label')
                        label6.setAttribute('for','btnradio6')
                        label6.innerHTML = "Boş"
                        var radioBos = document.createElement('input')
                        radioBos.setAttribute('type',"radio")
                        radioBos.setAttribute('class','btn-check')
                        radioBos.setAttribute('name','btnradio')
                        radioBos.setAttribute('value','Boş')
                        radioA.setAttribute('id','btnradio6')




                        // SideBar
                        var SideBarDiv = document.createElement('div')
                        SideBarDiv.setAttribute('class','sidenav')
                        SideBarDiv.setAttribute('id','sidebarDiv')
                        
                        var TimeDiv = document.createElement("div")
                        TimeDiv.setAttribute('id','chronoExample')

                        var TimeText = document.createElement('div')
                        TimeText.setAttribute('class','values')
                        TimeText.innerHTML = "00:00:00"

                        var TimeButton = document.createElement('button')
                        TimeButton.setAttribute('class','startButton')
                        TimeButton.innerHTML = "Start"
                        var timer = new Timer();
                        timer.addEventListener('started', function (e) {
                            $('#chronoExample .values').html(timer.getTimeValues().toString());
                        });
                        

                        TimeDiv.appendChild(TimeText)
                        TimeDiv.appendChild(TimeButton)
                        SideBarDiv.appendChild(TimeDiv)


                        for(var a = 1;a< ParseQuestionData.length;a++){
                            var pagelink = document.createElement('a')
                            pagelink.setAttribute('href','#soru'+a)
                            pagelink.innerHTML= a
                            pagelink.setAttribute('title',a+". Soru'ya Git")
                            
                                if((a-1)%5 == 0){
                                    var AddBr = document.createElement('br')
                                    SideBarDiv.appendChild(AddBr)
                                }
                            

                            SideBarDiv.appendChild(pagelink)

                            

                            // TODO Scroll Animate Eklencek
                        }


                        
                        var collapseDiv = document.createElement('div')
                        collapseDiv.setAttribute('class','collapse')
                        collapseDiv.setAttribute('id','collapseFooter'+x)


                        var CardFooter = document.createElement('div')
                        CardFooter.setAttribute('class','card-footer')

                        var CozumGorseli = document.createElement('img')
                        CozumGorseli.setAttribute('src','#')

                        var DogruYanit = document.createElement('span')
                        DogruYanit.setAttribute('class','float-right mt-3')
                        DogruYanit.innerHTML = "Cevap: "+ParseQuestionData[x].fields.DogruCevap


                        CardFooter.appendChild(CozumGorseli)
                        CardFooter.appendChild(DogruYanit)
                        collapseDiv.appendChild(CardFooter)

                        CardFooterCollapseButton = document.createElement('button')
                        CardFooterCollapseButton.setAttribute('class','btn btn-dark')
                        CardFooterCollapseButton.setAttribute('type','button')
                        CardFooterCollapseButton.setAttribute('data-toggle','collapse')
                        CardFooterCollapseButton.setAttribute('data-target','#collapseFooter'+x)
                        CardFooterCollapseButton.setAttribute('aria-expanded','false')
                        CardFooterCollapseButton.setAttribute('aria-controls','collapseFooter')
                        CardFooterCollapseButton.innerHTML = "Soru Detayları"



                        CardHeader.appendChild(QuestionNumber)
                        CardHeader.appendChild(QuestionImage)
                        CardBody.appendChild(QuestionText)
                        
                        RadioGroup.appendChild(radioA)
                        RadioGroup.appendChild(label1)
                        
                        RadioGroup.appendChild(radioB)
                        RadioGroup.appendChild(label2)

                        RadioGroup.appendChild(radioC)
                        RadioGroup.appendChild(label3)

                        RadioGroup.appendChild(radioD)
                        RadioGroup.appendChild(label4)

                        RadioGroup.appendChild(radioE)
                        RadioGroup.appendChild(label5)

                        RadioGroup.appendChild(radioBos)
                        RadioGroup.appendChild(label6)
                        

                        

                        document.body.appendChild(SideBarDiv)
                        YeniTest.append(TestIcerigi)
                        TestIcerigi.append(Card)
                        CardBody.appendChild(RadioGroup)
                        Card.appendChild(CardHeader)
                        Card.appendChild(CardBody)
                        Card.appendChild(CardFooterCollapseButton)
                        Card.appendChild(collapseDiv)


                        

                        var timer = new Timer();
                        timer.start();

                        timer.addEventListener('secondsUpdated', function (e) {
                            $('#basicUsage').html(timer.getTimeValues().toString());
                        });


                        
                    }
                }
                else{
                    swal({
                        title: "Hmm!",
                        text: "Filtre'ye uygun test hazırlayamadık",
                        icon: "error",
                        button: "Tamam",
                      });
    
                }
            },error:function(){
    
            }
        })
    }
    
})