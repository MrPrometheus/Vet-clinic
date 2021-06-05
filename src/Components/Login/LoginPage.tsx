import 'antd/dist/antd.css'
import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import MainIcon from './assets/MainIcon'
import classes from './LoginPage.module.css'

const APP_VERSION = '1.0.0'

export const LoginPage = () => {
  const { toggleIsAuth, toggleTypeAuth } = useContext(AuthContext)
  const onFinish = (values: any) => {
    // тут вызов Api
    if (toggleTypeAuth && toggleIsAuth && values.password === '1' && values.username === '1') {
      toggleIsAuth(true)
      toggleTypeAuth('user')
    } else if (toggleTypeAuth && toggleIsAuth && values.password === '2' && values.username === '2') {
      toggleIsAuth(true)
      toggleTypeAuth('doctor')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed Sign In (Fill in the Username and Password fields):', errorInfo)
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Form
          className={classes.form_container}
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <MainIcon style={{ marginTop: '4rem' }} />

          <p className={classes.form_name}>Ветеринраная клиника</p>

          <Form.Item
            className={classes.form_input}
            name="username"
            rules={[{ required: true, message: 'Пожалуйста введите Имя пользователя!' }]}
          >
            <Input
              autoFocus={true}
              className={classes.input_style}
              placeholder="Имя пользователя"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            className={classes.form_input}
            name="password"
            rules={[{ required: true, message: 'Пожалуйста введите Пароль!' }]}
          >
            <Input.Password className={classes.input_style} placeholder="Пароль" prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item className={classes.form_submit}>
            <Button className={classes.form_button_submit} type="primary" htmlType="submit">
              ВОЙТИ
            </Button>
          </Form.Item>

          <p className={classes.version_container}>Версия клиента: {APP_VERSION}</p>
        </Form>
        <div className={classes.image} />
      </div>
    </div>
  )
}

export default LoginPage
