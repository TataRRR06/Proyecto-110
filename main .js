prediction_1="";
prediction_2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>'; 
    });
}

console.log("versión ml5",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/67ung8kBZ/model.json',model_lodaded);

function model_lodaded(){
console.log('model loaded!');
}

function speak(){
    var synth=window.SpeechSynthesis;
    speak_data1="La primera predición es"+prediction_1;
    speak_data2="La segunda predición es"+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,got_result);
}

function got_result(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="Feliz"){
            document.getElementById("update_emoji").innerHTML="&#128513;";
        }
        if(results[0].label=="Triste"){
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        if(results[0].label=="Enojado"){
            document.getElementById("update_emoji").innerHTML="&#128545;";
        }
        if(results[0].label=="Intrigado"){
            document.getElementById("update_emoji").innerHTML="&#129300	;";
        }
        if(results[1].label=="Feliz"){
            document.getElementById("update_emoji2").innerHTML="&#128513;";
        }
        if(results[1].label=="Triste"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if(results[1].label=="Enojado"){
            document.getElementById("update_emoji2").innerHTML="&#128545;";
        }
        if(results[1].label=="Intrigado"){
            document.getElementById("update_emoji2").innerHTML="&#129300	;";
        }
    }


}