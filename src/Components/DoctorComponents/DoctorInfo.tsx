import { Button, Form, Input, Modal, Table, Tag, Typography } from 'antd'
import { baseUrl } from '../../APIs/APITools'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import classes from './DoctorInfo.module.css'
const { Title } = Typography

export interface DataType {
  key: string
  description: string
  delay: number
  begin: string
  tags: string[]
  id?: string
  cardId?: string
}

export const DoctorInfo = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [position, setPosition] = useState('')
  const [experience, setExperience] = useState('')

  const { token, id } = useContext(AuthContext)

  const [cardId, setCardId] = useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [dataSrc, setDataSrc] = useState<DataType[]>([])

  useEffect(() => {
    fetch(`${baseUrl}/staff/by-id?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setSurname(d.surname ?? 'Не заполнено')
        setName(d.name ?? 'Не заполнено')
        setExperience(d.experience ?? 'Не заполнено')
        setPosition(d.position ?? 'Не заполнено')
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  useEffect(() => {
    fetch(`${baseUrl}/schedules/by-doctor?id=${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((d_all) => {
        fetch(`${baseUrl}/appointments/doctor?id=${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((r) => r.json())
          .then((dd) => {
            setDataSrc(
              d_all.map((item: any, index: number) => {
                console.log(dd.find((obj: any) => obj.scheduleItemId === item.id))
                return {
                  tags: dd.find((obj: any) => obj.scheduleItemId === item.id) ? ['Клиент Записан'] : ['Свободно'],
                  begin: item.timeStart,
                  delay: item.duration,
                  description: item.description,
                  key: index.toString(),
                  id: item.id,
                  cardId: dd.find((obj: any) => obj.scheduleItemId === item.id)?.patientCardId,
                }
              })
            )
          })
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

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
      title: 'Тэги',
      key: 'tags',
      dataIndex: 'tags',
      // eslint-disable-next-line react/display-name
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            const color = tag === 'Клиент Записан' ? 'volcano' : 'green'
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
          {record.cardId && (
            <a style={{ marginRight: '16px' }} onClick={() => showModal(record.cardId)}>
              Добавить запись
            </a>
          )}
          <a
            onClick={() => {
              fetch(`${baseUrl}/schedules?id=${record.id}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }).then(() => {
                setDataSrc(dataSrc.filter((value) => value.key !== record.key))
              })
            }}
          >
            Удалить прием
          </a>
        </>
      ),
    },
  ]

  const onFinish = (fieldsValue: any) => {
    fetch(`${baseUrl}/schedules`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timeStart: fieldsValue.begin,
        duration: +fieldsValue.delay,
        staffId: id,
        description: fieldsValue.description,
      }),
    }).then(() => {
      fetch(`${baseUrl}/schedules/by-doctor?id=${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((d_all) => {
          fetch(`${baseUrl}/appointments/doctor?id=${id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
            .then((r) => r.json())
            .then((dd) => {
              setDataSrc(
                d_all.map((item: any, index: number) => {
                  console.log(dd.find((obj: any) => obj.scheduleItemId === item.id))
                  return {
                    tags: dd.find((obj: any) => obj.scheduleItemId === item.id) ? ['Клиент Записан'] : ['Свободно'],
                    begin: item.timeStart,
                    delay: item.duration,
                    description: item.description,
                    key: index.toString(),
                    id: item.id,
                  }
                })
              )
            })
        })
        .catch((e) => {
          console.log(e)
        })
    })
  }

  const showModal = (card: string) => {
    console.log(card)
    setCardId(card)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinishCard = (fieldsValue: any) => {
    fetch(`${baseUrl}/record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        patientCardId: cardId,
        staffId: id,
        date: new Date().toISOString().substr(0, 23),
        diagnose: fieldsValue.diagnose,
        description: fieldsValue.description,
        prescription: fieldsValue.prescription,
      }),
    })
      .then(() => {
        handleCancel()
      })
      .catch((e) => {
        console.log(e)
      })
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
          <Form.Item
            className={classes.form_input}
            name="description"
            rules={[{ required: true, message: 'Пожалуйста введите Описание!' }]}
          >
            <Input autoFocus={true} className={classes.input_style} placeholder="Описание" />
          </Form.Item>
          <Form.Item
            className={classes.form_input}
            name="diagnose"
            rules={[{ required: true, message: 'Пожалуйста введите Диагноз!' }]}
          >
            <Input className={classes.input_style} placeholder="Диагноз" />
          </Form.Item>
          <Form.Item
            className={classes.form_input}
            name="prescription"
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
