export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  image?: string;
  url?: string;
}
