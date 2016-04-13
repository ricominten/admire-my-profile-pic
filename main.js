	var combinedImage;

	function renderFile() {
		//var preview = document.querySelector('.preview');
		var file    = document.querySelector('input[type=file]').files[0];
		var reader  = new FileReader();

		reader.onloadend = function () {


		    window.imageLoaded = reader.result;

		    if(isValid){
		    	document.querySelector('.btn--upload').style.display = 'none';

			    var frame = document.querySelector('.js-bgNew');
				var imageFrame = document.getElementById('js-bgFrameNew');   		
		   		var canvas = document.getElementById('canvas');
				var context = canvas.getContext('2d');
				var profileImage = new Image();

				profileImage.onload = function() {
				  context.drawImage(this, 160, 110, 320, 320);
				  context.drawImage(imageFrame, 0, 0, 640, 640);
				  combinedImage = canvas.toDataURL("image/png");
				  frame.innerHTML = '<img class="bg-fill" src="' + combinedImage + '" width="150" height="100"/>';
				}

				context.clearRect(0, 0, canvas.width, canvas.height);

				var showButtons = window.showButtons = document.getElementsByClassName('js-show');
				for (var i = showButtons.length - 1; i >= 0; i--) {
					showButtons[i].style.visibility = 'visible';     // Show
				};
				
				profileImage.src = window.imageLoaded;
			}

			isValid = false;
		}

		if (file) {
		    window.read = reader.readAsDataURL(file);
		} else {
		    //preview.src = "";
		}
	}

	var isValid = false;
	var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".png"];
	function ValidateSingleInput(oInput) {
	    if (oInput.type == "file") {
	        var sFileName = oInput.value;
	         if (sFileName.length > 0) {
	            var blnValid = false;
	            for (var j = 0; j < _validFileExtensions.length; j++) {
	                var sCurExtension = _validFileExtensions[j];
	                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
	                    blnValid = true;
	                    break;
	                }
	            }
	             
	            if (!blnValid) {
	                alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
	                oInput.value = "";
	                isValid = false;
	            }
	        }
	    }
	    isValid = true;
	}


	function downloadImage(){
		var a = document.createElement('a');
		a.href = combinedImage;
		a.download = "AdmireMyProfilePic.jpg";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	function redoUpload() {
		document.querySelector('.btn--upload').style.display = 'block';
	}




$(function() {
	var windowWidth;
	var windowHeight;

	getWH();
	setWH();

	$(window).resize(function () { 
		getWH();

		console.log('width= ', windowWidth);

		if (windowHeight < windowWidth) {
			windowWidth = windowHeight;
			$('.container').css('width', windowWidth);
			$('.container').css('height', windowHeight);
		} else if (windowWidth <= windowHeight) {
			windowHeight = windowWidth;
			$('.container').css('width', windowWidth); 
			$('.container').css('height', windowHeight);
		} 
		

	});

	function getWH() {
		windowWidth = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

		windowHeight = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;
	}

	function setWH() {
		getWH();
		if (windowHeight < windowWidth) {
			windowWidth = windowHeight;
			$('.container').css('width', windowWidth);
			$('.container').css('height', windowHeight);
		} else if (windowWidth <= windowHeight) {
			windowHeight = windowWidth;
			$('.container').css('width', windowWidth); 
			$('.container').css('height', windowHeight);
		} 
		console.log('width= ', windowWidth);
	}

	$('.js-openMenu').click(function(){
		$('.js-menu').slideToggle();
	})
	$('.js-closeMenu').click(function(){
		$('.js-menu').slideToggle();
	})


	/************************ Twitter Share ************************/

    $('.btn--twitter').click(function(e){
     
        e.preventDefault();
     
        //Get the link variables
        var loc = $(this).attr('href');
        var title  = encodeURIComponent($(this).attr('data-title'));
        var hashtags = encodeURIComponent($(this).attr('data-hashtags'));
     
        //Trigger a new window with the Twitter dialog in the middle of the page
        window.open('http://twitter.com/share?url=' + loc + '&text=' + title + '&hashtags=' + hashtags + '&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
     
    });


    /************************ Facebook Share ************************/

    $('.btn--facebook').click(function(e){
	    FB.ui({
			method: 'share',
		  	href:'http://ricominten.github.io/admire-my-profile-pic/',
		  	hashtag:'#admiremyprofilepic',
		  	quote:'Hey, look at my glorious profile picture!'
		}, function(response){});
	});


    /************************ Upload Files ************************/

    $('.btn--ufile').click(function(e){
    	$('.js-upload').addClass('open');
    	$('.btn--upload--input').show();
    });


});