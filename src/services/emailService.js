import emailjs from "emailjs-com";

export const sendVolunteerApprovalEmail = (volunteer) => {
   return emailjs.send(
      "service_qnujgrl",
      "template_c0qo99q",
      {
         to_name: volunteer.name,
         to_email: volunteer.email,
         message: `Congratulations! Your volunteer application has been approved. Your ID: ${volunteer.volunteerId}`,
      },
      "YOUR_PUBLIC_KEY"
   );
};