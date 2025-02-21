require 'open-uri'
require 'json'

puts "Seeding Communicable Diseases..."

# Comprehensive list of common communicable diseases with detailed information
communicable_diseases = [
  {
    name: "Malaria",
    description: "Malaria is a life-threatening disease caused by parasites transmitted to people through the bites of infected female Anopheles mosquitoes. It's preventable and curable, but still causes significant morbidity and mortality in tropical regions.",
    symptoms: "Fever, chills, headache, nausea, vomiting, muscle pain, fatigue, sweats, and in severe cases, seizures, coma, and death",
    prevention_measures: "Use of insecticide-treated mosquito nets, indoor residual spraying, antimalarial medications, eliminating breeding sites, wearing protective clothing",
    treatment: "Artemisinin-based combination therapies (ACTs), chloroquine, primaquine, or other antimalarial drugs depending on parasite species and local resistance patterns",
    risk_factors: "Living in or visiting areas with high transmission rates, poverty, lack of access to healthcare, pregnancy, young age, HIV/AIDS",
    transmission: "Primarily through bites of infected female Anopheles mosquitoes, which bite mainly between dusk and dawn",
    image_url: "https://phil.cdc.gov/PHIL_Images/23311/23311_lores.jpg",
    endemic_regions: "Sub-Saharan Africa, South Asia, Southeast Asia, Latin America, Middle East",
    annual_cases: "Over 240 million"
  },
  {
    name: "Tuberculosis",
    description: "Tuberculosis (TB) is a bacterial infection caused by Mycobacterium tuberculosis that primarily affects the lungs but can affect other parts of the body. It spreads through the air when infected people cough, sneeze, or spit.",
    symptoms: "Persistent cough (often with blood), chest pain, weakness, weight loss, fever, night sweats, and in extrapulmonary TB, symptoms related to the affected organs",
    prevention_measures: "BCG vaccination for children, early detection and treatment, infection control measures, improved ventilation, screening high-risk populations",
    treatment: "Combination antibiotic therapy for 6-9 months, typically including isoniazid, rifampin, ethambutol, and pyrazinamide",
    risk_factors: "HIV infection, close contact with TB patients, crowded living conditions, malnutrition, smoking, diabetes, immunosuppression",
    transmission: "Airborne transmission when people with active TB cough, speak, or sneeze, releasing bacteria into the air",
    image_url: "https://phil.cdc.gov/PHIL_Images/20030722/00006/B0006300_lores.jpg",
    endemic_regions: "Worldwide, with highest burden in India, Indonesia, China, Philippines, Pakistan, Nigeria, Bangladesh, and South Africa",
    annual_cases: "Approximately 10 million"
  },
  {
    name: "Cholera",
    description: "Cholera is an acute diarrheal infection caused by ingestion of food or water contaminated with the bacterium Vibrio cholerae. It can lead to severe dehydration and death within hours if untreated.",
    symptoms: "Profuse watery diarrhea (rice-water stools), vomiting, leg cramps, dehydration, rapid heart rate, low blood pressure, and in severe cases, shock",
    prevention_measures: "Safe drinking water, adequate sanitation, proper hand hygiene, oral cholera vaccines, food safety practices, community awareness",
    treatment: "Prompt rehydration with oral rehydration solution (ORS) or intravenous fluids, antibiotics in severe cases",
    risk_factors: "Poor water and sanitation infrastructure, overcrowded settings, humanitarian crises, displacement, poverty",
    transmission: "Fecal-oral route through contaminated water or food, especially in areas with inadequate sanitation",
    image_url: "https://phil.cdc.gov/PHIL_Images/20040312/00002/PHIL_1204_lores.jpg",
    endemic_regions: "Parts of Africa, South Asia, and Latin America",
    annual_cases: "1.3 to 4 million cases, with 21,000-143,000 deaths"
  },
  {
    name: "HIV/AIDS",
    description: "Human Immunodeficiency Virus (HIV) attacks the immune system, leading to Acquired Immunodeficiency Syndrome (AIDS) if untreated. It progressively damages the immune system, reducing the body's ability to fight infections and diseases.",
    symptoms: "Early stage: fever, fatigue, swollen lymph nodes, sore throat, rash. Advanced stage: weight loss, recurring infections, certain cancers, neurological disorders",
    prevention_measures: "Safe sexual practices, pre-exposure prophylaxis (PrEP), post-exposure prophylaxis (PEP), screening blood products, preventing mother-to-child transmission, harm reduction for drug users",
    treatment: "Antiretroviral therapy (ART) to suppress viral load and prevent progression to AIDS",
    risk_factors: "Unprotected sex, multiple sexual partners, injection drug use, receiving contaminated blood products, mother-to-child transmission",
    transmission: "Through bodily fluids including blood, semen, vaginal fluids, rectal fluids, and breast milk",
    image_url: "https://phil.cdc.gov/PHIL_Images/10000/10000_lores.jpg",
    endemic_regions: "Global, with highest prevalence in sub-Saharan Africa",
    annual_cases: "Approximately 1.5 million new infections annually"
  },
  {
    name: "Dengue Fever",
    description: "Dengue is a mosquito-borne viral infection causing flu-like illness that can develop into potentially lethal complications called severe dengue. It's transmitted by female mosquitoes mainly of the species Aedes aegypti.",
    symptoms: "High fever, severe headache, pain behind the eyes, muscle and joint pains, nausea, vomiting, swollen glands, rash",
    prevention_measures: "Vector control (eliminating breeding sites), personal protection (repellents, window screens, long-sleeved clothing), community engagement",
    treatment: "Supportive care including pain relievers, fluid replacement; no specific antiviral treatment",
    risk_factors: "Prior infection with different dengue serotype, urban living, travel to endemic areas, rainy season",
    transmission: "Bite of infected Aedes mosquitoes, primarily Aedes aegypti",
    image_url: "https://phil.cdc.gov/PHIL_Images/10274/10274_lores.jpg",
    endemic_regions: "Tropical and subtropical areas, particularly Asia, Pacific islands, Caribbean, Americas, and Africa",
    annual_cases: "Around 100-400 million globally"
  },
  {
    name: "Typhoid Fever",
    description: "Typhoid fever is a bacterial infection caused by Salmonella Typhi. It spreads through contaminated food and water and is characterized by high fever, gastrointestinal symptoms, and sometimes complications affecting multiple organ systems.",
    symptoms: "Sustained high fever, headache, malaise, anorexia, enlarged spleen, constipation or diarrhea, rose-colored spots on the chest",
    prevention_measures: "Typhoid vaccines, improved water and sanitation, good hygiene practices, food safety measures",
    treatment: "Antibiotics such as fluoroquinolones, third-generation cephalosporins, or azithromycin",
    risk_factors: "Travel to endemic regions, drinking untreated water, eating food prepared by carriers, poor sanitation",
    transmission: "Fecal-oral route through contaminated food or water",
    image_url: "https://phil.cdc.gov/PHIL_Images/20030722/00003/PHIL_1568_lores.jpg",
    endemic_regions: "Parts of Africa, Asia, and Latin America with poor sanitation",
    annual_cases: "11-20 million cases globally, causing 128,000-161,000 deaths annually"
  },
  {
    name: "Measles",
    description: "Measles is a highly contagious viral disease that affects the respiratory system and causes a rash. Before widespread vaccination, it was a significant cause of childhood mortality worldwide.",
    symptoms: "High fever, cough, runny nose, red watery eyes, white spots inside the mouth, characteristic red-brown rash spreading from face downward",
    prevention_measures: "MMR (measles, mumps, rubella) vaccination, isolation of infected individuals, post-exposure vaccination",
    treatment: "Supportive care, vitamin A supplementation recommended by WHO for children with measles",
    risk_factors: "Unvaccinated status, international travel, vitamin A deficiency, malnutrition, immunocompromised state",
    transmission: "Airborne droplets from coughing and sneezing of infected persons, or direct contact with infected nasal or throat secretions",
    image_url: "https://phil.cdc.gov/PHIL_Images/21824/21824_lores.jpg",
    endemic_regions: "Continues to circulate in parts of Africa, Asia, Pacific, and Eastern Mediterranean",
    annual_cases: "Around 9 million cases and over 128,000 deaths globally"
  },
  {
    name: "Meningitis",
    description: "Meningitis is an inflammation of the membranes surrounding the brain and spinal cord, most commonly caused by bacterial or viral infections. Bacterial meningitis can be life-threatening and requires prompt medical attention.",
    symptoms: "Sudden high fever, stiff neck, severe headache, nausea, vomiting, confusion, sensitivity to light, seizures",
    prevention_measures: "Vaccination against common bacterial causes (meningococcal, pneumococcal, Hib vaccines), avoiding close contact with sick individuals",
    treatment: "Bacterial: antibiotics and corticosteroids; Viral: supportive care; Fungal: antifungal medications",
    risk_factors: "Age (infants, young adults), crowded living conditions, certain medical conditions, head trauma, recent infection",
    transmission: "Varies by pathogen - respiratory droplets, fecal-oral route, or direct contact depending on the cause",
    image_url: "https://phil.cdc.gov/PHIL_Images/11073/11073_lores.jpg",
    endemic_regions: "Global, with highest rates in the 'meningitis belt' of sub-Saharan Africa",
    annual_cases: "Variable by pathogen and region"
  },
  {
    name: "Hepatitis B",
    description: "Hepatitis B is a viral infection that attacks the liver and can cause both acute and chronic disease. It can lead to cirrhosis and liver cancer in chronically infected individuals.",
    symptoms: "Fever, fatigue, loss of appetite, nausea, vomiting, abdominal pain, dark urine, clay-colored stools, joint pain, jaundice",
    prevention_measures: "Hepatitis B vaccination, avoiding sharing needles or personal items, safe sex practices, screening blood products",
    treatment: "Acute: supportive care; Chronic: antiviral medications and monitoring for liver damage",
    risk_factors: "Unprotected sex, injection drug use, needle-stick injuries, being born to an infected mother, close household contact with infected persons",
    transmission: "Contact with infected blood or body fluids, mother-to-child during childbirth, sharing needles or syringes",
    image_url: "https://phil.cdc.gov/PHIL_Images/20030111/00018/PHIL_3424_lores.jpg",
    endemic_regions: "Highest prevalence in Western Pacific Region and Africa",
    annual_cases: "296 million people living with chronic hepatitis B, 1.5 million new infections annually"
  },
  {
    name: "Rabies",
    description: "Rabies is a viral disease that causes inflammation of the brain in humans and other mammals. Once symptoms appear, it is virtually always fatal, making prevention crucial.",
    symptoms: "Initial: fever, headache, weakness; Progressive: anxiety, confusion, agitation, hallucinations, hydrophobia (fear of water), difficulty swallowing, paralysis, coma",
    prevention_measures: "Pre-exposure vaccination for high-risk individuals, post-exposure prophylaxis, animal vaccination programs, avoiding contact with unfamiliar animals",
    treatment: "Post-exposure prophylaxis (PEP) with rabies vaccine and rabies immunoglobulin before symptoms appear; virtually no effective treatment after symptom onset",
    risk_factors: "Animal bites, particularly from dogs, bats, raccoons, skunks, and foxes; occupational exposure; travel to endemic areas",
    transmission: "Through saliva of infected animals, most commonly from dog bites",
    image_url: "https://phil.cdc.gov/PHIL_Images/22248/22248_lores.jpg",
    endemic_regions: "Most human cases occur in Africa and Asia, particularly rural areas",
    annual_cases: "59,000 human deaths annually, mostly in Africa and Asia"
  }
]

