import styled from 'styled-components'

export const LoadingCircle = styled.section`

background: black !important;
opacity: .8 !important;
position: absolute !important;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
width: 150px !important;
height: 150px !important;
display: flex;
justify-content: center;
align-items: center;
& > div{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: transparent;
    border-bottom: 2px solid white;
    border-top: 2px solid white;
    border-left: 2px solid black;
    border-right: 2px solid black;
    animation-name: spiningCircle;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;    
}
@keyframes spiningCircle {
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
}
`