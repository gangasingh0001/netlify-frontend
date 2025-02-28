$(document).on('click', '#loginButton', function() {
        let email = $('#inputEmail').val()
        let password = $('#inputPassword').val()
        $.ajax('https://node-examportal.herokuapp.com/login', {
            type: 'POST',
            dataType: 'JSON',
            contentType: "application/json;charset=utf-8",
            beforeSend: function() {
                $('.main').animate({ opacity: 0.4 })
                $('.mod').fadeIn()
                $('.spinner').show()
            },
            data: JSON.stringify({
                'email': email,
                'password': password
            }),
            success:async function(data) {
                // localStorage.setItem('token', data.token)
                // if(data.verification=="required"){
                //     localStorage.setItem('email',email)
                //     location.replace('./otp.html')
                // }
                // else
                 if (data.accountType == "Examiner")
                    {
                        localStorage.setItem('token', data.token);
                        $(location).attr('href', '../../exminer/views/examiner.html');
                    }
                else if (data.accountType == "Student"){
                    localStorage.setItem('token', data.token);
                    $(location).attr('href', './accessKey.html')
                }
                    
                else if(data.accountType == "Admin") {
                    localStorage.setItem('token', data.token);
                    $(location).attr('href', '../../admin/views/adminHome.html')
                }
            },
            error: function(data) {
                $('.main').animate({ opacity: 1 })
                $('.mod').fadeOut()
                $('.spinner').hide()
                $('#alert-box').show();
                $("#okButton").on("click", (event) => {
                    $(location).attr('href', './login.html')
                })
                
            }

        })
    })
    var input = document.getElementById("inputPassword");
    input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("loginButton").click();
  }
});


    // })