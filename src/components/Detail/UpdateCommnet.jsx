import * as React from 'react';
import { StButton } from '../common/Button';
import { StInput } from '../common/InputStyle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { updateComments } from '../../api/comments';
import useInput from '../../hooks/useInput';

export default function FormDialog({ comment }) {
  const [body, onChangeBodyHandler, setter] = useInput();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const queryClient = useQueryClient();

  const updateMutation = useMutation(updateComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });

  const handleCommentUpdateClick = async () => {
    let newComment = { ...comment, body };
    updateMutation.mutate({ id: comment.id, newComment });
    setter('');
    handleClose();
  };

  return (
    <div>
      <StButton $btnSize={'small'} onClick={handleClickOpen} style={{ margin: '0' }}>
        수정
      </StButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>수정하시겠습니까?</DialogTitle>
        <DialogContent>
          <DialogContentText>{comment.body}</DialogContentText>
          <StInput type="text" placeholder="댓글 수정" value={body || ''} onChange={onChangeBodyHandler}></StInput>
        </DialogContent>
        <DialogActions>
          <StButton $btnSize={'small'} onClick={handleClose}>
            취소
          </StButton>
          <StButton $btnSize={'small'} onClick={() => handleCommentUpdateClick({ comment, body })}>
            수정
          </StButton>
        </DialogActions>
      </Dialog>

      {/* <StEditModal open={open} onClose={handleClose}>
        <StEditTit>수정하시겠습니까?</StEditTit>
        <StEditContent>
          <DialogContentText>{comment.body}</DialogContentText>
          <StInput type="text" placeholder="댓글 수정" value={body || ''} onChange={onChangeBodyHandler}></StInput>
        </StEditContent>
        <DialogActions>
          <StButton $btnSize={'small'} onClick={handleClose}>
            취소
          </StButton>
          <StButton $btnSize={'small'} onClick={() => handleCommentUpdateClick({ comment, body })}>
            수정
          </StButton>
        </DialogActions>
      </StEditModal> */}
    </div>
  );
}
