class User < ApplicationRecord
    has_many :reviews
    has_many :donations
    

    has_secure_password

      validates :admin, presence: false
  validates :First_name, presence: true
  validates :Last_name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password_digest, presence: true, length: { minimum: 6 }
  validates :admin, inclusion: { in: [true, false] }
end
