import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useToast, Box } from '@chakra-ui/react'

import EditIcon from "@material-ui/icons/Edit"

function CanNotUserEditToastButton() {
  const toast = useToast()
  return (
    <Button
      fullWidth
      variant='outlined'
      color='primary'
      style={{ marginTop: "1rem" }}
      startIcon={<EditIcon />}

      onClick={() =>
        toast({
          title: 'ゲストユーザーです',
          description: "編集できません",
          status: 'warning',
          duration: 3000,
          isClosable: true,
        })
      }
    >
      編集
    </Button>
  )
}

export default CanNotUserEditToastButton
