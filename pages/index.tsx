/** @jsxImportSource @emotion/react */
import type { NextPage } from 'next'
import React, { ReactElement, cloneElement, FormEvent } from 'react'
import { Button, Input, FormGroup, Spinner, ErrorMessage } from 'comps/lib'
import { Modal, ModalContents, ModalOpenButton } from 'comps/modal'
import { useRegister } from 'lib/register'

const Home: NextPage = () => {
  const register = useRegister()

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
        }}
      >
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            {/* <LoginForm
              auth={signIn}
              submitButton={<Button variant='primary'>Login</Button>}
            /> */}

            <>hello</>
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              auth={register}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}

export default Home

const LoginForm = ({
  auth,
  submitButton,
}: {
  auth: any
  submitButton: ReactElement
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    const formElements = form.elements as typeof form.elements & {
      email: HTMLInputElement
      password: HTMLInputElement
    }

    auth.mutateAsync({
      email: formElements.email.value,
      password: formElements.password.value,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
    >
      <FormGroup>
        <label htmlFor="email">Email</label>
        <Input id="email" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        {cloneElement(
          submitButton,
          { type: 'submit' },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          auth.isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null,
        )}
      </div>
      {auth.isError ? <ErrorMessage error={auth.error} /> : null}
    </form>
  )
}
