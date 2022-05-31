import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

    connect(){
        $(document).ajaxStart(function () {
            $('#loader-body').fadeIn();
        });

        $(document).ajaxComplete(function () {
            $('#loader-body').fadeOut();
        });
    }

    startLoader(){
        $('#loader-body').fadeIn();
    }

    stopLoader(){
        $('#loader-body').fadeOut();
    }

}
