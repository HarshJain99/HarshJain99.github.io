window.onload = {

}

function createRoom(){
    name = $('#roomName').val();
    password = $('#password').val();
    secretKey = 'kwup4FRdZQC8I7o9zwSXLn4wFxZvzlS91buAA5X5FvA';

    query = 'name=' + name + '&meetingID=' + name + '&attendeePW=' + password + '&moderatorPW=' + password;
    console.log(query);

    getShaOf = 'create' + query + secretKey;
    url = 'http://159.65.149.158/bigbluebutton/api/create?' + query + '&checksum=' + sha1(getShaOf);
    console.log(url);
    $.ajax({
        url: url,
        method: 'GET',
        success: function(data){
            console.log(data);
            e = data.getElementsByTagName("response");
            if(e[0].getElementsByTagName("returncode")[0].innerHTML == 'SUCCESS'){
                console.log("Meeting ID : " + e[0].getElementsByTagName("meetingID")[0].innerHTML);
                console.log("Attendee PW : " + e[0].getElementsByTagName("attendeePW")[0].innerHTML);
                console.log("moderator PW : " + e[0].getElementsByTagName("moderatorPW")[0].innerHTML);
                console.log("Create Time : " + e[0].getElementsByTagName("createTime")[0].innerHTML);
                console.log("Create Date : " + e[0].getElementsByTagName("createDate")[0].innerHTML);
                console.log("Duration : " + e[0].getElementsByTagName("duration")[0].innerHTML);
                console.log("Message : " + e[0].getElementsByTagName("message")[0].innerHTML);
            }
            else{
                console.log("Failed to create meeting");
                e = data.getElementsByTagName("response");

                alert(e[0].getElementsByTagName("messageKey")[0].innerHTML + ": " +e[0].getElementsByTagName("message")[0].innerHTML);
            }
        },
        error: function(){
            console.log("Error");
        }
    })

    // setTimeout(joinRoom(), 3000);
    
    // $('#iframe').html('<iframe src="' + url + '"></iframe>');
}

function joinRoom(){
    name = $('#roomName').val();
    password = $('#password').val();
    secretKey = 'kwup4FRdZQC8I7o9zwSXLn4wFxZvzlS91buAA5X5FvA';

    query = 'fullName=' + name + '&meetingID=' + name + '&password=' + password;
    console.log(query);

    getShaOf = 'join' + query + secretKey;
    url = 'http://159.65.149.158/bigbluebutton/api/join?' + query + '&checksum=' + sha1(getShaOf);

    console.log(url);
    window.open(url, "_blank");
    // $('#iframe2').html('<iframe src="' + url + '"></iframe>');

}


function getRoomDetails(){
    name = $('#roomName').val();
    password = $('#password').val();
    secretKey = 'kwup4FRdZQC8I7o9zwSXLn4wFxZvzlS91buAA5X5FvA';

    query = '&meetingID=' + name;
    console.log(query);

    getShaOf = 'getMeetingInfo' + query + secretKey;
    url = 'http://159.65.149.158/bigbluebutton/api/getMeetingInfo?' + query + '&checksum=' + sha1(getShaOf);
    console.log(url);
    $('#iframe3').html('<iframe src="' + url + '"></iframe>');
}

function getRoomDetails2(){
    name = $('#roomName').val();
    secretKey = 'kwup4FRdZQC8I7o9zwSXLn4wFxZvzlS91buAA5X5FvA';

    query = '&meetingID=' + name;

    getShaOf = 'getMeetings' + secretKey;
    url = 'http://159.65.149.158/bigbluebutton/api/getMeetings?' + '&checksum=' + sha1(getShaOf);
    console.log(url);
    $('#iframe3').html('<iframe src="' + url + '"></iframe>');
}


function accessSubject(subject){

}