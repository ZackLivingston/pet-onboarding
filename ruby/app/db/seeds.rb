# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(name: 'Zack', email: 'zlivingston42@hotmail.com', password: 'testp', password_confirmation: 'testp', admin: true, activated: true, activated_at: Time.zone.now)
99.times do |n|
    User.create(name: "Zack#{n}", email: "ex#{n}@example.com", password: 'testp', password_confirmation: 'testp', activated: true, activated_at: Time.zone.now)
end

users = User.order(:created_at).take(6)
50.times do
    users.each {|user| user.microposts.create(content: Faker::Lorem.sentence(5))}
end