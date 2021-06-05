import { Table } from 'antd'

const dataSource = [
  {
    key: '1',
    description: 'Фигня какая то',
    diagnosis: 'сломана нога',
    recommendation: 'Ампутировать ногу',
    date: '10.10.2021',
  },
  {
    key: '2',
    description: 'Фигня какая то',
    diagnosis: 'сломана нога',
    recommendation: 'Ампутировать ногу',
    date: '10.10.2021',
  },
]

const columns = [
  {
    title: 'Описание',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Диагноз',
    dataIndex: 'diagnosis',
    key: 'diagnosis',
  },
  {
    title: 'Рекомендация',
    dataIndex: 'recommendation',
    key: 'recommendation',
  },
  {
    title: 'Дата записи',
    dataIndex: 'date',
    key: 'date',
  },
]

export const CardRecord = () => {
  return <Table dataSource={dataSource} columns={columns} />
}

export default CardRecord
