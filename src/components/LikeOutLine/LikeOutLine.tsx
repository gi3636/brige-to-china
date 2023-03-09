import React, { useState } from 'react';
import axios from 'axios';
import { LikeOutlineIcon } from '@/components/icons/LikeOutlineIcon';

function LikeOutLine({ postId }) {
    const [questionId, setquestionId] = useState({ likes: 0 });

    function handleClick() {
        axios
            .post(`http://36.26.69.161:9999/question/${postId}`)
            .then((response) => {
                setquestionId({ likes: response.data.likes });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div onClick={handleClick}>
            <LikeOutlineIcon height={18} width={18} color={questionId.likes ? 'blue' : 'gray'} />
        </div>
    );
}

export default LikeOutLine;
