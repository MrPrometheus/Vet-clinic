import { Redirect, Switch } from 'react-router'
import Appointment from '../UserComponents/Appointment'
import DoctorCardRecord from '../DoctorComponents/DoctorCardRecord'
import DoctorInfo from '../DoctorComponents/DoctorInfo'
import PrivateRoute from './common/PrivateRoute'
import UserInfo from '../UserComponents/UserInfo'
import routes from './routes'

export const MainRoutes = () => {
  return (
    <Switch>
      <PrivateRoute path={`${routes.main}${routes.client}${routes.user_info}`}>
        <UserInfo />
      </PrivateRoute>
      <PrivateRoute path={`${routes.main}${routes.client}${routes.appointment}`}>
        <Appointment />
      </PrivateRoute>
      <PrivateRoute path={`${routes.main}${routes.doctor}${routes.doctor_info}`}>
        <DoctorInfo />
      </PrivateRoute>
      <PrivateRoute path={`${routes.main}${routes.doctor}${routes.doctor_card_record}`}>
        <DoctorCardRecord />
      </PrivateRoute>
      <PrivateRoute path={`${routes.main}`}>
        <div>Дашборд</div>
      </PrivateRoute>
      <Redirect to={`${routes.main}`} />
    </Switch>
  )
}

export default MainRoutes
