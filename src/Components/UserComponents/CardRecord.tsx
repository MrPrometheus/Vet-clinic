import { Table } from 'antd'
import { baseUrl } from '../../APIs/APITools'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'

interface Card {
  key: string
  description: string
  diagnosis: string
  recommendation: string
  date: string
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

export interface CardRecordType {
  cardId: string
}

// eslint-disable-next-line no-unused-vars
export const CardRecord = (props: CardRecordType) => {
  const [dataSrc, setDataSrc] = useState<Card[]>([])
  const { token } = useContext(AuthContext)

  useEffect(() => {
    fetch(`${baseUrl}/record/by-card-id?id=${props.cardId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setDataSrc(d)
      })
  }, [props.cardId])

  return <Table dataSource={dataSrc} columns={columns} />
}

export default CardRecord
