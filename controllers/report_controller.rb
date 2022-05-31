class ReportController < ApplicationController

  layout "dashboard"

  def add_report
    @weekly_report = current_user.status_reports.weekly.new
    @weekly_report.report_details.build
    @assigned_projects = current_user.projects
  end

  def create_report
    @weekly_report = current_user.status_reports.weekly.new(weekly_params)
    @assigned_projects = current_user.projects

    respond_to do |format|
      if @weekly_report.save
        format.html { redirect_to @weekly_report, notice: 'Weekly Status report send successfully.' }
      else
        format.html { render :add_report }
        format.json { render json: @weekly_report.errors, status: :unprocessable_entity }
      end
    end
  end

  def send_report
    weekly_reports = current_user.status_reports.weekly.order("created_at DESC")
    @pagy, @weekly_reports = pagy(weekly_reports, link_extra: 'data-remote="true" data-action="click->report#startLoader"')
    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def received_report
    weekly_reports = StatusReport.includes(:report_details).weekly.received(current_user.id).order("created_at DESC")
    @pagy, @weekly_reports = pagy(weekly_reports, link_extra: 'data-remote="true" data-action="click->report#startLoader"')
    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def fetch_received
    @report = StatusReport.weekly.find(params[:id])
    respond_to do |format|
      format.html { render partial: "report/detail_view", locals: { report: @report, current_user: current_user }, layout: false }
      format.js { render layout: false }
    end
  end

  def fetch_send
    @report = current_user.status_reports.includes(:report_details).weekly.find(params[:id])
    respond_to do |format|
      format.html { render partial: "report/detail_view", locals: { report: @report, current_user: current_user }, layout: false }
      format.js { render layout: false }
    end
  end

  private

  def weekly_params
    params.require(:weekly_report).permit(to_ids: [], cc_ids: [], report_details_attributes: [:id, :description, :project_id])
  end

end
