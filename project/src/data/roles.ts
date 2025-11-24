export interface Role {
  id: number;
  title: string;
  type: string;
  location: string;
  eligibility: string;
  description: string;
}

export const roles: Role[] = [
  {
    id: 1,
    title: "Marketing Intern",
    type: "Internship",
    location: "Remote / Chennai",
    eligibility: "Students / Freshers",
    description: "Drive growth strategies and create compelling campaigns for our AI platform."
  },
  {
    id: 2,
    title: "Video Editing Intern",
    type: "Internship",
    location: "Remote / Chennai",
    eligibility: "Students / Freshers",
    description: "Craft engaging video content that showcases our innovative AI solutions."
  },
  {
    id: 3,
    title: "Computer Vision Intern",
    type: "Internship",
    location: "Remote / Chennai",
    eligibility: "Students / Freshers",
    description: "Work on cutting-edge computer vision models and image processing pipelines."
  },
  {
    id: 4,
    title: "Data Annotation/Analytics Intern",
    type: "Internship",
    location: "Remote / Chennai",
    eligibility: "Students / Freshers",
    description: "Transform raw data into insights and maintain high-quality training datasets."
  },
  {
    id: 5,
    title: "Business Development Intern",
    type: "Internship",
    location: "Remote / Chennai",
    eligibility: "Students / Freshers",
    description: "Identify opportunities and build partnerships to expand our market presence."
  },
  {
    id: 6,
    title: "AI Intern",
    type: "Internship",
    location: "Remote / Chennai",
    eligibility: "Students / Freshers",
    description: "Develop and optimize AI models that power next-generation applications."
  },
  {
    id: 7,
    title: "Backend Intern",
    type: "Internship",
    location: "Remote / Chennai",
    eligibility: "Students / Freshers",
    description: "Build scalable APIs and microservices that handle millions of requests."
  },
  {
    id: 8,
    title: "Frontend Intern",
    type: "Internship",
    location: "Remote / Chennai",
    eligibility: "Students / Freshers",
    description: "Create stunning user interfaces with modern frameworks and best practices."
  },
  {
    id: 9,
    title: "Full Stack Intern",
    type: "Internship",
    location: "Remote / Chennai",
    eligibility: "Students / Freshers",
    description: "Work across the entire stack to deliver end-to-end features and solutions."
  },
  {
    id: 10,
    title: "Cloud Engineering Intern",
    type: "Internship",
    location: "Remote / Chennai",
    eligibility: "Students / Freshers",
    description: "Design and maintain cloud infrastructure for high-availability AI systems."
  }
];
