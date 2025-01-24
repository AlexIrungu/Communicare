# Create some default communicable diseases
puts "Creating communicable diseases..."
CommunicableDisease.create(
    name: "Malaria",
    image_url: "https://media.istockphoto.com/id/482803431/photo/african-girl-holding-sign-with-malaria-kills-written-on-it.jpg?b=1&s=170667a&w=0&k=20&c=y0rnOlju0r0U_7yS6a8dQahw7HGcSz9PrS-2-YaCRbI=",
    description: "Malaria is a mosquito-borne infectious disease that affects humans and other animals. Malaria causes symptoms that typically include fever, tiredness, vomiting, and headaches. In severe cases, it can cause yellow skin, seizures, coma, or death.",
    symptoms: "Fever, chills, headache, muscle pain, fatigue, nausea and vomiting.",
    prevention_measures: "Use mosquito nets while sleeping, wear protective clothing, use mosquito repellents, and eliminate standing water.",
    most_prevalent: true
  )
  
CommunicableDisease.create(
    name: "COVID-19",
    image_url: "https://cdn.pixabay.com/photo/2020/04/21/16/39/covid-19-5073811__340.jpg",
    description: "COVID-19 is a contagious respiratory illness caused by the SARS-CoV-2 virus. The disease has spread globally, leading to an ongoing pandemic. COVID-19 causes a range of symptoms, from mild to severe. Some people may be asymptomatic, while others may experience fever, cough, and difficulty breathing.",
    symptoms: "Fever, cough, shortness of breath, fatigue, body aches, loss of smell or taste, sore throat, congestion or runny nose.",
    prevention_measures: "Wash your hands regularly, wear a mask, practice physical distancing, avoid large gatherings, and get vaccinated.",
    most_prevalent: true
  )
  
  CommunicableDisease.create(
    name: "Cholera",
    image_url: "https://media.istockphoto.com/id/1434842623/photo/cholera-text-in-hand-cholera-diagnosis-on-the-background-of-a-stethoscope-and-medicines-on.jpg?b=1&s=170667a&w=0&k=20&c=u6Com-8UpfiPphdvS-qvp3kMB-lquDzPunM4nmoLJV8=",
    description: "Cholera is an infectious disease that causes severe diarrhea and dehydration. It is caused by the bacterium Vibrio cholerae, which is usually found in water or food contaminated by feces from a person with the infection.",
    symptoms: "Diarrhea, nausea and vomiting, abdominal cramps, dehydration, and shock.",
    prevention_measures: "Drink clean and safe water, wash hands regularly, cook food thoroughly, avoid eating raw or undercooked seafood, and get vaccinated.",
    most_prevalent: false
  )

#   # Create some areas

puts "Creating areas..."
Area.create(name: "New York City", location: "New York, USA", latitude: 40.7128, longitude: -74.0060, reported_cases: 1000, communicable_disease_id:1)
Area.create(name: "Tokyo", location: "Japan", latitude: 35.6762, longitude: 139.6503, reported_cases: 500, communicable_disease_id:2)
Area.create(name: "Rio de Janeiro", location: "Brazil", latitude: -22.9068, longitude: -43.1729, reported_cases: 200, communicable_disease_id:3)

# # Create some users
puts "users🧑‍🦱"
User.create(First_name: "saviour", Last_name: "Khalwale", email: "khalwale@gmail.com", password: "password", admin: false)
User.create(First_name: "victor", Last_name: "nganga", email: "victor@gmail.com.com", password: "password", admin: true)


# puts "reviews"

 Review.create(comment: "I think we should donate more to this area to help fight COVID-19.", user_id: 1, area_id: 2)
Review.create(comment: "This area has done a great job of controlling the spread of COVID-19.", user_id: 2, area_id: 2)



# # Create some donations
puts "donations💸"
 Donation.create(amount: 50.00, user_id: 1, area_id: 1)
 Donation.create(amount: 100.00, user_id: 2, area_id: 2)
