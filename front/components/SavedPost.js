import React from 'react';

import PostImages from './PostImages';
import PostCardContent from './PostCardContent';

const SavedPost = ({ post }) => {
  return (
    <>
      <Card
        styled={{ width: '30%'}}
        cover={post.Images[0] && <PostImages images={post.Images} />}
      >
        <Card.Meta 
          avatar={(
            <Link href={`/user/${post.id}`}>
              <a><Avatar>{post.User.nickname}</Avatar></a>
            </Link>
          )}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}>
        </Card.Meta>
      </Card>
    </>
  );
}

export default SavedPost;

