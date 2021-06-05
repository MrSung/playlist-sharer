import React from 'react'

export const ErrorMessage: React.FC = ({ children }) => (
  <p style={{ color: 'tomato' }}>{children}</p>
)
