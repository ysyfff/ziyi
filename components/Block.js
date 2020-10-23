import React, { memo, useEffect, useState } from 'react';

export default memo((props) => {
  return (
    <div style={{ marginTop: '10px' }}>{props.children}</div>
  )
})