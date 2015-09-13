class EmailBookingRequest < ActiveRecord::Base
  belongs_to :listing

  after_create :send_email

  private

  def send_mail
    Mailer.email_booking_request(user).deliver
  end

end
