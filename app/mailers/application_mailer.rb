class ApplicationMailer < ActionMailer::Base
  default from: "from@example.com"
  layout 'mailer'

  def contact_email(user)
    @user = user
    mail(to: @user.email, subject: 'You have been contacted by Hom')
  end
end
