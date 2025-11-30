
import { Link, Navigate, Outlet} from 'react-router'


const UserDashboard = ({isLogin}) => {

if(isLogin){
    return <Outlet/>;
}
  return (
<Navigate to='/login'/>
    
  )
}

export default UserDashboard