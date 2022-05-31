import Controller from './loader_controller';


export default class extends Controller {
    static targets = ["add_item", "new_project_task", "new_task", "detail_view", "send_detail"];

    add_association(event) {
        event.preventDefault();
        var content = this.new_project_taskTarget.innerHTML.replace(/NEW_PROJECT_REPORT/g, new Date().valueOf());
        this.add_itemTarget.insertAdjacentHTML('beforebegin', content);
    }

    remove_association(event) {
        event.preventDefault();
        const confirmed = confirm('Are you sure you want to delete ?');
        if(!confirmed) return;
        let item = event.target.closest(".nested-weekly-fields");
        item.remove();
        // item.querySelector("input[name*='_destroy']").value = 1;
        // item.style.display = 'none';
    }

    fetchSendReport(event){
        this.fetchReportDetail(event,"/report/fetch_send");
    }

    fetchReceivedReport(event){
        this.fetchReportDetail(event,"/report/fetch_received");
    }


    fetchReportDetail(event, url){
        event.preventDefault();
        let _this = this;
        _this.detail_viewTarget.style.display = "block";
        let item = event.target.closest(".dsr-point");
        if(item.classList.contains("active-row")){
            return null;
        }
        _this.startLoader();
        $(".active-row").removeClass("active-row");
        item.classList.add("active-row");
        $.ajax({
            type: "post",
            data: event.params,
            url: url,
            success: function (data) {
                _this.stopLoader();
                _this.detail_viewTarget.innerHTML = data;
            },
            error: function (data) {
                _this.stopLoader();
                alert('Error: no Category match this ID')
            }
        })
    }

    toggleDetail(event){
        event.preventDefault();
        if(this.send_detailTarget.style.display === "block"){
            this.send_detailTarget.style.display = "none";
        } else {
            this.send_detailTarget.style.display = "block";
        }

    }


}