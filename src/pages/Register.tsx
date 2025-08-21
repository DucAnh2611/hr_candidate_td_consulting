import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/register-form";
import { ESimpleStateManagementContextDispatchType } from "../enums/context";
import useSimpleStateManagement from "../hooks/useSimpleStateManagement";

export default function Register() {
  const navigate = useNavigate();
  const { dispatch } = useSimpleStateManagement();

  const onRegistered = () => {
    if (!dispatch) return;
    
    dispatch({
      type: ESimpleStateManagementContextDispatchType.UPDATE,
      data: {
        session: null,
      },
    });

    navigate("/login");
  }
  
  document.title = 'Register new account';

  return <div>
    <RegisterForm onRegistered={onRegistered}/>
  </div>;
}