# Helper methods for image attachment
def attach_disease_image(disease, url)
  begin
    downloaded_image = URI.open(url)
    disease.image.attach(io: downloaded_image, 
                        filename: "#{disease.name.downcase.gsub(' ', '_')}.jpg", 
                        content_type: 'image/jpeg')
    puts "✅ Successfully attached image for #{disease.name}"
  rescue OpenURI::HTTPError, StandardError => e
    puts "❌ Could not download image for #{disease.name}: #{e.message}"
    attach_placeholder(disease)
  end
end

def attach_placeholder(disease)
  begin
    placeholder_path = Rails.root.join('app', 'assets', 'images', 'placeholder.jpg')
    if File.exist?(placeholder_path)
      disease.image.attach(io: File.open(placeholder_path), 
                          filename: 'placeholder.jpg', 
                          content_type: 'image/jpeg')
      puts "ℹ️ Used placeholder image for #{disease.name}"
    else
      puts "⚠️ Warning: Placeholder image not found at #{placeholder_path}"
    end
  rescue => e
    puts "❌ Failed to attach placeholder: #{e.message}"
  end
end

# Create or update communicable diseases with comprehensive information
communicable_diseases.each do |disease_data|
  disease = CommunicableDisease.find_or_initialize_by(name: disease_data[:name])
  
  # Update/set all attributes
  disease.description = disease_data[:description]
  disease.symptoms = disease_data[:symptoms]
  disease.prevention_measures = disease_data[:prevention_measures]
  disease.treatment = disease_data[:treatment]
  disease.risk_factors = disease_data[:risk_factors]
  disease.transmission = disease_data[:transmission]
  disease.endemic_regions = disease_data[:endemic_regions]
  disease.annual_cases = disease_data[:annual_cases]
  
  if disease.save
    puts "✅ Successfully created/updated #{disease.name}"
    attach_disease_image(disease, disease_data[:image_url])
  else
    puts "❌ Failed to save #{disease_data[:name]}: #{disease.errors.full_messages.join(', ')}"
  end
