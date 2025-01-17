/* eslint-disable react-hooks/exhaustive-deps */
import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { LoginState } from '../states/LoginState';
import UserState from '../states/UserState';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [user] = useRecoilState(UserState);

  const mobile_navbar = css`
    @media screen and (max-width: 768px) {
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 1rem 3rem;
      background-color: #fff3e3;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 72px;
      z-index: 2;
      a {
        opacity: 50%;
        color: #dc602a;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          font-size: 2.3rem;
          padding-bottom: 0.5rem;
        }
        .nav_text {
          font-size: 0.8rem;
        }
        :hover {
          opacity: 100%;
        }
        :active {
          opacity: 100%;
        }
      }
    }
    @media screen and (min-width: 769px) {
      display: none;
    }
  `;

  const desktop_navbar = css`
    @media screen and (max-width: 768px) {
      display: none;
    }
    height: 75px;
    width: 100%;
    background-color: #fff3e3;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2;
    li {
      list-style: none;
    }
    a {
      text-decoration: none;
      color: black;
      font-size: 1rem;
      :hover {
        font-weight: 500;
      }
    }
    .logo {
      cursor: default;
      color: #dc602a;
      font-weight: 700;
      font-size: 2rem;
      margin-right: 2rem;
    }
    .menus {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100%;
    }
    .tabs {
      display: flex;
      align-items: center;
      a {
        margin-right: 2rem;
      }
    }
  `;

  useEffect(() => {
    if (localStorage.getItem('accessToken')) setIsLoggedIn(true);
  }, []);

  return (
    <>
      <nav css={mobile_navbar}>
        <Link href="/">
          <a>
            <Icon icon="akar-icons:home" className="icon" />
            <p className="nav_text">메인</p>
          </a>
        </Link>
        <Link href="/walks">
          <a>
            <Icon icon="ph:dog" className="icon" />
            <p className="nav_text">산책 찾기</p>
          </a>
        </Link>
        {isLoggedIn ? (
          <Link href={`/users/${user.id}`}>
            <a>
              <Icon
                icon="fluent-emoji-high-contrast:paw-prints"
                className="icon"
              />
              <p className="nav_text">마이페이지</p>
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a>
              <Icon
                icon="fluent-emoji-high-contrast:paw-prints"
                className="icon"
              />
              <p className="nav_text">마이페이지</p>
            </a>
          </Link>
        )}
      </nav>
      <nav css={desktop_navbar}>
        <div className="menus">
          <ul className="tabs">
            <li className="logo">ㅅㅊ</li>
            <li>
              <Link href="/">
                <a>홈</a>
              </Link>
            </li>
            <li>
              <Link href="/walks">
                <a>산책 찾기</a>
              </Link>
            </li>
          </ul>
          {isLoggedIn ? (
            <Link href={`/users/${user.id}`}>
              <a>마이페이지</a>
            </Link>
          ) : (
            <Link href="/login">
              <a>로그인/회원가입</a>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
