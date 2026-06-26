// ============================================
// SHARED BLOG DATA
// This file centralizes all blog data for use across components
// In production, this would be replaced with API calls to a backend
// ============================================

// Local images from src/assets/about/
import blogImg1 from "../assets/about/1.jpg";
import blogImg2 from "../assets/about/2.jpg";
import blogImg3 from "../assets/about/3.jpg";
import blogImg4 from "../assets/about/4.jpg";
import blogImg5 from "../assets/about/5.jpg";
import blogImg6 from "../assets/about/6.jpg";
import blogImg7 from "../assets/about/7.jpg";
import blogImg8 from "../assets/about/8.jpg";
import blogImg9 from "../assets/about/9.jpg";
import blogImg10 from "../assets/about/10.jpg";

export const blogs = [
   {
      id: 1,
      title: "Combating Malaria in Rural Nigeria: Our 2025 Outreach Results",
      excerpt: "A comprehensive look at how our medical teams reached over 5,000 patients in malaria-endemic regions, providing testing, treatment, and prevention education.",
      content: `Malaria remains one of the leading causes of death in Nigeria, particularly in rural communities with limited access to healthcare. In 2025, RightAid Health Foundation launched an ambitious outreach program targeting 15 rural communities across Oyo, Kano, and Borno states.

Our medical teams, comprising 45 healthcare professionals including doctors, nurses, and community health workers, set up mobile clinics in remote villages. Over the course of three months, we conducted rapid diagnostic tests for over 5,000 individuals, distributed 3,200 insecticide-treated bed nets, and provided treatment to 1,800 confirmed cases.

The program also included intensive health education sessions where community members learned about malaria prevention, early symptom recognition, and the importance of completing treatment courses. Local volunteers were trained as malaria champions to sustain awareness efforts after our departure.

Key outcomes included a 40% reduction in reported malaria cases in target communities within six months and the establishment of referral pathways to nearby health facilities for complicated cases. This initiative demonstrates that targeted, community-centered interventions can significantly impact disease burden even in resource-limited settings.`,
      image: blogImg1,
      category: "Medical Outreach",
      author: "Dr. Chinedu Okonkwo",
      authorAvatar: blogImg1,
      date: "2025-05-15",
      readTime: "8 min read",
      views: 1240,
      likes: 89,
      comments: 23,
      featured: true,
      tags: ["Malaria", "Rural Health", "Prevention"]
   },
   {
      id: 2,
      title: "Free Cataract Surgery Campaign Restores Vision to 300 Nigerians",
      excerpt: "Our ophthalmic surgical team completed a landmark 2-week campaign in Kano State, performing free cataract removals for elderly patients.",
      content: `Vision loss from cataracts affects millions of Nigerians over 60, yet simple surgery can restore sight within minutes. In April 2025, RightAid's ophthalmic team conducted a groundbreaking surgical campaign in Kano State that transformed the lives of 300 elderly patients.

The campaign was held at the Kano State Eye Hospital with support from local health authorities. Our team of 8 ophthalmic surgeons, 12 nurses, and 20 support staff worked tirelessly over 14 days, performing an average of 22 surgeries daily. Each patient received comprehensive pre-operative screening, surgery under local anesthesia, and post-operative care including medications and follow-up appointments.

Many patients had been blind for years, unable to work or care for themselves. One 72-year-old grandmother, Hajiya Amina, had not seen her grandchildren in three years. Twenty-four hours after surgery, her vision was restored to 20/40. Stories like hers motivated our team through long operating days.

The campaign also trained 5 local ophthalmic nurses in modern cataract surgical techniques, building sustainable local capacity. We distributed 500 pairs of reading glasses and educated 1,000 community members on eye health and cataract prevention. This initiative proves that targeted surgical interventions can deliver immediate, life-changing results for vulnerable populations.`,
      image: blogImg2,
      category: "Surgery",
      author: "Dr. Amina Ibrahim",
      authorAvatar: blogImg2,
      date: "2025-04-28",
      readTime: "6 min read",
      views: 2100,
      likes: 156,
      comments: 41,
      featured: true,
      tags: ["Eye Care", "Surgery", "Elderly Care"]
   },
   {
      id: 3,
      title: "The State of Maternal Health in Northern Nigeria",
      excerpt: "Exploring the challenges facing pregnant women in remote communities and how RightAid is working to reduce maternal mortality rates.",
      content: `Nigeria accounts for nearly 20% of global maternal deaths, with northern states bearing the highest burden. In remote communities across Sokoto, Zamfara, and Kebbi states, women face multiple barriers to safe childbirth: distance to facilities, lack of skilled birth attendants, cultural practices favoring home delivery, and poverty preventing emergency transport.

RightAid's maternal health program takes a comprehensive approach. We renovated and equipped 12 primary health centers with delivery kits, emergency medications, and solar-powered cold chains for vaccine storage. We trained 48 traditional birth attendants in clean delivery practices, danger sign recognition, and timely referral protocols.

Our community mobilization teams engaged religious and traditional leaders to promote facility-based delivery. We established emergency transport networks using locally available motorcycles and tricycles, with community funds covering fuel costs. Pregnant women received free antenatal care, iron supplements, and mosquito nets.

Over 18 months, facility deliveries increased from 12% to 47% in target communities. Zero maternal deaths were recorded among women who delivered in supported facilities. While challenges remain, these results show that coordinated interventions can rapidly improve maternal health outcomes even in the most underserved regions.`,
      image: blogImg3,
      category: "Maternal Health",
      author: "Nurse Fatima Bello",
      authorAvatar: blogImg3,
      date: "2025-04-10",
      readTime: "10 min read",
      views: 980,
      likes: 67,
      comments: 18,
      featured: false,
      tags: ["Maternal Health", "Northern Nigeria", "Safe Delivery"]
   },
   {
      id: 4,
      title: "Volunteer Spotlight: Meet the Doctors Saving Lives in Borno",
      excerpt: "An inside look at the dedicated medical volunteers working in conflict-affected regions of Northeast Nigeria.",
      content: `Dr. Emmanuel Ojo and his team have spent the last 18 months providing critical care in IDP camps across Borno State. In this exclusive interview, we explore what drives these remarkable professionals to serve in one of Nigeria's most challenging environments.

"When I first arrived at the IDP camp in Maiduguri, I was overwhelmed by the need," Dr. Ojo recalls. "Hundreds of families living in makeshift shelters, children with severe malnutrition, pregnant women without access to basic care. But I was also inspired by their resilience."

The team of 12 volunteers operates a mobile clinic serving three IDP camps weekly. They manage acute illnesses, provide routine immunizations, conduct antenatal clinics, and respond to disease outbreaks. Dr. Ojo specializes in pediatric care, treating an average of 40 children per clinic day.

Living conditions for volunteers are basic. They share accommodation, work long hours, and face security restrictions. Yet turnover is remarkably low. "The gratitude of the community keeps us going," says Nurse Grace, another team member. "When a child recovers from severe malaria or a mother safely delivers, those moments make everything worthwhile."

The team has also trained 25 camp residents as community health workers, creating a sustainable care network. Their work exemplifies how dedicated volunteers can deliver quality healthcare in even the most difficult circumstances.`,
      image: blogImg4,
      category: "Volunteer Stories",
      author: "Grace Emmanuel",
      authorAvatar: blogImg4,
      date: "2025-03-22",
      readTime: "7 min read",
      views: 1560,
      likes: 112,
      comments: 34,
      featured: false,
      tags: ["Volunteers", "Borno", "IDP Camps"]
   },
   {
      id: 5,
      title: "COVID-19 Vaccination Drive: Reaching the Unreached",
      excerpt: "How our mobile vaccination teams brought COVID-19 vaccines to remote villages with zero prior access to immunization services.",
      content: `When the COVID-19 vaccine became available in Nigeria, urban centers were prioritized, leaving rural communities behind. RightAid Health Foundation launched an ambitious mobile vaccination campaign to bridge this gap, targeting 50 remote villages across five states.

Our strategy involved community entry through traditional leaders, town criers, and religious announcements. We addressed vaccine hesitancy through culturally adapted education sessions, using local languages and addressing specific concerns. Community volunteers who had received the vaccine shared their experiences, building trust.

Each mobile team included a doctor, two nurses, a data clerk, and a community mobilizer. We used cold chain boxes to maintain vaccine integrity during long journeys on rough roads. Solar-powered refrigerators at strategic points served as backup storage.

Over six months, we administered 12,500 vaccine doses. Critically, 78% of recipients were receiving their first-ever vaccine of any kind, highlighting the broader immunization gap we addressed. Follow-up surveys showed 94% satisfaction with the service and 89% willingness to recommend vaccination to others.

This campaign demonstrated that with appropriate community engagement and logistical planning, even the most remote populations can be reached with life-saving vaccines.`,
      image: blogImg5,
      category: "Immunization",
      author: "Dr. Chinedu Okonkwo",
      authorAvatar: blogImg5,
      date: "2025-03-08",
      readTime: "5 min read",
      views: 1890,
      likes: 134,
      comments: 29,
      featured: true,
      tags: ["COVID-19", "Vaccination", "Rural Access"]
   },
   {
      id: 6,
      title: "Mental Health in Nigerian Communities: Breaking the Silence",
      excerpt: "Addressing the stigma around mental illness and expanding access to counseling services in underserved areas.",
      content: `Mental health remains one of the most neglected areas of healthcare in Nigeria, with less than 10% of those in need receiving care. Stigma, lack of awareness, and insufficient specialized services create barriers that RightAid is working to dismantle.

Our mental health program began with community sensitization, using drama, radio programs, and community dialogues to challenge misconceptions. We trained primary health workers to recognize common mental health conditions and provide basic counseling. For complex cases, we established telemedicine links to psychiatrists in urban centers.

In 2024, we opened three community counseling centers in Oyo, Enugu, and Kaduna states. These centers provide confidential individual and group counseling, stress management training, and support groups for people living with depression, anxiety, and trauma-related conditions.

The response has been overwhelming. In the first year, over 2,000 people accessed counseling services. Support groups for women survivors of gender-based violence and youth dealing with substance use have been particularly impactful. Community members now openly discuss mental health, a significant shift from the previous silence.

We are advocating for integration of mental health into primary care and training more community counselors. Our vision is a Nigeria where mental health is treated with the same urgency as physical health.`,
      image: blogImg6,
      category: "Mental Health",
      author: "Dr. Amina Ibrahim",
      authorAvatar: blogImg6,
      date: "2025-02-20",
      readTime: "9 min read",
      views: 760,
      likes: 95,
      comments: 45,
      featured: false,
      tags: ["Mental Health", "Stigma", "Counseling"]
   },
   {
      id: 7,
      title: "Dental Health Outreach: Smiles Restored in Oyo State",
      excerpt: "Our dental team provided free extractions, fillings, and oral health education to over 800 patients in rural Oyo communities.",
      content: `Tooth decay and gum disease are prevalent in communities without access to dental care, leading to pain, infection, and lost productivity. In February 2025, RightAid's dental team conducted a comprehensive oral health outreach across 10 rural communities in Oyo State.

The team of 4 dentists, 6 dental therapists, and 8 support staff set up portable dental clinics in schools, churches, and community centers. Over two weeks, they performed 340 extractions, 120 fillings, 80 cleanings, and 200 fluoride treatments. Every patient received oral hygiene education and a toothbrush with toothpaste.

Many patients had suffered with dental pain for months or years. A 45-year-old farmer, Mr. Adebayo, had been unable to eat solid food for three months due to a decayed molar. After extraction, he smiled for the first time in weeks. "I can finally enjoy my wife's cooking again," he said.

The outreach also screened 500 schoolchildren, identifying 180 with dental caries who were referred for treatment. Teachers received training on oral health promotion, and schools were provided with brushing charts and educational materials.

Follow-up plans include establishing a monthly dental clinic at the local health center and training community health workers in basic oral health assessment. This initiative proves that mobile dental services can address significant unmet needs in rural Nigeria.`,
      image: blogImg7,
      category: "Dental Care",
      author: "Dr. Tunde Bakare",
      authorAvatar: blogImg7,
      date: "2025-02-14",
      readTime: "5 min read",
      views: 640,
      likes: 52,
      comments: 12,
      featured: false,
      tags: ["Dental", "Oyo", "Oral Health"]
   },
   {
      id: 8,
      title: "Emergency Response: How We Handled the 2024 Cholera Outbreak",
      excerpt: "A case study in rapid deployment and effective intervention during a public health emergency in Katsina State.",
      content: `When cholera cases began surging in Katsina in August 2024, our emergency response team was activated within 12 hours. What followed was a masterclass in rapid public health response that contained the outbreak and saved hundreds of lives.

Our surveillance team detected the outbreak early through our community health worker network. Within hours, we deployed a rapid response team to the epicenter, set up an emergency operations center, and activated our pre-positioned cholera supplies including oral rehydration salts, IV fluids, antibiotics, and chlorine tablets.

We established three cholera treatment centers with capacity for 150 patients. Staffed by 30 healthcare workers working in shifts, these centers provided 24/7 care. Community mobilizers conducted house-to-house visits to identify cases early and educate families on prevention.

Water, sanitation, and hygiene interventions were critical. We repaired 15 boreholes, distributed 5,000 water purification tablets, and constructed 50 emergency latrines. Handwashing stations were placed at markets, schools, and gathering points.

Over six weeks, we treated 890 cases with a 99.2% survival rate. The outbreak was contained to three local government areas, preventing the widespread transmission seen in previous years. This response demonstrates the value of preparedness, rapid action, and community engagement in managing infectious disease emergencies.`,
      image: blogImg8,
      category: "Emergency Response",
      author: "Dr. Chinedu Okonkwo",
      authorAvatar: blogImg8,
      date: "2025-01-30",
      readTime: "11 min read",
      views: 2340,
      likes: 178,
      comments: 56,
      featured: true,
      tags: ["Cholera", "Emergency", "Outbreak Response"]
   },
   {
      id: 9,
      title: "Training Community Health Workers: A Sustainable Approach",
      excerpt: "Why investing in local health workers creates lasting impact beyond any single medical mission.",
      content: `Every community has individuals passionate about health. Our training program equips them with skills to serve their neighbors long after we leave. This approach has transformed healthcare delivery in 30 communities across Nigeria.

The Community Health Worker (CHW) program selects local residents based on literacy, community standing, and commitment. They undergo six months of training covering basic diagnostics, first aid, maternal and child health, disease prevention, and health education. Training combines classroom instruction with supervised practical experience.

Graduates receive a basic medical kit, a bicycle for community visits, and a monthly stipend funded through community contributions and partner support. They conduct home visits, run community health education sessions, refer complicated cases, and maintain health records.

Impact has been remarkable. Communities with trained CHWs show 60% higher immunization coverage, 45% faster identification of danger signs in pregnancy, and 35% reduction in under-five mortality. CHWs have become trusted health advisors, bridging the gap between communities and formal health systems.

The program's sustainability lies in local ownership. Communities select, support, and supervise their CHWs. As one village head noted, "These health workers are our own children. They know our problems and stay with us." This model proves that investing in local capacity creates lasting change.`,
      image: blogImg9,
      category: "Health Education",
      author: "Nurse Fatima Bello",
      authorAvatar: blogImg9,
      date: "2025-01-15",
      readTime: "7 min read",
      views: 890,
      likes: 71,
      comments: 19,
      featured: false,
      tags: ["Training", "Community Workers", "Sustainability"]
   },
   {
      id: 10,
      title: "Pediatric Surgery: Giving Children a Second Chance",
      excerpt: "Our pediatric surgical program has corrected congenital defects for over 200 children from low-income families.",
      content: `Children born with cleft lips, hernias, and other correctable conditions often face lifelong stigma and health complications. RightAid's pediatric surgical program partners with tertiary hospitals to provide free corrective surgeries for children from families who cannot afford care.

Since 2022, we have sponsored 203 surgeries including 78 cleft lip/palate repairs, 65 hernia repairs, 32 undescended testis corrections, and 28 other procedures. Each child receives comprehensive care: pre-operative assessment, surgery by qualified pediatric surgeons, post-operative care, and long-term follow-up.

The program identifies candidates through community screenings, referrals from primary health centers, and partnerships with traditional birth attendants who notice congenital anomalies early. Families receive transport support, accommodation near surgical centers, and meals during hospitalization.

The impact extends beyond physical correction. Parents report improved social integration, better nutrition, and enhanced self-esteem in their children. One mother described how her 5-year-old son, previously teased for his cleft lip, now smiles freely and attends school confidently.

We are expanding the program to include orthopedic and eye surgeries. Our goal is that no Nigerian child should live with a correctable disability due to poverty.`,
      image: blogImg10,
      category: "Surgery",
      author: "Dr. Amina Ibrahim",
      authorAvatar: blogImg10,
      date: "2024-12-20",
      readTime: "6 min read",
      views: 1120,
      likes: 98,
      comments: 27,
      featured: false,
      tags: ["Pediatrics", "Surgery", "Children"]
   },
   {
      id: 11,
      title: "Nutrition and Malnutrition: Feeding Programs in IDP Camps",
      excerpt: "Addressing severe acute malnutrition among displaced children through therapeutic feeding and nutrition education.",
      content: `In IDP camps across Borno, Adamawa, and Yobe, malnutrition rates among children under 5 exceed emergency thresholds. RightAid's nutrition program combines emergency feeding with long-term prevention strategies.

Our nutrition screening teams use mid-upper arm circumference (MUAC) measurements and weight-for-height assessments to identify malnourished children. Those with severe acute malnutrition receive ready-to-use therapeutic food (RUTF) and weekly monitoring. Moderately malnourished children receive fortified blended foods.

In 2024, we enrolled 450 children in our therapeutic feeding program. Of these, 89% recovered to normal nutritional status within 12 weeks. We also reached 2,000 pregnant and breastfeeding women with micronutrient supplements and nutrition counseling.

Prevention is equally important. Our nutrition education sessions teach mothers about complementary feeding, dietary diversity, and hygiene practices. We support household gardens and provide seeds for nutrient-rich crops. Cooking demonstrations show how to prepare balanced meals with locally available foods.

The program faces ongoing challenges including funding gaps, supply chain disruptions, and the sheer scale of need. However, the visible transformation in children from emaciated to healthy keeps our team motivated. Every recovered child represents hope for Nigeria's future.`,
      image: blogImg1,
      category: "Nutrition",
      author: "Grace Emmanuel",
      authorAvatar: blogImg1,
      date: "2024-12-05",
      readTime: "8 min read",
      views: 730,
      likes: 63,
      comments: 15,
      featured: false,
      tags: ["Nutrition", "IDP", "Malnutrition"]
   },
   {
      id: 12,
      title: "The Role of Technology in Rural Healthcare Delivery",
      excerpt: "How telemedicine, mobile health apps, and digital records are transforming our ability to serve remote communities.",
      content: `Technology is bridging the gap between urban specialists and rural patients. Our telemedicine program connects village clinics with Lagos-based specialists, enabling consultations that would otherwise require days of travel and significant expense.

The system uses solar-powered tablets and mobile internet to transmit patient data, images, and video. A community health worker can capture a skin lesion image, send it to a dermatologist in Lagos, and receive a diagnosis within hours. This has revolutionized care for conditions requiring specialist input.

Our mobile health app supports community health workers with clinical decision algorithms, drug dosage calculators, and referral guidelines. It captures patient encounters, generating real-time data on disease patterns and service utilization. This data drives program improvements and advocacy.

Digital immunization records prevent missed vaccines and enable accurate coverage tracking. Mothers receive SMS reminders before scheduled vaccinations, reducing dropout rates by 40%. Health workers can instantly check a child's vaccination history, even if they move between communities.

Challenges include network connectivity in remote areas, device maintenance, and digital literacy among older health workers. However, the benefits far outweigh these hurdles. Technology is not replacing human connection in healthcare; it is amplifying what dedicated health workers can achieve.`,
      image: blogImg2,
      category: "Innovation",
      author: "Dr. Tunde Bakare",
      authorAvatar: blogImg2,
      date: "2024-11-18",
      readTime: "9 min read",
      views: 1450,
      likes: 120,
      comments: 38,
      featured: false,
      tags: ["Technology", "Telemedicine", "Innovation"]
   },
   {
      id: 13,
      title: "World Health Day 2024: Our Commitment to Universal Health Coverage",
      excerpt: "Reflecting on our progress toward health for all and the road ahead for Nigeria's underserved populations.",
      content: `This World Health Day, we renewed our pledge to leave no community behind in the pursuit of quality healthcare. The theme "My Health, My Right" resonates deeply with our mission to ensure that geography and poverty never determine health outcomes.

Over the past year, RightAid expanded services to 15 new communities, performed 1,200 surgeries, vaccinated 8,000 children, and trained 200 community health workers. These numbers represent lives changed, families supported, and communities strengthened.

However, significant gaps remain. Over 80 million Nigerians lack access to basic health services. Out-of-pocket payments push families into poverty. Health worker shortages, particularly in rural areas, limit service availability. Infrastructure deficits including unreliable power and water supply challenge facility operations.

Our strategy for universal health coverage focuses on three pillars: service expansion to reach the unreached, quality improvement to ensure effective care, and financial protection to prevent catastrophic health expenditure. We advocate for increased government health spending and equitable resource distribution.

Universal health coverage is not a distant dream but an achievable goal. With continued commitment from government, partners, and communities, Nigeria can ensure that every citizen, regardless of location or income, receives the healthcare they need and deserve.`,
      image: blogImg3,
      category: "Awareness",
      author: "Dr. Chinedu Okonkwo",
      authorAvatar: blogImg3,
      date: "2024-11-07",
      readTime: "4 min read",
      views: 560,
      likes: 44,
      comments: 11,
      featured: false,
      tags: ["WHO", "Awareness", "Universal Health"]
   },
   {
      id: 14,
      title: "Hernia Repair Campaign: 150 Surgeries in One Week",
      excerpt: "Our general surgery team set a new record during a week-long campaign in Niger State, transforming lives with simple procedures.",
      content: `Hernias are common in communities where heavy manual labor is the norm, yet surgical repair is often unaffordable. In October 2024, RightAid's general surgery team conducted a record-breaking campaign in Niger State, performing 150 hernia repairs in just seven days.

The campaign was hosted at the General Hospital Minna, with our team of 6 surgeons, 10 anesthetists, and 15 nurses working in two operating theaters from 7 AM to 8 PM daily. Patients ranged from young adults with inguinal hernias to elderly women with incisional hernias, many of whom had lived with painful bulges for years.

Pre-operative screening identified 180 candidates; 150 were cleared for surgery based on fitness and hernia type. Post-operative outcomes were excellent, with only 3 minor wound infections that resolved with antibiotics. No serious complications occurred.

The economic impact is significant. A hernia prevents heavy lifting, limiting agricultural and construction work. Post-surgery, patients report returning to full productivity within six weeks. The campaign effectively restored 150 breadwinners to economic activity.

We trained 4 local surgical officers in mesh hernioplasty techniques, building sustainable capacity. The hospital received donated surgical instruments and mesh supplies. This campaign model is being replicated in other states, proving that focused surgical initiatives can deliver massive impact in short timeframes.`,
      image: blogImg4,
      category: "Surgery",
      author: "Dr. Tunde Bakare",
      authorAvatar: blogImg4,
      date: "2024-10-25",
      readTime: "6 min read",
      views: 870,
      likes: 76,
      comments: 22,
      featured: false,
      tags: ["Hernia", "Surgery", "Niger State"]
   },
   {
      id: 15,
      title: "Hygiene Education: Preventing Disease at the Source",
      excerpt: "How teaching proper handwashing and sanitation practices reduced diarrheal diseases by 60% in target communities.",
      content: `Prevention is always better than cure. Our hygiene education program has reached over 10,000 community members with life-saving messages about handwashing, safe water, and sanitation. The results speak for themselves: diarrheal diseases dropped by 60% in target communities within one year.

The program uses multiple channels to maximize reach. School-based hygiene clubs teach children who then influence family practices. Community drama groups perform entertaining skits highlighting disease transmission and prevention. Religious leaders incorporate hygiene messages into sermons. Market demonstrations show proper handwashing technique using tippy-taps.

We distributed 2,000 handwashing stations (tippy-taps) to households and public places. These simple devices, made from jerry cans and rope, enable handwashing without running water. Communities were taught to construct and maintain them using locally available materials.

Water source protection was another focus. We trained water user committees on spring protection, well maintenance, and chlorination. Water quality testing identified contaminated sources for remediation. Household water treatment with chlorine tablets was promoted for sources that could not be immediately improved.

The 60% reduction in diarrheal diseases translated to fewer clinic visits, less medication use, and improved school attendance. Most importantly, it proved that behavior change interventions, when properly designed and implemented, can achieve health outcomes comparable to clinical interventions at a fraction of the cost.`,
      image: blogImg5,
      category: "Health Education",
      author: "Nurse Fatima Bello",
      authorAvatar: blogImg5,
      date: "2024-10-12",
      readTime: "5 min read",
      views: 520,
      likes: 41,
      comments: 9,
      featured: false,
      tags: ["Hygiene", "Prevention", "Education"]
   },
   {
      id: 16,
      title: "Partner Spotlight: Collaborating with WHO Nigeria",
      excerpt: "How our partnership with the World Health Organization amplifies our impact and extends our reach to the most vulnerable.",
      content: `Since 2021, our collaboration with WHO Nigeria has enabled us to access funding, technical expertise, and global best practices. This partnership exemplifies how international organizations and local NGOs can combine strengths for maximum impact.

WHO support has strengthened our disease surveillance capacity. We now report notifiable diseases through the national system, contributing to early outbreak detection. Training on outbreak investigation and response has improved our emergency readiness. During the 2024 cholera outbreak, this collaboration ensured rapid coordination with state and federal authorities.

Technical guidance from WHO has elevated our program quality. Immunization campaigns now follow global standards for cold chain management and adverse event monitoring. Malaria programs incorporate the latest WHO treatment guidelines. Our data collection aligns with national health information standards.

The partnership has also expanded our reach. WHO funding supported mobile clinic operations in security-compromised areas of Borno State where other partners could not access. Joint advocacy with WHO has influenced state health budgets, increasing allocations for primary healthcare.

Collaboration is not without challenges. Bureaucratic processes can slow implementation, and priorities sometimes differ between global and local perspectives. However, the mutual respect and shared commitment to health equity have enabled effective problem-solving.

As we look ahead, we are exploring collaboration on noncommunicable diseases, health systems strengthening, and pandemic preparedness. Partnerships like this remind us that no organization can achieve health for all alone.`,
      image: blogImg6,
      category: "Partnerships",
      author: "Grace Emmanuel",
      authorAvatar: blogImg6,
      date: "2024-09-28",
      readTime: "7 min read",
      views: 680,
      likes: 58,
      comments: 14,
      featured: false,
      tags: ["WHO", "Partnerships", "Collaboration"]
   },
   {
      id: 17,
      title: "Sickle Cell Awareness: Screening and Support Programs",
      excerpt: "Expanding newborn screening and creating support networks for families affected by sickle cell disease in Nigeria.",
      content: `Nigeria has the highest burden of sickle cell disease in the world. Early diagnosis and comprehensive care can dramatically improve outcomes, yet most Nigerian children with sickle cell are never diagnosed until complications arise.

RightAid's sickle cell program focuses on three pillars: screening, treatment, and support. We have introduced point-of-care screening in 8 primary health centers, enabling same-day diagnosis using simple blood tests. Newborns identified with sickle cell are immediately enrolled in care.

Our treatment protocol follows international standards: prophylactic penicillin to prevent infections, folic acid supplementation, routine immunizations, and malaria prevention. We train parents on fever management, hydration, and when to seek emergency care. Hydroxyurea, a disease-modifying drug, is provided to eligible children.

Support groups have emerged as a powerful intervention. Parents of children with sickle cell meet monthly to share experiences, learn from each other, and receive counseling. These groups reduce the isolation and stigma many families face. Youth groups for adolescents with sickle cell build confidence and peer support.

In two years, we have screened 3,500 newborns, identified 280 with sickle cell disease, and enrolled all in comprehensive care. Emergency room visits among enrolled children have decreased by 70%, and school attendance has improved significantly.

We are advocating for inclusion of sickle cell screening in the national newborn health package. Every child deserves the chance to thrive, regardless of their genetic makeup.`,
      image: blogImg7,
      category: "Awareness",
      author: "Dr. Amina Ibrahim",
      authorAvatar: blogImg7,
      date: "2024-09-15",
      readTime: "8 min read",
      views: 920,
      likes: 87,
      comments: 31,
      featured: false,
      tags: ["Sickle Cell", "Screening", "Genetic Disorders"]
   },
   {
      id: 18,
      title: "Mobile Clinic Deployment: Healthcare on Wheels",
      excerpt: "Inside our fleet of fully equipped mobile clinics bringing diagnostics, treatment, and pharmacy services to remote areas.",
      content: `Our mobile clinics are hospitals on wheels, equipped with examination rooms, diagnostic equipment, and pharmacy supplies. They represent our commitment to reaching communities where static health facilities cannot exist.

The fleet comprises 5 custom-built vehicles: 3 standard mobile clinics, 1 dental unit, and 1 surgical screening unit. Each standard clinic includes a consultation room, basic laboratory (malaria RDT, HIV test, blood glucose), pharmacy stocked with essential medicines, and patient registration system powered by solar energy.

A typical mobile clinic visit follows a structured protocol. Community mobilizers announce the visit one week in advance. On arrival, the team sets up within 30 minutes: awning for waiting patients, registration desk, consultation room, and pharmacy window. Patients flow through triage, consultation, testing, treatment, and health education.

In 2024, our mobile clinics conducted 450 visits, serving 28,000 patients. The most common conditions treated were malaria, respiratory infections, skin diseases, and hypertension. We referred 1,200 patients to higher-level facilities for conditions beyond mobile clinic capacity.

The mobile clinic model faces challenges: vehicle maintenance on rough roads, fuel costs, staff fatigue from constant travel, and weather disruptions. However, the gratitude of communities who would otherwise have no access to care makes it worthwhile.

We are exploring electric vehicle options and telemedicine integration to enhance mobile clinic capabilities. Healthcare on wheels will remain central to our strategy for reaching the unreached.`,
      image: blogImg8,
      category: "Medical Outreach",
      author: "Dr. Tunde Bakare",
      authorAvatar: blogImg8,
      date: "2024-08-30",
      readTime: "6 min read",
      views: 1050,
      likes: 93,
      comments: 25,
      featured: false,
      tags: ["Mobile Clinic", "Rural Access", "Diagnostics"]
   },
   {
      id: 19,
      title: "Annual Report 2023: A Year of Milestones",
      excerpt: "Reviewing our achievements, challenges, and lessons learned as we expanded to serve 50+ communities across Nigeria.",
      content: `2023 was a transformative year for RightAid Health Foundation. We reached more patients, performed more surgeries, and trained more health workers than ever before. This annual report reflects on our journey and the road ahead.

By the numbers: 45,000 patients served through clinics and outreach programs, 850 surgeries performed, 12,000 children immunized, 150 community health workers trained, 30 communities reached for the first time, and 15 new partnerships established. These figures represent a 40% increase over 2022.

Major achievements included the launch of our pediatric surgery program, expansion into the Niger Delta region, and accreditation as a WHO collaborating center for community health. We received the Nigerian Healthcare Excellence Award for Best NGO in Primary Care.

Challenges were equally significant. Funding constraints limited expansion plans. Security situations in some northern communities restricted access. Staff retention remained difficult as trained workers were recruited by better-paying organizations. Supply chain disruptions affected medicine availability.

Lessons learned shaped our 2024 strategy. We invested more in local capacity building to reduce dependency on external staff. Diversified funding sources reduced vulnerability to donor shifts. Improved supply chain management including buffer stocks prevented stockouts.

Our 2024-2026 strategic plan targets 100 communities, 100,000 annual patients, and establishment of 5 permanent rural health centers. With continued support from partners, donors, and communities, these ambitious goals are achievable. Together, we are building a healthier Nigeria.`,
      image: blogImg9,
      category: "Reports",
      author: "Grace Emmanuel",
      authorAvatar: blogImg9,
      date: "2024-08-10",
      readTime: "12 min read",
      views: 3100,
      likes: 245,
      comments: 67,
      featured: true,
      tags: ["Annual Report", "2023", "Milestones"]
   },
   {
      id: 20,
      title: "Youth Health Ambassadors: Empowering the Next Generation",
      excerpt: "Our school-based health education program trains young people to become health advocates in their communities.",
      content: `Adolescents and young adults are powerful agents of change. Our Youth Health Ambassador program equips them with knowledge and leadership skills to promote health in their schools and communities.

The program selects students from secondary schools based on academic performance, communication skills, and community involvement. Selected ambassadors undergo intensive training covering reproductive health, substance abuse prevention, nutrition, mental health, and first aid. Training uses participatory methods including role plays, debates, and peer education techniques.

Ambassadors then design and implement health promotion projects in their schools. These have included anti-bullying campaigns, menstrual hygiene programs, substance abuse awareness weeks, and healthy eating initiatives. Each project is supported with seed funding and mentorship from RightAid staff.

In 2024, 120 Youth Health Ambassadors from 24 schools reached an estimated 15,000 peers with health messages. School health clubs established by ambassadors continue activities independently. Several ambassadors have pursued health-related university courses, inspired by their experience.

The program addresses critical adolescent health needs. Nigeria's youth face high rates of unintended pregnancy, sexually transmitted infections, substance use, and mental health challenges. Peer education is proven more effective than adult-led instruction for these sensitive topics.

We are developing an alumni network to maintain engagement beyond school years and exploring digital platforms to amplify youth voices. The next generation of health leaders is emerging, and they are passionate, creative, and committed to change.`,
      image: blogImg10,
      category: "Health Education",
      author: "Nurse Fatima Bello",
      authorAvatar: blogImg10,
      date: "2024-07-22",
      readTime: "6 min read",
      views: 480,
      likes: 39,
      comments: 8,
      featured: false,
      tags: ["Youth", "Education", "Advocacy"]
   }
];

export const categories = [
   { name: "All", icon: "FaNewspaper", count: blogs.length },
   { name: "Medical Outreach", icon: "FaStethoscope", count: blogs.filter(b => b.category === "Medical Outreach").length },
   { name: "Surgery", icon: "FaProcedures", count: blogs.filter(b => b.category === "Surgery").length },
   { name: "Maternal Health", icon: "FaBaby", count: blogs.filter(b => b.category === "Maternal Health").length },
   { name: "Immunization", icon: "FaSyringe", count: blogs.filter(b => b.category === "Immunization").length },
   { name: "Mental Health", icon: "FaBrain", count: blogs.filter(b => b.category === "Mental Health").length },
   { name: "Emergency Response", icon: "FaHeartbeat", count: blogs.filter(b => b.category === "Emergency Response").length },
   { name: "Health Education", icon: "FaBullhorn", count: blogs.filter(b => b.category === "Health Education").length },
   { name: "Volunteer Stories", icon: "FaHandsHelping", count: blogs.filter(b => b.category === "Volunteer Stories").length },
   { name: "Partnerships", icon: "FaGlobeAfrica", count: blogs.filter(b => b.category === "Partnerships").length },
];