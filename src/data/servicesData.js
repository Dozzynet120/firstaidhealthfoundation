import {
   FaStethoscope,
   FaProcedures,
   FaTooth,
   FaBullhorn,
} from "react-icons/fa";

export const servicesData = [
   {
      id: "medical-consultation",
      title: "Medical Consultation & Counselling",
      icon: FaStethoscope,
      image:
         "https://images.unsplash.com/photo-1580281657527-47f249e8f6b0",
      description:
         "Free medical assessments, health education, and chronic disease guidance.",

      impact: {
         before:
            "Many rural residents lacked access to doctors and medical advice.",
         after:
            "Thousands of patients now receive regular consultations and preventive healthcare support.",
      },
   },

   {
      id: "surgical-outreach",
      title: "Surgical Outreach Programs",
      icon: FaProcedures,
      image:
         "https://images.unsplash.com/photo-1584362917165-526a968579e8",
      description:
         "Life-saving surgeries delivered directly to underserved communities.",

      impact: {
         before:
            "Patients with treatable conditions often had no access to surgery.",
         after:
            "Hundreds of successful surgeries have restored health and hope.",
      },
   },

   {
      id: "dental-care",
      title: "Dental & Oral Health Care",
      icon: FaTooth,
      image:
         "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
      description:
         "Preventive and corrective dental services and oral health education.",

      impact: {
         before:
            "Communities suffered untreated dental pain and poor oral hygiene.",
         after:
            "Families now benefit from dental treatment and oral health awareness.",
      },
   },

   {
      id: "health-awareness",
      title: "Health Awareness Campaigns",
      icon: FaBullhorn,
      image:
         "https://images.unsplash.com/photo-1584515933487-779824d29309",
      description:
         "Community education and health awareness programs.",

      impact: {
         before:
            "Limited access to health education increased preventable illnesses.",
         after:
            "Communities now understand disease prevention and healthy practices.",
      },
   },
];