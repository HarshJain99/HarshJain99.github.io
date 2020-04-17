window.onload = {

}

function createRoom(){
    name = $('#roomName').val();
    password = $('#password').val();

    query = 'name=' + name + '&meetingID' + name + '&attendeePW=' + password + '&moderatorPW=' + password;
    console.log(query);

    getShaOf = 'create' + query + secretKey;
    url = 'http://159.65.149.158/bigbluebutton/api/create?' + query + '&checksum=' + sha1(getShaOf);

    $.ajax({
        url: url,
        method: 'GET',
        data: {},
        success: function(data){
            console.log(data);
        },
        error: function(){
            console.log("Error");
        }
    })
}