end

puts "Seeding Areas..."

# Areas with detailed information
areas_data = [
  {
    name: "Nairobi County",
    disease: "Malaria",
    location: "Kenya",
    latitude: -1.286389,
    longitude: 36.817223,
    reported_cases: 1850,
    population: 4397073,
    risk_level: "Medium",
    last_outbreak: "2023-11-15",
    healthcare_facilities: 47,
    notes: "Urban transmission in informal settlements; seasonal peaks during rainy seasons"
  },
  {
    name: "Mombasa County",
    disease: "Tuberculosis",
    location: "Kenya",
    latitude: -4.043477,
    longitude: 39.668206,
    reported_cases: 2760,
    population: 1208333,
    risk_level: "High",
    last_outbreak: "2024-01-05",
    healthcare_facilities: 26,
    notes: "High burden TB region with MDR-TB cases increasing; port city with high mobility"
  },
  {
    name: "Kisumu County",
    disease: "Cholera",
    location: "Kenya",
    latitude: -0.091702,
    longitude: 34.767956,
    reported_cases: 587,
    population: 1155574,
    risk_level: "High",
    last_outbreak: "2024-03-22",
    healthcare_facilities: 19,
    notes: "Lakeside region with seasonal outbreaks; water sanitation challenges in peri-urban areas"
  },
  {
    name: "Kilifi County",
    disease: "Dengue Fever",
    location: "Kenya",
    latitude: -3.630817,
    longitude: 39.849642,
    reported_cases: 1253,
    population: 1453787,
    risk_level: "High",
    last_outbreak: "2023-12-10",
    healthcare_facilities: 16,
    notes: "Coastal region with year-round transmission; tourism hub requiring awareness campaigns"
  },
  {
    name: "Nakuru County",
    disease: "Typhoid Fever",
    location: "Kenya",
    latitude: -0.303099,
    longitude: 36.080026,
    reported_cases: 876,
    population: 2162202,
    risk_level: "Medium",
    last_outbreak: "2023-08-17",
    healthcare_facilities: 32,
    notes: "Urban and peri-urban transmission linked to water quality issues; successful intervention program underway"
  },
  {
    name: "Machakos County",
    disease: "Measles",
    location: "Kenya",
    latitude: -1.526298,
    longitude: 37.263390,
    reported_cases: 215,
    population: 1421932,
    risk_level: "Medium",
    last_outbreak: "2023-07-03",
    healthcare_facilities: 21,
    notes: "Recent vaccination campaign has improved coverage; monitoring ongoing for potential new cases"
  },
  {
    name: "Uasin Gishu County",
    disease: "Meningitis",
    location: "Kenya",
    latitude: 0.514277,
    longitude: 35.269779,
    reported_cases: 122,
    population: 1163186,
    risk_level: "Low",
    last_outbreak: "2022-11-29",
    healthcare_facilities: 18,
    notes: "Sporadic cases; effective surveillance system in place with regional reference laboratory"
  },
  {
    name: "Garissa County",
    disease: "Hepatitis B",
    location: "Kenya",
    latitude: -0.453680,
    longitude: 39.646263,
    reported_cases: 947,
    population: 841353,
    risk_level: "High",
    last_outbreak: "2024-01-18",
    healthcare_facilities: 12,
    notes: "High prevalence region with limited screening resources; community health worker program being expanded"
  },
  {
    name: "Nyeri County",
    disease: "HIV/AIDS",
    location: "Kenya",
    latitude: -0.417820,
    longitude: 36.947552,
    reported_cases: 1876,
    population: 759164,
    risk_level: "Medium",
    last_outbreak: "Ongoing",
    healthcare_facilities: 24,
    notes: "Comprehensive ARV treatment program in place; focused on prevention among youth"
  },
  {
    name: "Lamu County",
    disease: "Rabies",
    location: "Kenya",
    latitude: -2.270364,
    longitude: 40.902329,
    reported_cases: 42,
    population: 143920,
    risk_level: "Medium",
    last_outbreak: "2023-05-12",
    healthcare_facilities: 7,
    notes: "Recent dog vaccination campaign implemented; remote areas still face access challenges"
  }
]

