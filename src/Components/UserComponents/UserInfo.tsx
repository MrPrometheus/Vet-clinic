import { Button, Form, Input, InputNumber, Modal, Popconfirm, Table, Typography } from 'antd'
import { HTMLAttributes, Key, ReactNode, useContext, useEffect, useState } from 'react'
import { baseUrl } from '../../APIs/APITools'
import AuthContext from '../context/AuthContext'
import CardRecord from './CardRecord'
import classes from './UserInfo.module.css'
const { Title } = Typography

export interface Item {
  key: string
  age: number
  type: string
  name: string
  weight: number
}

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: Item
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

interface EditableTableType {
  clickCell: () => void
}

// eslint-disable-next-line no-unused-vars
const EditableTable = (props: EditableTableType) => {
  const [form] = Form.useForm()
  const [data, setData] = useState<Item[]>([])
  const [editingKey, setEditingKey] = useState('')

  const { id, token } = useContext(AuthContext)

  useEffect(() => {
    fetch(`${baseUrl}/card/my-cards?clientId=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setData(
          d.map((item: any) => {
            return {
              id: item.id,
              clientId: id,
              age: item.age,
              animalType: item.type,
              name: item.name,
              weight: item.weight,
            }
          })
        )
      })
  }, [])

  const isEditing = (record: Item) => record.key === editingKey

  const edit = (record: Partial<Item> & { key: Key }) => {
    form.setFieldsValue({ name: '', age: '', weight: '', type: '', ...record })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: Key) => {
    try {
      const row = (await form.validateFields()) as Item

      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        const item = newData[index]
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
      title: 'Кличка',
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: 'Вес',
      dataIndex: 'weight',
      width: '20%',
      editable: true,
    },
    {
      title: 'Вид',
      dataIndex: 'type',
      width: '20%',
      editable: true,
    },
    {
      title: 'Операции',
      dataIndex: 'operation',
      // eslint-disable-next-line react/display-name
      render: (_: any, record: Item) => {
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
              onClick={() => setData(data.filter((item) => record.key !== item.key))}
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
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex in ['age', 'weight'] ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  const onFinish = (fieldsValue: any) => {
    const newData: Item = {
      key: data.length.toString(),
      age: fieldsValue.age,
      type: fieldsValue.type,
      name: fieldsValue.name,
      weight: fieldsValue.weight,
    }
    setData([...data, newData])
    fetch(`${baseUrl}/card`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: id,
        age: fieldsValue.age,
        animalType: fieldsValue.type,
        name: fieldsValue.name,
        weight: fieldsValue.weight,
      }),
    })
  }

  return (
    <>
      <Form onFinish={onFinish}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Form.Item
            className={classes.form_input}
            name="name"
            rules={[{ required: true, message: 'Пожалуйста введите Кличку!' }]}
          >
            <Input autoFocus={true} className={classes.input_style} placeholder="Кличка" />
          </Form.Item>
          <Form.Item
            className={classes.form_input}
            name="age"
            rules={[{ required: true, message: 'Пожалуйста введите Возраст!' }]}
          >
            <Input className={classes.input_style} placeholder="Возраст" />
          </Form.Item>
          <Form.Item
            className={classes.form_input}
            name="weight"
            rules={[{ required: true, message: 'Пожалуйста введите Вес!' }]}
          >
            <Input className={classes.input_style} placeholder="Вес" />
          </Form.Item>
          <Form.Item
            className={classes.form_input}
            name="type"
            rules={[{ required: true, message: 'Пожалуйста введите Вид!' }]}
          >
            <Input className={classes.input_style} placeholder="Вид" />
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
          onRow={() => ({
            onDoubleClick: () => props.clickCell(),
          })}
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

export const UserInfo = () => {
  const [name] = useState('Дима')
  const [surname] = useState('Васевич')

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <Title level={2}>Информация</Title>
      <Typography>
        Клиент: {surname} {name}
      </Typography>
      <Typography style={{ marginTop: '16px', marginBottom: '8px' }}>Ваши медицинские карты:</Typography>
      <EditableTable clickCell={showModal} />
      <Modal width={1000} title="Записи в карте" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <CardRecord />
      </Modal>
    </div>
  )
}

export default UserInfo
