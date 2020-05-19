const app = angular.module('app', []);
app.controller('app_control', function($scope){
    
    $scope.menu_status = false;

    $scope.toggleMenu = function(){
        $scope.menu_status = !$scope.menu_status;
    }

    $scope.slider_item_length_arr = [];
    $scope.slider_parent_width = '';

    let length_parent = document.querySelectorAll('.slider-box-header').length;

    if(length_parent > 0){
        $scope.slider_parent_width = document.querySelector('.slider-box-header').clientWidth;
    }
    else{

    }


    $scope.slider_length = document.querySelectorAll('.slider-box-header ul li').length;

    for(let i = 0; i<$scope.slider_length; i++){
        $scope.slider_item_length_arr.push(i);
    }

    $scope.resizeSlider = function(){
        let length_items = document.querySelectorAll('.slider-box-header').length;
        if(length_items > 0){
            $scope.slider_parent_width_local = document.querySelector('.slider-box-header').clientWidth;
            $scope.slider_length_local = document.querySelectorAll('.slider-box-header ul li').length;
            document.querySelector('.slider-box-header ul').style.width = $scope.slider_parent_width_local * $scope.slider_length_local + "px"; 
            document.querySelectorAll('.slider-box-header ul li').forEach(function(item){
                item.style.width = $scope.slider_parent_width_local + "px";
            });
        }
        else{}
    }

    window.onresize = function(){
        setTimeout(function(){
            $scope.resizeSlider();
            $scope.resizeAboutSlider();
        },1000);
    }
    window.onload = function(){
        let length =  document.querySelectorAll('.slider-box-header ul').length;
        $scope.resizeAboutSlider();
        if(length > 0){
            document.querySelector('.slider-box-header ul').style.transition = "1s";
        }
        else{}
    }
    

    $scope.resizeSlider();

    $scope.countControlSlider = 0;

    $scope.controlSlider = function(){
        let length = document.querySelectorAll('.slider-box-header ul').length;
        if(length > 0){
            document.querySelector('.slider-box-header ul').classList.add('active-opacity');
            $scope.slider_parent_width_local = document.querySelector('.slider-box-header').clientWidth;
            document.querySelector('.slider-box-header ul').style.left = - $scope.slider_parent_width_local * $scope.countControlSlider + "px";
            document.querySelectorAll('.bottom-square-slider-control .item-square').forEach(function(items){
                items.classList.remove('active');
            });
            setTimeout(function(){
                document.querySelectorAll('.bottom-square-slider-control .item-square')[$scope.countControlSlider].classList.add('active');
                document.querySelector('.slider-box-header ul').classList.remove('active-opacity');
            },700);
        }
        else{}
    }
    
    $scope.nextSlider = function(){
        if($scope.countControlSlider < $scope.slider_length -1){
            $scope.countControlSlider++;
        }
        else if($scope.countControlSlider == $scope.slider_length -1){
            $scope.countControlSlider = 0;
        }
        else{}
        $scope.controlSlider();
    }

    $scope.prevSlider = function(){
        if($scope.countControlSlider > 0){
            $scope.countControlSlider--;
        }
        else{}
        $scope.controlSlider();
    }

    let intervalSlider = setInterval(function(){
        $scope.slider_length > 1 ? $scope.nextSlider() : null;
    },5000);


    $scope.sliderPayload = function(payload){
        $scope.countControlSlider = payload;
        $scope.controlSlider();
        clearInterval(intervalSlider);
        intervalSlider = setInterval(function(){
            $scope.nextSlider();
        },5000);
    }

    $scope.resizeAboutSlider = function(){
        let length_items = document.querySelectorAll('.about-parent-slider').length;
        if(length_items > 0){
            let width = document.querySelector('.about-parent-slider').clientWidth;
            let length = document.querySelectorAll('.about-parent-slider ul li').length;
            document.querySelector('.about-parent-slider ul').style.width = width * length + "px";
            document.querySelectorAll('.about-parent-slider ul li').forEach(function(item){
                item.style.width = width + "px";
            });
        }
        else{}
       
    }


    $scope.aboutSliderCount = 0;

    $scope.prevAboutSlider = function(){
        if( $scope.aboutSliderCount > 0){
            $scope.aboutSliderCount--;
            $scope.aboutSliderControl();
        }
        else{}
    }


    $scope.nextAboutSlider = function(){
        let length = document.querySelectorAll('.about-parent-slider ul li').length;
        if( $scope.aboutSliderCount < length-1){
            $scope.aboutSliderCount++;
            $scope.aboutSliderControl();
        }
        else{}
    }

    $scope.aboutSliderControl = function(){
        let width = document.querySelector('.about-parent-slider').clientWidth;
        document.querySelector('.about-parent-slider ul').style.left = -width * $scope.aboutSliderCount + "px";
    }

    let length = document.querySelectorAll('.about-parent-slider ul li').length;

    $scope.aboutSliderLength = [];

    for(let i =0; i<length; i++){
        $scope.aboutSliderLength.push(i);
    }
    
    $scope.aboutSliderChange = function(payload){
        $scope.aboutSliderCount = payload;
        $scope.aboutSliderControl();
    }

    $scope.blurThisInput = function(thisIs){
        thisIs.target.closest('.box-custom-input').querySelector('input').focus();
    }

    $scope.blurThisArea = function(thisIs){
        thisIs.target.closest('.box-custom-input').querySelector('textarea').focus();
    }

    $scope.toggleDynamicWindow = function(thisIs){
        thisIs.target.closest('.dynamic-window-item').classList.toggle('active');
    }

});