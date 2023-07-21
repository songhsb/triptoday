import React, { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getPosts, updatePosts } from '../api/posts';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Layout from '../components/common/Layout';
import UpdateForm from '../components/UpdateWrite/UpdateForm';

function UpdateWrite() {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;

  const { isLoading, isError, data } = useQuery('postsData', getPosts);

  const [updatecategory, setCategory, setUpdateCategory] = useInput(null);
  const [updatelocation, setUpdateLocation, setLocation] = useInput(null);
  const [updatedescription, setUpdateDescription, setDescription] = useInput(null);
  const [updateimage, setUpdateImage, setImage] = useInput(null);
  const [markerInfo, setMarkerInfo] = useState(null);

  const queryClient = useQueryClient();

  const postsMutation = useMutation(updatePosts, {
    onSuccess: () => {
      queryClient.invalidateQueries('postsData');
    },
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    const posts = data.data.find(item => item.id == id);
    setUpdateCategory(posts.category);
    setLocation(posts.location);
    setDescription(posts.description);
    setImage(posts.image);
  }, [data]);

  if (isLoading) {
    return <div>로딩중 입니다..</div>;
  }

  if (isError) {
    return <h1>에러가 발생하였습니다.</h1>;
  }

  const posts = data.data.find(item => item.id == id);

  const handleWriteButtonClick = e => {
    e.preventDefault();
    let newPosts = {};
    console.log('posts.latLng', posts.latLng);
    console.log('posts.address', posts.address);
    if (markerInfo === null) {
      if (window.confirm('위치가 재설정되지 않았습니다. 수정전의 위치를 유지하겠습니까?')) {
        newPosts = {
          category: updatecategory,
          location: updatelocation,
          description: updatedescription,
          image: updateimage,
          id,
          latLng: posts.latLng,
          address: posts.address,
        };
      } else {
        alert('위치를 재설정 해주세요');
        return false;
      }
    } else if (!!markerInfo) {
      newPosts = {
        category: updatecategory,
        location: updatelocation,
        description: updatedescription,
        image: updateimage,
        id,
        latLng: { latitude: markerInfo.position.getLat(), longitude: markerInfo.position.getLng() },
        address: markerInfo.address,
      };
    }
    console.log(newPosts);
    console.log(posts);
    postsMutation.mutate({ id, posts, newPosts });
    navigate('/');
  };

  return (
    <>
      <LoadingSpinner />

      <Layout>
        <UpdateForm
          handleWriteButtonClick={handleWriteButtonClick}
          setCategory={setCategory}
          updatelocation={updatelocation}
          setUpdateLocation={setUpdateLocation}
          updatedescription={updatedescription}
          setUpdateDescription={setUpdateDescription}
          updateimage={updateimage}
          setUpdateImage={setUpdateImage}
          markerInfo={markerInfo}
          setMarkerInfo={setMarkerInfo}
          posts={posts}
          id={id}
        />
      </Layout>
    </>
  );
}

export default UpdateWrite;
