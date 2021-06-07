import { Table, Typography } from 'antd'
import { baseUrl } from '../../APIs/APITools'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'

interface CardR {
  key: string
  id: string
  patientCardId: string
  staffId: string
  date: string
  diagnose: string
  description: string
  prescription: string
}

const columns = [
  {
    title: 'Описание',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Диагноз',
    dataIndex: 'diagnose',
    key: 'diagnose',
  },
  {
    title: 'Рекомендация',
    dataIndex: 'prescription',
    key: 'prescription',
  },
  {
    title: 'Дата записи',
    dataIndex: 'date',
    key: 'date',
  },
]

export const DoctorCardRecord = () => {
  const [dataSrc, setDataSrc] = useState<CardR[]>([])
  const { token, id } = useContext(AuthContext)

  useEffect(() => {
    fetch(`${baseUrl}/record/by-doctor-id?id=${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((d) => {
        const obj = d.map((item: CardR, index: number) => {
          return {
            key: +index,
            id: item.id,
            patientCardId: item.patientCardId,
            staffId: item.staffId,
            date: item.date,
            diagnose: item.diagnose,
            description: item.description,
            prescription: item.prescription,
          }
        })
        setDataSrc(obj)
      })
  }, [])

  return (
    <>
      <Typography style={{ marginBottom: '16px' }}>Записи в картах</Typography>
      <Table dataSource={dataSrc} columns={columns} />
    </>
  )
}

export default DoctorCardRecord
