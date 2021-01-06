import styled from 'styled-components'

export const Button = styled.button`
    color: ${p=>p.case2 ? 'black' : 'white'};
    background: ${p=>p.case2 ? 'white' : p.theme.color1};
    min-width: ${p=>p.case2 ? '40px' : '70px'};
    cursor: pointer;
    outline: none;
    border: ${p=>p.noborder ? 'none' : `2px solid ${p.theme.color1}`};
    padding: ${p=>p.case2 ? '20px 15px' : '10px 20px' };
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    overflow: hidden;
    height: ${p=>p.case2 ? '40px' : '50px'};
    width: ${p=>p.width};
    height: ${p=>p.height};
    ${p=>p.width ? 'display: flex; justify-content: center;': null}
 
    & > svg{
        margin-left: 20px;
    }

    &:hover{
        ${p=>p.case2 ? `background: ${p.theme.color1}; color: white`: `background: white; color: ${p.theme.color1}`}
    }
    &:hover svg{
        fill: white !important;
    }
`

