export interface Skill {
  name: string
  rating: string
}

export interface Experience {
  job_title: string
  total_years: number
  description: string
}

export interface Certificate {
  name: string
  organization: string
}

export interface ICandidate {
  _id?: string
  full_name: string
  job_title: string
  summaries: string
  email: string
  img_url?: any
  phone_number: string
  country: string
  city: string
  skills: Skill[]
  experiences: Experience[]
  certificates: Certificate[]
  has_degree: boolean
  created_at: Date
  updated_at: Date
}

export interface CandidateState {
  current_page: number
  last_page?: number
  next_page?: number
  per_page: number
  total_hits: number
  data: ICandidate[]
}
