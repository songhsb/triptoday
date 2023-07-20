/* 
  💟 heart onClick에 연결된 함수의 매개변수에 로그인 "loginUserEmail"(loginUserEmail,null), "fullheart"(true/false값)
  ※ post 조회할 때 likes collection에 post 정보 
    - 미로그인 user일 경우 heart false값
    - 없으면 -> axios.post로 'postId로' 일단 공간만 만들어주기! {"id":postId, "userList" : []}
      + 만든 후 false값 반환 
      => const heart = false
      => const totalLikes = data.userList()
    - 있으면 -> postId -> userList에 user 있는지 확인 -> user 있으면 heart = true값 반환
                                                    user 없으면 heart = false값 반환  

  ※ user가 하트 클릭시 (onClickHeartHandler = (loginUserEmail,fullheart)=>{
    1. 로그인 확인 
      if (!!loninUserEmail) {
        alert('로그인 후 좋아요 표시가 가능합니다.')
        return false
      }
    2. 로그인 true이고 & fullheart가 false일 경우 
      => login : axios.patch => likes/postId/users
  })
*/

import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useQuery } from 'react-query';
import { getLikes } from '../../api/likes';

const LikesPosts = ({ postId }) => {
  /** NOTE [임시 code] useEffect에 있는 auth 불러오는 logic은 임시 code로 추후 삭제 예정
   * (이 loginUserId는 지금은 auth불러서 가져오는데 -> 나중에 승범님이 Detail 조회에서 ?가져오실 auth정보를 props로 내려받아 내려올 예정임) */
  const [loginUserEmail, setLoginUserEmail] = useState(null);
  const { data, isLoading, isError } = useQuery('likes', getLikes);
  // if (data) {
  //   if (data.length===0 )
  // }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      // console.log('유저모든정보', user);
      // console.log( user?.email  );
      !!user.email && setLoginUserEmail(user.email);
    });
  }, []);

  if (isLoading) {
    return <div>로딩중임</div>;
  }

  if (isError) {
    return <div>에러남</div>;
  }

  if (data) {
    console.log('💙data', data);
  }
  return (
    <div>
      {!loginUserEmail ? <button>빈하트</button> : <button>여긴 heart (true/false)에 따라 하트 바쿼주기</button>}
      <span>좋아요수 : 명</span>
    </div>
  );
};

export default LikesPosts;
