import styled from 'styled-components'
import {ReactComponent as hamburgerImg} from '../../asset/hamburger.svg'

export const Hamburger = styled(hamburgerImg)`
    width: 50px;
    height: 50px;
    cursor: pointer;
    & > g{
        & > line{
            stroke: ${p=>p.color};
        }
    }
`