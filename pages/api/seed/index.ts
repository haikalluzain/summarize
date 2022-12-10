import { UserModel } from 'models/User'
import mongoose from 'mongoose'
import { NextApiResponse } from 'next'
import { IEducation } from 'types/IEducation'
import { IExperience } from 'types/IExperience'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import { generateHash } from 'utils/password'
import {
  responseInternalServerError,
  responseMethodNotAllowed,
  successResponse,
} from 'utils/response'
import { CertificateModel } from './../../../models/Certificate'
import { EducationModel } from './../../../models/Education'
import { ExperienceModel } from './../../../models/Experience'
import { LanguageModel } from './../../../models/Language'
import { PersonalDetailModel } from './../../../models/PersonalDetail'
import { ResumeModel } from './../../../models/Resume'
import { SkillModel } from './../../../models/Skill'
import { SummaryModel } from './../../../models/Summary'
import { ICertificate } from './../../../types/ICertificate'
import { ILanguage } from './../../../types/ILanguage'
import { IPersonalDetail } from './../../../types/IPersonalDetail'
import { IResume } from './../../../types/IResume'
import { ISkill } from './../../../types/ISkill'
import { ISummary } from './../../../types/ISummary'
import { IUser } from './../../../types/IUser'

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    req = await nextMiddleware(req, res)

    const db = await mongoose.connection.db
    const collections = await db.listCollections().toArray()

    for (const collectionName of collections.map(
      (collection) => collection.name
    )) {
      await db.dropCollection(collectionName)
    }

    if (req.method === 'POST') {
      // USER 1
      const user1 = await userSeeder({
        name: 'Haikal F Luzain',
        email: 'haikal@gmail.com',
        password: '12345678',
      })
      const resume1 = await resumeSeeder(user1, true)
      await personalDetailSeeder(resume1, personalDetailUser1)
      await experienceSeeder(resume1, experiencesUser1)
      await educationSeeder(resume1, educations)
      await skillSeeder(resume1, skills)
      await certificateSeeder(resume1, certificates)
      await languageSeeder(resume1, languages)
      await summarySeeder(resume1, summaryUser1)

      // USER 2
      const user2 = await userSeeder({
        name: 'Zhafari Irsyad',
        email: 'zhafari@gmail.com',
        password: '12345678',
      })
      const resume2 = await resumeSeeder(user2, true)
      await personalDetailSeeder(resume2, personalDetailUser2)
      await experienceSeeder(resume2, experiencesUser2)
      await educationSeeder(resume2, educations)
      await skillSeeder(resume2, skills)
      await certificateSeeder(resume2, certificates)
      await languageSeeder(resume2, languages)
      await summarySeeder(resume2, summaryUser2)

      return successResponse(res, 'Data seeding successfully')
    }

    return responseMethodNotAllowed(res)
  } catch (e) {
    console.error(e)
    return responseInternalServerError(res)
  }
}

const userSeeder = async (payloads: IUser) => {
  try {
    const pass = await generateHash(payloads.password)
    return await UserModel.create({
      name: payloads.name,
      email: payloads.email,
      password: pass,
    })
  } catch (e) {
    console.log('[User Seeder Error] ', e)
  }
}

const resumeSeeder = async (user: IUser, isDefault: boolean = false) => {
  try {
    return await ResumeModel.create({
      user: user._id,
      active: true,
      default: isDefault,
    })
  } catch (e) {
    console.log('[Task Seeder Error] ', e)
  }
}

const personalDetailSeeder = async (
  resume: IResume,
  payloads: IPersonalDetail
) => {
  try {
    return await PersonalDetailModel.create({
      ...payloads,
      resume,
    })
  } catch (e) {
    console.log('[Personal Detail Seeder Error] ', e)
  }
}

const experienceSeeder = async (resume: IResume, payloads: IExperience[]) => {
  try {
    return payloads.forEach(async (item) => {
      await ExperienceModel.create({
        ...item,
        resume,
      })
    })
  } catch (e) {
    console.log('[Experience Seeder Error] ', e)
  }
}

const educationSeeder = async (resume: IResume, payloads: IEducation[]) => {
  try {
    return payloads.forEach(async (item) => {
      await EducationModel.create({
        ...item,
        resume,
      })
    })
  } catch (e) {
    console.log('[Education Seeder Error] ', e)
  }
}

const skillSeeder = async (resume: IResume, payloads: ISkill[]) => {
  try {
    return payloads.forEach(async (item) => {
      await SkillModel.create({
        ...item,
        resume,
      })
    })
  } catch (e) {
    console.log('[Skill Seeder Error] ', e)
  }
}

