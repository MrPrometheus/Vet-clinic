import { DataType } from '../DoctorComponents/DoctorInfo'
import { Item } from './UserInfo'
import { Modal, Space, Table, Tag, Typography } from 'antd'
import { baseUrl } from '../../APIs/APITools'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'

interface AppointmentDataType extends DataType {
  id: string
}

interface AnimalsType extends Item {
  id: string
}

export const Appointment = () => {
  const [dataSrc, setDataSrc] = useState<AppointmentDataType[]>([])

  const { id, token } = useContext(AuthContext)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [openAppId, setOpenAppId] = useState<string>('')

  const [animals, setAnimals] = useState<AnimalsType[]>([])
  const [animalId, setAnimalId] = useState<string>('')
  const [animalName, setAnimalName] = useState<string>('')

  const showModal = (_id: string) => {
    setIsModalVisible(true)
    setOpenAppId(_id)
  }

  const handleOk = () => {
    fetch(`${baseUrl}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ scheduleItemId: openAppId, patientCardId: animalId }),
    }).then(() => {
      setIsModalVisible(false)
      setOpenAppId('')
    })
  }

  const handleCancel = () => {
    setOpenAppId('')
    setIsModalVisible(false)
  }

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
            const color = tag === 'Ваш прием' ? 'volcano' : 'green'
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
      title: 'Записаться',
      key: 'action',
      // eslint-disable-next-line react/display-name,no-unused-vars
      render: (text: any, record: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              showModal(record.id)
            }}
          >
            Записаться
          </a>
        </Space>
      ),
    },
  ]

  const columnsAnimals = [
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
  ]

  useEffect(() => {
    fetch(`${baseUrl}/card/my-cards?clientId=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setAnimals(
          d.map((item: any, index: number) => {
            return {
              id: item.id,
              clientId: id,
              age: item.age,
              animalType: item.type,
              name: item.name,
              weight: item.weight,
              key: index.toString(),
            }
          })
        )
      })
  }, [])

  useEffect(() => {
    fetch(`${baseUrl}/schedules/by-client-id?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((d) => {
        const data = d.map((item: any, index: number) => {
          return {
            begin: item.timeStart,
            delay: item.duration,
            description: item.description,
            key: index.toString(),
            id: item.id,
            tags: ['Ваш прием'],
          }
        })
        fetch(`${baseUrl}/schedules/free`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((dd) => {
            const data_2 = dd.map((item: any, index: number) => {
              return {
                begin: item.timeStart,
                delay: item.duration,
                description: item.description,
                key: (index * 100).toString(),
                id: item.id,
                tags: ['Свободно'],
              }
            })
            setDataSrc([...data, ...data_2])
          })
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <>
      <Table columns={columns} dataSource={dataSrc} />
      <Modal width={1000} title="Выбор питомца" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Table
          onRow={(record) => ({
            onDoubleClick: () => {
              setAnimalName(record.name)
              setAnimalId(record.id)
            },
          })}
          dataSource={animals}
          columns={columnsAnimals}
        />
        <Typography>Выбрано животное с кличкой {animalName}</Typography>
      </Modal>
    </>
  )
}

export default Appointment
