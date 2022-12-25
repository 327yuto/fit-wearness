import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useToast, Box } from '@chakra-ui/react'



function CanNotPostToastButton() {
  const toast = useToast()
  return (
    <Button
      fullWidth
      variant='outlined'
      color='primary'
      style={{ marginTop: "1rem" }}

      onClick={() =>
        toast({
          title: '投稿できません',
          description: "サインインが必要です",
          status: 'warning',
          duration: 3000,
          isClosable: true,
        })
      }
    >
      投稿
    </Button>
  )
}

export default CanNotPostToastButton
