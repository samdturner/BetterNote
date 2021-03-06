class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, presence: true
  validates :password_digest, length: { allow_nil: true, minimum: 6 }
  validates :email, uniqueness: true

  has_many :notes, dependent: :destroy
  has_many :notebooks, dependent: :destroy
  has_many :tags, dependent: :destroy

  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user if user && user.valid_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
