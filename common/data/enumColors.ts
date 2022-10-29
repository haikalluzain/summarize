import { TColor } from '../../types/color'

export interface IColors {
  [key: string]: {
    name: TColor
    code: string
  }
}
const COLORS: IColors = {
  PRIMARY: {
    name: 'primary',
    code: String(process.env.PRIMARY_COLOR),
  },
  SECONDARY: {
    name: 'secondary',
    code: String(process.env.SECONDARY_COLOR),
  },
  SUCCESS: {
    name: 'success',
    code: String(process.env.SUCCESS_COLOR),
  },
  INFO: {
    name: 'info',
    code: String(process.env.INFO_COLOR),
  },
  WARNING: {
    name: 'warning',
    code: String(process.env.WARNING_COLOR),
  },
  DANGER: {
    name: 'danger',
    code: String(process.env.DANGER_COLOR),
  },
  DARK: {
    name: 'dark',
    code: String(process.env.DARK_COLOR),
  },
  LIGHT: {
    name: 'light',
    code: String(process.env.LIGHT_COLOR),
  },
}

export function getColorNameWithIndex(index: number) {
  /*
   * The size has been reduced by one so that the LIGHT color does not come out.
   */
  // @ts-ignore
  return COLORS[Object.keys(COLORS)[index % (Object.keys(COLORS).length - 1)]]
    .name
}

export default COLORS
