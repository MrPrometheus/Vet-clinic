import { Button, Form, Input, Modal, Table, Tag, Typography } from 'antd'
import { useState } from 'react'
import classes from './DoctorInfo.module.css'
const { Title } = Typography

interface DataType {
  key: string
  description: string
  delay: number
  begin: string
  tags: string[]
}

const data: DataType[] = [
  {
    key: '0',
    description: 'ничего',
    delay: 100,
    begin: '01.01.2021',
    tags: ['свободно'],
  },
]

export const DoctorInfo = () => {
  const [name] = useState('Дима')
  const [surname] = useState('Васевич')
  const [position] = useState('Хирург')
  const [experience] = useState('че то там')

  const [isModalVisible, setIsModalVisible] = useState(false)

  const [dataSrc, setDataSrc] = useState(data)

  const columns = [
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Длительность приема',
      dataIndex: 'delay',
      key: 'delay',
    },
    {
      title: 'Начало приема',
      dataIndex: 'begin',
      key: 'begin',
    },
    {
      title: 'Теги',
      key: 'tags',
      dataIndex: 'tags',
      // eslint-disable-next-line react/display-name
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            let color
            if (tag === 'свободно') {
              color = 'green'
            } else if (tag === 'занято') {
              color = 'geekblue'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: 'Операции',
      dataIndex: 'operation',
      key: 'operation',
      // eslint-disable-next-line react/display-name
      render: (text: any, record: any) => (
        <>
          <a style={{ marginRight: '16px' }} onClick={() => showModal()}>
            Добавить запись
          </a>
          <a
            onClick={() => {
              setDataSrc(dataSrc.filter((value) => value.key !== record.key))
            }}
          >
            Удалить прием
          </a>
        </>
      ),
    },
  ]

  const onFinish = (fieldsValue: any) => {
    const newData: DataType = {
      key: dataSrc.length.toString(),
      description: fieldsValue.description,
      delay: fieldsValue.delay,
      begin: fieldsValue.begin,
      tags: ['свободно'],
    }
    setDataSrc([...dataSrc, newData])
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinishCard = (fieldsValue: any) => {
    console.log('Добавил запись', fieldsValue)
    handleCancel()
  }

  return (
    <div>
      <Title level={2}>Информация</Title>
      <Typography>
        Врач: {surname} {name}
      </Typography>
      <Typography>Должность: {position}</Typography>
      <Typography>Опыт работы: {experience}</Typography>
      <Typography>Ваше рассписание:</Typography>
      <Form onFinish={onFinish}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Form.Item
            className={classes.form_input}
            name="begin"
            rules={[{ required: true, message: 'Пожалуйста введите Начало приема!' }]}
          >
            <Input autoFocus={true} className={classes.input_style} placeholder="Начало приема" />
          </Form.Item>
          <Form.Item
            className={classes.form_input}
            name="delay"
            rules={[{ required: true, message: 'Пожалуйста введите Длительность приема!' }]}
          >
            <Input className={classes.input_style} placeholder="Длительность приема" />
          </Form.Item>
          <Form.Item className={classes.form_input} name="description">
            <Input className={classes.input_style} placeholder="Описание" />
          </Form.Item>
        </div>

        <Form.Item className={classes.form_submit}>
          <Button className={classes.form_button_submit} type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={dataSrc} />
      <Modal title="Добавить запись в карту" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form onFinish={onFinishCard}>
          <Form.Item className={classes.form_input} name="description">
            <Input autoFocus={true} className={classes.input_style} placeholder="Описание" />
          </Form.Item>
          <Form.Item
            className={classes.form_input}
            name="diagnosis"
            rules={[{ required: true, message: 'Пожалуйста введите Диагноз!' }]}
          >
            <Input className={classes.input_style} placeholder="Диагноз" />
          </Form.Item>
          <Form.Item
            className={classes.form_input}
            name="recommendation"
            rules={[{ required: true, message: 'Пожалуйста введите Рекомендацию!' }]}
          >
            <Input className={classes.input_style} placeholder="Рекомендация" />
          </Form.Item>
          <Form.Item className={classes.form_submit}>
            <Button className={classes.form_button_submit} type="primary" htmlType="submit">
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DoctorInfo