# Create or update areas with detailed information
areas_data.each do |area_data|
  area = Area.find_or_initialize_by(name: area_data[:name])
  
  # Set disease association
  area.communicable_disease = CommunicableDisease.find_by(name: area_data[:disease])
  
  # Update/set all attributes
  area.location = area_data[:location]
  area.latitude = area_data[:latitude]
  area.longitude = area_data[:longitude]
  area.reported_cases = area_data[:reported_cases]
  area.population = area_data[:population]
  area.risk_level = area_data[:risk_level]
  area.last_outbreak = area_data[:last_outbreak]
  area.healthcare_facilities = area_data[:healthcare_facilities]
  area.notes = area_data[:notes]
  
  if area.save
    puts "✅ Successfully created/updated area: #{area.name}"
  else
    puts "❌ Failed to save area #{area_data[:name]}: #{area.errors.full_messages.join(', ')}"
  end
end

puts "Seeding Users..."

# Admin user
User.find_or_create_by!(email: "admin@example.com") do |user|
  user.password = "password123"
  user.first_name = "Admin"
  user.last_name = "User"
  user.admin = true
end

# Health officials
health_officials = [
  {email: "doctor@example.com", first_name: "Jane", last_name: "Smith", role: :doctor, specialty: "Epidemiology"},
  {email: "nurse@example.com", first_name: "Michael", last_name: "Johnson", role: :nurse, specialty: "Public Health"},
  {email: "researcher@example.com", first_name: "Emily", last_name: "Williams", role: :researcher, specialty: "Infectious Diseases"}
]