const certificateSeeder = async (resume: IResume, payloads: ICertificate[]) => {
  try {
    return payloads.forEach(async (item) => {
      await CertificateModel.create({
        ...item,
        resume,
      })
    })
  } catch (e) {
    console.log('[Certificate Seeder Error] ', e)
  }
}

const languageSeeder = async (resume: IResume, payloads: ILanguage[]) => {
  try {
    return payloads.forEach(async (item) => {
      await LanguageModel.create({
        ...item,
        resume,
      })
    })
  } catch (e) {
    console.log('[Language Seeder Error] ', e)
  }
}

const summarySeeder = async (resume: IResume, payloads: ISummary) => {
  try {
    return await SummaryModel.create({
      ...payloads,
      resume,
    })
  } catch (e) {
    console.log('[Summary Seeder Error] ', e)
  }
}

const summaryUser1: ISummary = {
  body: 'I have been focused on programming since high school. Even though I haven‘t graduated with my bachelor‘s degree, I can compete with those who already have. I can easily learn new things in the software development orbit.',
  active: true,
}

const summaryUser2: ISummary = {
  body: 'I have been focused on programming since high school. Even though I haven‘t graduated with my bachelor‘s degree, I can compete with those who already have. I can easily learn new things in the software development orbit.',
  active: true,
}

const personalDetailUser1: IPersonalDetail = {
  firstName: 'Haikal Fikri',
  lastName: 'Luzain',
  jobTitle: 'Backend Engineer',
  email: 'haikal@gmail.com',
  phoneNumber: '0812345678',
  website: 'www.google.com',
  country: 'Indonesia',
  city: 'Jakarta',
}

const educations: IEducation[] = [
  {
    institute: 'Wikrama Vocational High School',
    degree: '',
    graduationYear: 2019,
    graduationMonth: 'June',
    description: '',
  },
  {
    institute: 'Mercu Buana University',
    degree: 'Bachelor‘s Degree',
    graduationYear: 2023,
    graduationMonth: 'December',
    description: '',
  },
]

const experiencesUser1: IExperience[] = [
  {
    jobTitle: 'Backend Developer',
    company: 'Kickavenue',
    startYear: 2020,
    startMonth: 'November',
    endYear: null,
    endMonth: null,
    current: true,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
]

const experiencesUser2: IExperience[] = [
  {
    jobTitle: 'Fullstack Developer',
    company: 'Kelas.com',
    startYear: 2019,
    startMonth: 'November',
    endYear: null,
    endMonth: null,
    current: true,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
]

const skills: ISkill[] = [
  {
    name: 'PHP',
    rating: 'Expert',
  },
  {
    name: 'JavaScript',
    rating: 'Advanced',
  },
  {
    name: 'Golang',
    rating: 'Intermediate',
  },
  {
    name: 'SQL',
    rating: 'Advanced',
  },
  {
    name: 'NO SQL',
    rating: 'Intermediate',
  },
  {
    name: 'Mongo DB',
    rating: 'Intermediate',
  },
  {
    name: 'Typescript',
    rating: 'Advanced',
  },
  {
    name: 'Node js',
    rating: 'Advanced',
  },
  {
    name: 'React js',
    rating: 'Advanced',
  },
  {
    name: 'Next js',
    rating: 'Intermediate',
  },
]

const languages: ILanguage[] = [
  {
    name: 'English',
    rating: 'Intermediate',
  },
]

const certificates: ICertificate[] = [
  {
    name: 'SQL (Intermediate)',
    organization: 'HackerRank',
    startYear: 2020,
    startMonth: 'May',
    endYear: null,
    endMonth: null,
    doesNotExpire: true,
    description: '',
  },
  {
    name: 'JavaScript (Intermediate)',
    organization: 'HackerRank',
    startYear: 2020,
    startMonth: 'April',
    endYear: null,
    endMonth: null,
    doesNotExpire: true,
    description: '',
  },
  {
    name: 'Go (Basic)',
    organization: 'HackerRank',
    startYear: 2020,
    startMonth: 'June',
    endYear: null,
    endMonth: null,
    doesNotExpire: true,
    description: '',
  },
]

const personalDetailUser2: IPersonalDetail = {
  firstName: 'Zhafari',
  lastName: 'Irsyad',
  jobTitle: 'Fullstack Developer',
  email: 'zhafari@gmail.com',
  phoneNumber: '0812345678',
  website: 'www.google.com',
  country: 'Indonesia',
  city: 'Bogor',
}
