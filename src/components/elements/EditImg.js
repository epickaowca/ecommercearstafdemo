import styled from 'styled-components'
import {ReactComponent as EditImg} from '../../asset/edit.svg'

export const Edit = styled(EditImg)`
    width: 30px;
    height: 30px;
    cursor: pointer;
    & > path{
        fill: ${p=>p.color};
    }
`  