health_officials.each do |official_data|
  User.find_or_create_by!(email: official_data[:email]) do |user|
    user.password = "password123"
    user.first_name = official_data[:first_name]
    user.last_name = official_data[:last_name]
    user.role = official_data[:role]
    user.specialty = official_data[:specialty]
    user.admin = false
  end
end

puts "Seeding Prevention Tips..."

# General prevention tips for all diseases
general_prevention_tips = [
  "Wash your hands frequently with soap and water for at least 20 seconds",
  "Use alcohol-based hand sanitizer when soap and water aren't available",
  "Avoid close contact with people who are sick",
  "Cover your cough or sneeze with a tissue, then throw the tissue in the trash",
  "Clean and disinfect frequently touched objects and surfaces",
  "Stay home when you are sick, except to get medical care",
  "Get vaccinated for preventable diseases according to recommended schedules",
  "Practice safe food handling and preparation",
  "Drink clean, treated water",
  "Use personal protective equipment as recommended in high-risk settings"
]

# Create prevention tips linked to diseases
CommunicableDisease.all.each do |disease|
  # Create 3 specific tips for each disease
  3.times do |i|
    PreventionTip.find_or_create_by(
      communicable_disease: disease,
      tip_number: i + 1,
      description: "#{disease.prevention_measures.split(',')[i&.modulo(disease.prevention_measures.split(',').length)] || 'Follow medical guidance'}"
    )
  end
  
  # Add 2 general tips for each disease
  2.times do |i|
    PreventionTip.find_or_create_by(
      communicable_disease: disease,
      tip_number: i + 4,
      description: general_prevention_tips[i&.modulo(general_prevention_tips.length)]
    )
  end
