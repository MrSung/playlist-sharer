import React, { useState, useContext } from 'react'
import { mutate } from 'swr'

import { UserContext } from 'src/app'
import * as db from 'src/db'

interface IUsernameFormProps {
  customUser: db.IUserGet | undefined | null
}

export const UsernameForm = ({ customUser }: IUsernameFormProps) => {
  const [customUsername, setCustomUsername] = useState('')
  const [isValid, setIsValid] = useState(false)

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
    setIsValid(val !== '')
    // const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

    // // Only set form value if length is < 3 OR it passes regex
    // if (val.length < 3) {
    //   setCustomUsername(val)
    //   setIsLoading(false)
    //   setIsValid(false)
    // }

    // if (re.test(val)) {
    //   setCustomUsername(val)
    //   setIsLoading(true)
    //   setIsValid(false)
    // }
  }

  const onClick = async (user: db.IUserGet | null) => {
    if (user === null) {
      return
    }

    await db.deleteCustomUser(user.id)
    await mutate(db.USERS)
  }

  // const checkUsername = useCallback(
  //   debounce(async (usrName: string | null) => {
  //     if (usrName === null) {
  //       return
  //     }

  //     if (usrName.length >= 3) {
  //       const ref = firestore.doc(`usernames/${usrName}`)
  //       const { exists } = await ref.get()
  //       console.log('Firestore read executed!')
  //       setIsValid(!exists)
  //       setIsLoading(false)
  //     }
  //   }, 500),
  //   []
  // )

  // useEffect(() => {
  //   checkUsername(customUsername)
  // }, [customUsername, checkUsername])

  return (
    <div>
      {typeof customUser === 'undefined' ? (
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
            {/* <UsernameMessage
              username={customUsername}
              isValid={isValid}
              isLoading={isLoading}
            /> */}

            {/* <h3>Debug State</h3>
            <div>
              Username: {customUsername}
              <br />
              Loading: {isLoading.toString()}
              <br />
              Username Valid: {isValid.toString()}
            </div> */}
          </form>
        </>
      ) : (
        <>
          <h2>Registered Custom Username</h2>
          <div>
            <span style={{ marginRight: '1em' }}>
              {customUser?.user.customUsername}
            </span>
            <button type='button' onClick={() => onClick(customUser)}>
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
