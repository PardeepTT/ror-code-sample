class StatusReport < ApplicationRecord
  serialize :to_ids, Array
  serialize :cc_ids, Array
  enum report_type: [:daily, :weekly], _default: "daily"
  enum status: [:draft_save, :post],   _default: "draft_save"
  has_many_attached :attachments
  validate :validate_status_value, if: :status_changed?
  after_save :send_mail, if: :status_changed?

  validates_presence_of :to_ids

  has_many :comments, as: :commentable

  belongs_to :user

  has_many :report_details, dependent: :destroy
  accepts_nested_attributes_for :report_details, allow_destroy: true

  scope :received, -> (id) {where("to_ids like '%- #{id}\n%' or cc_ids like '%- #{id}\n%'")}

  private

  def validate_status_value
    if self.status && self.status_was == "post"
      self.errors.add(:status, "can be changed is after post.")
    end
  end

  def send_mail
    if self.status == "post"
      puts "send---mail---->---#{self.sends_to}"
    end
  end

end
