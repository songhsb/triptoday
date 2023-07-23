# Create React App - Todo List App
React 아웃소싱 팀프로젝트 2023.07.17-2023.07.24

# 프로젝트 소개
오늘의 여행 ( 여행 명소 정보 제공 플랫폼 )
- 관리자가 추가한 여행 명소에 댓글을 달 수 있는 일반 유저
- 지도 API를 사용해 지역 단위, 또는 테마 별로 위치 및 정보 제공
- 다양한 여행 정보를 제공하여 국내의 숨은 명소 정보 제공
- 지도 서비스 지원을 통해 사용자가 시각적 정보를 제공 받을 수 있음

# 기술스택
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

# 구현기능
  - 글 작성
  - 글 조회
  - 글 삭제
  - 글 완료 상태 변경
  - 글 상세페이지 이동
  - 회원가입 (아이디중복 / 유효성 검사)
  - 로그인/로그아웃 (로그인 상태에 따라 보여지는 버튼)
    
# API 명세

| 기능   | URL         | Method | Request                                      | Response                                             |
| ------ | ------------ | -------- | ------------------------------------------- | -------------------------------------------------- |
| 회원가입 | /join | `POST`   |   id: string,uid: string,email: string,password: string,nickName: string  |  | 
| 로그인 | /login | `POST`   | email: string,password: string  |    |
| 메인페이지 | /posts | `GET`     | |      adminId,location : string,title : string,body : string,image : string        |
|상세페이지 | /detail | `GET`    |      |   adminId,location : string,title : string,body : string,image : string   |
| 글작성(관리자) | /posts | `POST`   | id,email: string,category: string,location: string,description: string,image: string     |      |
| 글수정(관리자) | /posts/:id | `PATCH`   | adminId,postId,location : string,title : string,body : string,image : string,   |      |

| 글삭제(관리자) | /post/:id | `DELETE`   |     |      |

| 댓글 등록 |  | `POST`   | userId,postId,comment : string, date,   |      |
| 댓글 수정 | /comments/:id | `PATCH`   |comment ID|      |
| 댓글 등록 | /comments/:id | `DELETE`   | comment ID |      |

