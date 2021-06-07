import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd'
import { HTMLAttributes, Key, ReactNode, useContext, useEffect, useState } from 'react'
import { baseUrl } from '../../APIs/APITools'
import AuthContext from '../context/AuthContext'

const { Title } = Typography

import classes from './AdminInfo.module.css'

interface StaffType {
  key: string
  id?: string
  name?: string | null
  surname?: string | null
  position?: string | null
  experience?: string | null
  email: string
  password: string
  userRole?: string
}

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  key: string
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: StaffType
  index: number
  children: ReactNode
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  // eslint-disable-next-line no-unused-vars
  record,
  // eslint-disable-next-line no-unused-vars
  index,
  children,
  ...restProps
}: EditableCellProps) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Пожалуйста введите ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

// eslint-disable-next-line no-unused-vars
const EditableTable = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState<StaffType[]>([])
  const [editingKey, setEditingKey] = useState('')

  const { id, token } = useContext(AuthContext)

  useEffect(() => {
    fetch(`${baseUrl}/staff/all`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setData(
          d.map((item: any, index: number) => {
            return {
              key: +index,
              id: item.id,
              name: item.name ?? '-',
              surname: item.surname ?? '-',
              position: item.position ?? '-',
              experience: item.experience ?? '-',
              email: item.email,
              userRole: item.userRole,
            }
          })
        )
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  const isEditing = (record: StaffType) => record.key === editingKey

  const edit = (record: Partial<StaffType> & { key: Key }) => {
    form.setFieldsValue({ name: '', age: '', weight: '', type: '', ...record })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: Key) => {
    try {
      const row = (await form.validateFields()) as StaffType

      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        const item = newData[index]
        fetch(`${baseUrl}/staff`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: item.id,
            name: row.name,
            surname: row.surname,
            position: row.position,
            experience: row.experience,
          }),
        })
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      width: '10%',
      editable: true,
    },
    {
      title: 'Фамилия',
      dataIndex: 'surname',
      width: '10%',
      editable: true,
    },
    {
      title: 'Должность',
      dataIndex: 'position',
      width: '10%',
      editable: true,
    },
    {
      title: 'Опыт',
      dataIndex: 'experience',
      width: '10%',
      editable: true,
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      width: '10%',
      editable: false,
    },
    {
      title: 'Роль',
      dataIndex: 'userRole',
      width: '10%',
      editable: false,
    },
    {
      title: 'Операции',
      dataIndex: 'operation',
      // eslint-disable-next-line react/display-name
      render: (_: any, record: StaffType) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <a href="javascript:;" onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Сохранить
            </a>
            <Popconfirm title="Точно отклонить?" onConfirm={cancel}>
              <a>Отклонить</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link style={{ marginRight: '8px' }} disabled={editingKey !== ''} onClick={() => edit(record)}>
              Редактировать
            </Typography.Link>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => {
                const i = data.filter((item) => record.key === item.key)[0]
                if (i.userRole === 'ADMIN') return
                fetch(`${baseUrl}/staff?id=${i.id}`, {
                  method: 'DELETE',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                })
                  .then(() => {
                    setData(data.filter((item) => record.key !== item.key))
                  })
                  .catch((e) => {
                    console.log(e)
                  })
              }}
            >
              Удалить
            </Typography.Link>
          </>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: StaffType) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  const onFinish = (fieldsValue: any) => {
    fetch(`${baseUrl}/auth/sign-up?id=${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: fieldsValue.email,
        userRole: 'DOCTOR',
        password: fieldsValue.password,
      }),
    }).then(() => {
      fetch(`${baseUrl}/staff/all`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((d) => {
          setData(
            d.map((item: any, index: number) => {
              return {
                key: +index,
                id: item.id,
                name: item.name ?? '-',
                surname: item.surname ?? '-',
                position: item.position ?? '-',
                experience: item.experience ?? '-',
                email: item.email,
                userRole: item.userRole,
              }
            })
          )
        })
        .catch((e) => {
          console.log(e)
        })
    })
  }

  return (
    <>
      <Form onFinish={onFinish}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Form.Item
            className={classes.form_input}
            name="email"
            rules={[{ required: true, message: 'Пожалуйста введите Email!' }]}
          >
            <Input className={classes.input_style} placeholder="Email" />
          </Form.Item>
          <Form.Item
            className={classes.form_input}
            name="password"
            rules={[{ required: true, message: 'Пожалуйста введите Пароль!' }]}
          >
            <Input className={classes.input_style} placeholder="Пароль" />
          </Form.Item>
        </div>
        <Form.Item className={classes.form_submit}>
          <Button className={classes.form_button_submit} type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName={classes.editableRow}
          pagination={{
            pageSize: 8,
            onChange: cancel,
          }}
        />
      </Form>
    </>
  )
}

export const AdminInfo = () => {
  return (
    <div>
      <Title level={2}>Добавить Персонал</Title>
      <EditableTable />
    </div>
  )
}

export default AdminInfo
