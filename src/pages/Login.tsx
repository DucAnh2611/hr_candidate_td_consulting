import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { ESimpleStateManagementContextDispatchType } from "../enums/context";
import useSimpleStateManagement from "../hooks/useSimpleStateManagement";
import type { TAuthData } from "../types";

export default function Login() {
  const navigate = useNavigate();
  const { dispatch } = useSimpleStateManagement();

  const onSignedIn = (authData: TAuthData) => {
    if (!dispatch || !authData.session || !authData.user) return;
    
    dispatch({
      type: ESimpleStateManagementContextDispatchType.UPDATE,
      data: {
        session: authData.session,
      },
    });

    navigate('/');
  }

  document.title = 'Login';
  
  return <div>
    <LoginForm onSignedIn={onSignedIn}/>
  </div>;
}
