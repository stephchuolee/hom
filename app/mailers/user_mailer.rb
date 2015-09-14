class UserMailer < ApplicationMailer
  default from: 'notification@example.com'

  def contact_email(user)
    @user = user
    mail(to: user.email, subject: "You have a request to view your property!")
  end
end
