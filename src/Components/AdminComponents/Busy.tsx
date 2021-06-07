import { Table, Typography } from 'antd'
import { baseUrl } from '../../APIs/APITools'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'

const { Title } = Typography

export interface BusyType {
  description: string
  duration: number
  id: string
  staffId: string
  timeStart: string
}

export const Busy = () => {
  const [dataSrc, setDataSrc] = useState<BusyType[]>([])
  const { token } = useContext(AuthContext)

  useEffect(() => {
    fetch(`${baseUrl}/schedules/busy`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setDataSrc(d)
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
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Начало приема',
      dataIndex: 'timeStart',
      key: 'timeStart',
    },
  ]

  return (
    <>
      <Title level={2}>Список приемов, на которые записались клиенты</Title>
      <Table columns={columns} dataSource={dataSrc} />
    </>
  )
}

export default Busy
