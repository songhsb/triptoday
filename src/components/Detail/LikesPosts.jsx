import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addPostIdToLikes, patchLikes } from '../../api/likes';
import axios from 'axios';
import { GoHeartFill } from 'react-icons/go';
import { GoHeart } from 'react-icons/go';
import './LikesPosts.css';

const LikesPosts = ({ postId }) => {
  const queryClient = useQueryClient();
  /** NOTE [임시 code] useEffect에 있는 auth 불러오는 logic은 임시 code로 추후 삭제 예정
   * (이 loginUserId는 지금은 auth불러서 가져오는데 -> 나중에 승범님이 Detail 조회에서 ?가져오실 auth정보를 props로 내려받아 내려올 예정임) */
  const [loginUserEmail, setLoginUserEmail] = useState(null);
  const { data, isLoading, isError } = useQuery(['likes'], async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/likes/${postId}`);
    return response;
  });

  // db.json에 likes collection에 postId로 된 likes가 없으면 mutate일으키도록!
  const likesDocMutation = useMutation(addPostIdToLikes, {
    onSuccess: () => {
      queryClient.invalidateQueries(['likes']);
    },
  });
  const likesMutation = useMutation(
    patchLikes,
    {
      onSuccess: () => {
        console.log('queryClient', queryClient);
        queryClient.invalidateQueries(['likes']);
      },
    },
    { enabled: !!data },
  );
  // ? 근데.... 음 likes에 다른 이유로 에러가 떴는데 postId에 있는 userList를 빈값 줘버리면 어떡해? 그런 일은 안생기나
  useEffect(() => {
    likesDocMutation.mutate({
      id: postId,
      userList: [],
    });
  }, [isError]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      !!user.email && setLoginUserEmail(user.email);
    });
  }, []);

  if (isLoading) {
    return <div>로딩중임</div>;
  }

  if (isError) {
    return <div>에러남</div>;
  }

  const likes = data.data;
  const fullheart = likes.userList.includes(loginUserEmail);
  const onClickHeartHandler = (loginUserEmail, fullheart) => {
    if (!loginUserEmail) {
      alert('로그인 해야 누를 수 있음');
      return false;
    }
    let switchedLikes;
    if (fullheart) {
      switchedLikes = likes.userList.filter(user => {
        return user !== loginUserEmail;
      });
    } else {
      switchedLikes = [...likes.userList, loginUserEmail];
    }
    console.log('switchedLikes', switchedLikes);
    likesMutation.mutate({ switchedLikes, postId });
  };
  return (
    <div>
      {fullheart ? (
        <GoHeartFill
          className="fullheart heart"
          onClick={() => {
            onClickHeartHandler(loginUserEmail, fullheart);
          }}
        />
      ) : (
        <GoHeart
          className="heart"
          onClick={() => {
            onClickHeartHandler(loginUserEmail, fullheart);
          }}
        />
      )}
      <span>좋아요수 : {likes.userList.length}명</span>
    </div>
  );
};

export default LikesPosts;
