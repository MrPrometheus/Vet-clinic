import 'antd/dist/antd.css'
import { Button, Form, Input, Tabs } from 'antd'
const { TabPane } = Tabs
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { baseUrl } from '../../APIs/APITools'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import MainIcon from './assets/MainIcon'
import classes from './LoginPage.module.css'

const APP_VERSION = '1.0.0'

export const LoginPage = () => {
  const { toggleIsAuth, toggleTypeAuth, toggleId, toggleToken } = useContext(AuthContext)
  const onFinishSignIn = (values: any) => {
    fetch(`${baseUrl}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: values.email, password: values.password }),
    })
      .then((res) => res.json())
      .then((d) => {
        if (toggleIsAuth && toggleTypeAuth && toggleId && toggleToken) {
          toggleIsAuth(true)
          toggleId(d.id)
          toggleToken(d.token)
          if (d.userRole === 'CLIENT') {
            toggleTypeAuth('user')
          } else if (d.userRole === 'DOCTOR') {
            toggleTypeAuth('doctor')
          } else {
            toggleTypeAuth('admin')
          }
        }
        console.log(d)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onFinishSignUp = (values: any) => {
    fetch(`${baseUrl}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: values.email, password: values.password }),
    })
      .then((res) => res.json())
      .then((d) => {
        if (toggleIsAuth && toggleTypeAuth) {
          toggleIsAuth(true)
          toggleTypeAuth('user')
        }
        console.log(d)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed Sign In (Fill in the Username and Password fields):', errorInfo)
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Tabs style={{ flexGrow: 1 }} centered>
          <TabPane tab="Вход" key="1">
            <Form
              className={classes.form_container}
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFinishSignIn}
              onFinishFailed={onFinishFailed}
            >
              <MainIcon style={{ marginTop: '4rem' }} />

              <p className={classes.form_name}>Ветеринраная клиника</p>

              <Form.Item
                className={classes.form_input}
                name="email"
                rules={[{ required: true, message: 'Пожалуйста введите Почту!' }]}
              >
                <Input
                  autoFocus={true}
                  className={classes.input_style}
                  placeholder="Почта"
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
          </TabPane>
          <TabPane tab="Регистрация" key="2">
            <Form
              className={classes.form_container}
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFinishSignUp}
              onFinishFailed={onFinishFailed}
            >
              <MainIcon style={{ marginTop: '4rem' }} />

              <p className={classes.form_name}>Ветеринраная клиника</p>

              <Form.Item
                className={classes.form_input}
                name="email"
                rules={[{ required: true, message: 'Пожалуйста введите Почту!' }]}
              >
                <Input
                  autoFocus={true}
                  className={classes.input_style}
                  placeholder="Почта"
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
                  Регистрация
                </Button>
              </Form.Item>

              <p className={classes.version_container}>Версия клиента: {APP_VERSION}</p>
            </Form>
            <div className={classes.image} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default LoginPage
