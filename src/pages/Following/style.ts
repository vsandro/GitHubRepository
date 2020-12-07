import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface FormProps {
    hasError: boolean,
}

export const Title = styled.h1`
    font-size: 48px;
    color: #3a3a3a;
    max-width: 500px;
    line-height: 56px;

    margin-top: 80px;
`

export const UserInfo = styled.div`
    margin-top: 80px;
    max-width: 920px;

    a {
        background: #fff;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: block;
        text-decoration: none;

        display: flex;
        align-items: center;
        transition: transform 0.2s;

        &:hover {
            transform: translateX(10px);
        }
 
        & + a {
            margin-top: 16px;
        }

        img {
            width: 64px;
            height: 64px;
            border-radius: 50%;
        }

        div {
            margin: 0 16px;
            flex: 1;

            strong {
                font-size: 20px;
                color: #3d3d4d;
            }

            span {
                font-size: 20px;
                color: #3d3d4d;
            }

            p {
                font-size: 18px;
                color: #a8a8b3;
                margin-top: 4px;
            }
        }

        svg {
            margin-left: auto;
            color: #cbcbd6;
        }        
    }
`
