class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :reviews
  has_many :donations

  enum role: { regular: 0, admin: 1, doctor: 2, nurse: 3, researcher: 4 }

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :admin, inclusion: { in: [true, false] }
  
  # Optional: Add validation for specialty if needed
  # validates :specialty, presence: true, if: -> { doctor? || nurse? || researcher? }
end