import styled from 'styled-components'
import {ReactComponent as closeImg} from '../../asset/close.svg'

export const Close = styled(closeImg)`
    width: 30px;
    height: 30px;
    cursor: pointer;
    & > g{
        & > line{
            stroke: ${p=>p.color};
        }
    }
`  