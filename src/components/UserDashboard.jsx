
import { Link, Outlet} from 'react-router'


const UserDashboard = ({isLogin}) => {

if(isLogin){
    return <Outlet/>;
}
  return (
<div>Giriş yapınız...</div>
    
  )
}

export default UserDashboard