end

puts "Seeding Outbreak Histories..."

# Generate realistic outbreak histories
diseases = CommunicableDisease.all
areas = Area.all

# Create outbreak records spanning the last 3 years
(0..2).each do |year_offset|
  diseases.each do |disease|
    relevant_areas = areas.select { |a| a.communicable_disease_id == disease.id }
    relevant_areas.each do |area|
      # Create 2-4 outbreak records per year per area-disease combination
      rand(2..4).times do |i|
        # Generate a date within that year
        outbreak_date = Date.today - (year_offset * 365) - rand(1..365)
        case_count = rand(50..500)
        
        OutbreakHistory.find_or_create_by(
          communicable_disease: disease,
          area: area,
          outbreak_date: outbreak_date,
          case_count: case_count,
          fatalities: (case_count * rand(0.01..0.15)).to_i,
          resolved: outbreak_date < (Date.today - 60),
          notes: ["Contained with local response", 
                 "Required national intervention", 
                 "Linked to environmental factors",
                 "Associated with community gathering",
                 "Related to seasonal weather patterns"].sample
        )
      end
    end
  end
end

puts "Seeding Educational Resources..."

# Create educational resources for diseases
resource_types = ["Video", "Infographic", "Brochure", "Guide", "Fact Sheet", "Research Paper"]

diseases.each do |disease|
  # Create 3-5 resources per disease
  rand(3..5).times do |i|
    resource_type = resource_types.sample
    
    EducationalResource.find_or_create_by(
      title: "#{resource_type}: Understanding #{disease.name}",
      communicable_disease: disease,
      resource_type: resource_type,
      url: "https://example.org/resources/#{disease.name.downcase.gsub(' ', '-')}/#{i + 1}",
      description: "Comprehensive #{resource_type.downcase} explaining #{disease.name} transmission, symptoms, and prevention strategies.",
      language: ["English", "Swahili", "French"].sample,
      audience: ["General Public", "Healthcare Workers", "Students", "Researchers"].sample,
      publication_date: Date.today - rand(1..730)
    )
  end
end

puts "🎉 Seeding Completed Successfully! Database now contains:"
puts "- #{CommunicableDisease.count} Communicable Diseases"
puts "- #{Area.count} Geographic Areas"
puts "- #{User.count} Users"
puts "- #{PreventionTip.count} Prevention Tips"
puts "- #{OutbreakHistory.count} Outbreak History Records"
puts "- #{EducationalResource.count} Educational Resources"