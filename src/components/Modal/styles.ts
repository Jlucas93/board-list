import { TransitionStatus } from 'react-transition-group'
import styled, { keyframes } from 'styled-components'
export const Container = styled.div`
  position: fixed;
  display: flex;
  z-index: 101;
  inset: 0;
`

interface IFade {
  status: TransitionStatus
  delay: number
}
export const Fade = styled.div<IFade>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  z-index: -1;
  transition: ${({ delay }) => delay - 100}ms ease-in;
  opacity: ${({ status }) => status === 'entered' ? .3 : 0};
`
const showAnimation = keyframes`
  0% {
    transform: scale(.7)
  }
  45% {
    transform: scale(1.05)
  }
  80% {
    transform: scale(.95)
  }
  100% {
    transform: scale(1)
  }
`
export const AnimatedDialogDiv = styled.div`
  background-color: #fff;
  animation: ${showAnimation} .3s;
`
export const AnimatedDialogForm = styled.form`
  background-color: #fff;
  animation: ${showAnimation} .3s;
`