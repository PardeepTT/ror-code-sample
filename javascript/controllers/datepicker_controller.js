import Controller from './loader_controller';

export default class extends Controller {
    static targets = [  "date_range", "filterform", "submit_button", "start_time", "end_time", "export_link" ]
    connect() {
        if(this.date_rangeTarget) {
            let selectedRange = false;
            let _this = this;
            $(this.date_rangeTarget).daterangepicker({
                showCustomRangeLabel: false,
                alwaysShowCalendars: true,
                autoApply: false,
            }).on('apply.daterangepicker', function(e, picker) {
                const startDate = picker.startDate.format('YYYY-MM-DD'),
                endDate = picker.endDate.format('YYYY-MM-DD');
                _this.start_timeTarget.value = startDate
                _this.end_timeTarget.value = endDate;
                _this.startLoader();
                _this.submit_buttonTarget.click();
                let url = _this.export_linkTarget.href;
                _this.export_linkTarget.href = `${url.split("?")[0]}?start_date=${startDate}&end_date=${endDate}`;
                console.log(_this.export_linkTarget.href,"export_link");
                if(selectedRange) {
                    picker.show();
                    selectedRange = false;
                }
            });
        }
    }

    initialize() {
    }

    rangeSelected(e, picker) {
    }

    submitForm(){
        console.log($(this.date_rangeTarget), "$(this.date_rangeTarget)", this.date_rangeTarget)
    }

    submit(e) {
        console.log("click")
        this.element.submit()
    }
}