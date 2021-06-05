import { Space, Table, Tag } from 'antd'

const columns = [
  {
    title: 'Имя врача',
    dataIndex: 'name',
    key: 'name',
    // eslint-disable-next-line react/display-name
    render: (text: any) => <a>{text}</a>,
  },
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
    title: 'Записаться',
    key: 'action',
    // eslint-disable-next-line react/display-name,no-unused-vars
    render: (text: any, record: any) => (
      <Space size="middle">
        <a
          onClick={() => {
            console.log('я записан')
          }}
        >
          Записаться
        </a>
      </Space>
    ),
  },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    description: 'ничего',
    delay: '100',
    begin: '01.01.2021',
    tags: ['свободно'],
  },
  {
    key: '2',
    name: 'John Brown',
    description: 'ничего',
    delay: '100',
    begin: '01.01.2021',
    tags: ['свободно'],
  },
  {
    key: '3',
    name: 'John Brown',
    description: 'ничего',
    delay: '100',
    begin: '01.01.2021',
    tags: ['свободно'],
  },
]

export const Appointment = () => {
  return <Table columns={columns} dataSource={data} />
}

export default Appointment
