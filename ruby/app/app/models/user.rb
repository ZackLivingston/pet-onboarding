class User < ApplicationRecord
    has_many :microposts, dependent: :destroy
    has_many :active_relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
    has_many :following, through: :active_relationships, source: :followed
    has_many :passive_relationships, class_name:  "Relationship", foreign_key: "followed_id",dependent: :destroy
    has_many :followers, through: :passive_relationships, source: :follower



    attr_accessor :remember_token, :activation_token

    before_save {self.email.downcase!}
    before_create :create_activation_digest

    validates :name, 
        presence: true,
        length: {maximum: 50}
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\-.]+\.[a-z]+\z/i
    validates :email, 
        presence: true, 
        length: {maximum: 255}, 
        format: {with: VALID_EMAIL_REGEX}, 
        uniqueness: {case_sensitive: false}
    validates :password,
        presence: true,
        length: {maximum: 50, minimum: 5}
        

    has_secure_password

    def User.digest(str)
        cost = ActiveModel::SecurePassword.min_cost ? 
            BCrypt::Engine::MIN_COST 
            :
            BCrypt::Engine.cost
        BCrypt::Password.create(str, cost: cost)
    end
    
    def User.new_token
        SecureRandom.urlsafe_base64
    end

    #remembers a user in the database for use in persistent sessions
    def remember
        self.remember_token = User.new_token
        update_attribute(:remember_token, User.digest(remember_token))
    end

    def forget
        update_attribute(:remember_digest, nil)
    end

    def authenticated?(remember_token)
        if remember_digest.nil?
            false
        else
            BCrypt::Password.new(remember_digest) == remember_token
        end
    end

    # Follow Utility
    def follow(other)
        active_relationships.create(followed_id: other.id)
    end

    def unfollow(other)
        active_relationships.find_by(followed_id: other.id).destroy
    end

    def following?(other)
        self.following.include?(other)
    end



    private
        def create_activation_digest
            self.activation_token = User.new_token
            self.activation_digest = User.digest(activation_token)
        end

end
