import React, { useState, useContext } from 'react'
import { mutate } from 'swr'

import { UserContext } from 'src/app'
import { useMatchedUser } from 'src/hooks'
import * as db from 'src/db'
import { ErrorMessage } from './error-message'

enum ValidationMessage {
  Empty = 'custom username is empty!',
  Short = 'custom username is too short!',
  Invalid = 'custom username is invalid!',
}

const validationMessageReducer = (val: string) => {
  const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

  switch (true) {
    case val.length === 0:
      return ValidationMessage.Empty
    case val.length < 3:
      return ValidationMessage.Short
    case !re.test(val):
      return ValidationMessage.Invalid
    default:
      return undefined
  }
}

export const UsernameForm = () => {
  const matchedUser = useMatchedUser()
  const [customUsername, setCustomUsername] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [validationMessage, setValidationMessage] = useState<
    string | undefined
  >(undefined)

  const loggedInUser = useContext(UserContext)

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (loggedInUser === null) return

    await db.createCustomUser({
      user: loggedInUser,
      customUsername,
    })
    await mutate(db.USERS)
  }

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const val = ev.target.value.toLowerCase()

    setCustomUsername(val)

    const message = validationMessageReducer(val)
    setIsValid(!message)
    setValidationMessage(message)
  }

  const onClick = async (user: db.IUserGet | null) => {
    if (user === null) {
      return
    }

    await db.deleteCustomUser(user.id)
    await mutate(db.USERS)
  }

  return (
    <div>
      {typeof matchedUser === 'undefined' ? (
        <>
          <h2>Choose Username</h2>
          <form onSubmit={onSubmit} autoComplete='off'>
            <input
              name='username'
              placeholder='Your custom username'
              value={customUsername}
              onChange={onChange}
              style={{
                display: 'inline-block',
              }}
            />
            <button type='submit' className='btn-green' disabled={!isValid}>
              Choose
            </button>
          </form>
          {typeof validationMessage !== 'undefined' && (
            <ErrorMessage>{validationMessage}</ErrorMessage>
          )}
        </>
      ) : (
        <>
          <h2>Registered Custom Username</h2>
          <div>
            <span style={{ marginRight: '1em' }}>
              {matchedUser?.user.customUsername}
            </span>
            <button type='button' onClick={() => onClick(matchedUser)}>
              &times;
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// interface IUsernameMessage {
//   username: string | null
//   isValid: boolean
//   isLoading: boolean
// }

// const UsernameMessage = ({
//   username,
//   isValid,
//   isLoading,
// }: IUsernameMessage) => {
//   switch (true) {
//     case isLoading:
//       return <p>Checking...</p>
//     case isValid:
//       return <p className='text-success'>{username} is available!</p>
//     case username && !isValid:
//       return <p className='text-danger'>That username is taken!</p>
//     default:
//       return null
//   }
// }
