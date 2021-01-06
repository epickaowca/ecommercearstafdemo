import styled from 'styled-components'

export const HomeButton = styled.button`
outline: none;
border: ${p=>!p.case2 ? `1px solid ${p.theme.color1}` : 'none'};
background: ${p=>p.theme.color1};
color: white;
padding: 15px 35px;
font-size: 1rem;
font-weight: 500;
cursor: pointer;
${p=>p.case2 && `
background: rgba(255,255,255,.1);
backdrop-filter: blur(10px);
box-shadow: 0px 0px 10px 0px rgba(0,0,0,.5);
font-weight: 700;
`}
&:hover{
${p=>!p.case2 && p.landPage ? `border: 1px solid white` : `border: 1px solid ${p.theme.color1}`};
background: transparent;
color: ${p=>p.case2 ? 'white' : p.landPage ? 'white' : p.theme.color1};
}
`