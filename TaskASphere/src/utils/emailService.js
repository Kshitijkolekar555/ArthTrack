import emailjs from '@emailjs/browser';

/**
 * Sends an email notification to the employee when a task is assigned.
 * Replace placeholders with your actual EmailJS credentials.
 */
export const sendEmailNotification = (employeeName, employeeEmail, taskTitle, taskDescription) => {
    const serviceId = 'YOUR_SERVICE_ID'; // Replace with your Service ID
    const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
    const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key

    const templateParams = {
        to_name: employeeName,
        to_email: employeeEmail,
        task_title: taskTitle,
        task_description: taskDescription,
        from_name: 'EMS Admin',
    };

    return emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
            return response;
        })
        .catch((error) => {
            console.error('Failed to send email:', error);
            throw error;
        });
};
