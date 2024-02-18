import { createSlice } from '@reduxjs/toolkit'

const initialState: Resume = {
  details: {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    website: '',
  },
  education: [],
  experience: [],
  skills: {
    skills: [],
    number_of_years: [],
    skill_type: [],
  },
  projects: [],
}


export const detailsSlice = createSlice({
  name: 'details',
  initialState: initialState,
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload
    },
    setEducation: (state, action) => {
      state.education = action.payload
    },
    setExperience: (state, action) => {
      state.experience = action.payload
    },
    setSkills: (state, action) => {
      state.skills = action.payload
    },
    setProjects: (state, action) => {
      state.projects = action.payload
    },
  }
})

export interface Resume {
  details: IDetails;
  education: IEducation[];
  experience: IExperience[];
  skills: ISkills;
  projects: IProjects[];
}


export interface IDetails {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface IEducation {
  level_of_education: string;
  school: string;
  field_of_study: string;
  school_location: string;
  from_date: string;
  to_date: string;
}

export interface IExperience {
  company: string;
  position: string;
  dates: string;
  responsibilities: string[];
  id: string;
}

export interface ISkills {
  skills: string[];
  number_of_years: string[];
  skill_type: string[];
}

export interface IProjects {
  title: string;
  technologies: string[];
  description: string[];
}


// Action creators are generated for each case reducer function
export const { setDetails, setEducation, setExperience, setSkills, setProjects } = detailsSlice.actions

export default detailsSlice.reducer